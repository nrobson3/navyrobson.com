"""Fusion-side script: one 'calibre plate' = hidden-line linework + ray-traced render on black,
both from the same eye/target. Pasted into fusion_mcp_execute with SHOT filled in.

Framing facts (Fusion 2026-10): Viewport.saveAsImageFileWithOptions keeps the camera's
perspectiveAngle as the VERTICAL fov of the image; startLocalRender keeps the viewport's
HORIZONTAL fov. So the camera angle is set separately for each output.

Outputs in OUT:
  <name>_line.png    WireframeWithVisibleEdgesOnly, transparent, at LINE_SCALE x size
  <name>_render.png  ray-traced local render on a near-black studio
  <name>_info.json   camera + bbox
Units: Fusion cm. az is measured from +X toward +Y, el above the ground plane.
"""
import adsk.core, adsk.fusion, math, os, json

OUT = 'C:/Users/navyr/Documents/GitHub/navyrobson.com/art/raw/'
SHOT = dict(doc='FPV Micro Gimbal, 2-Axis - Rev B', name='gimbal', az=-40, el=18, fov=20,
            fill=0.78, up='z', hide=(), quality=45, w=1080, h=1440, render=True, run='r1')
LINE_SCALE = 2


def visible_corners(des):
    lo, hi = [1e9] * 3, [-1e9] * 3
    for occ in [None] + list(des.rootComponent.allOccurrences):
        comp = des.rootComponent if occ is None else occ.component
        if occ is not None and not occ.isVisible:
            continue
        for b in comp.bRepBodies:
            body = b if occ is None else b.createForAssemblyContext(occ)
            if not body.isVisible:
                continue
            bb = body.boundingBox
            for i, (a, c) in enumerate(((bb.minPoint.x, bb.maxPoint.x), (bb.minPoint.y, bb.maxPoint.y),
                                        (bb.minPoint.z, bb.maxPoint.z))):
                lo[i], hi[i] = min(lo[i], a), max(hi[i], c)
    corners = [(x, y, z) for x in (lo[0], hi[0]) for y in (lo[1], hi[1]) for z in (lo[2], hi[2])]
    return lo, hi, corners


def find_doc(app):
    """By design attribute ('portfolio', SHOT['attr']) when given (unsaved docs are all
    'Untitled', and other sessions may have their own open), else by name prefix."""
    for d in app.documents:
        if SHOT.get('attr'):
            try:
                des = adsk.fusion.Design.cast(d.products.itemByProductType('DesignProductType'))
            except Exception:
                continue
            if des and des.attributes.itemByName('portfolio', SHOT['attr']):
                return d
        elif d.name.startswith(SHOT['doc']):
            return d
    raise RuntimeError('document not found: %s' % (SHOT.get('attr') or SHOT['doc']))


def sub(a, b): return [a[i] - b[i] for i in range(3)]
def dot(a, b): return sum(a[i] * b[i] for i in range(3))
def cross(a, b): return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]
def unit(a):
    n = math.sqrt(dot(a, a))
    return [x / n for x in a]


def set_camera(app, vp, eye, target, up, angle, d):
    cam = vp.camera
    cam.isSmoothTransition = False
    cam.cameraType = adsk.core.CameraTypes.PerspectiveCameraType
    cam.isFitView = False
    cam.perspectiveAngle = angle            # angle FIRST, or Fusion re-fits the eye distance
    cam.target = adsk.core.Point3D.create(*target)
    cam.eye = adsk.core.Point3D.create(*eye)
    cam.upVector = adsk.core.Vector3D.create(*up)
    for _ in range(5):
        vp.camera = cam
        vp.refresh()
        adsk.doEvents()
        if abs(vp.camera.eye.distanceTo(vp.camera.target) - d) < 0.02:
            break
    got = vp.camera.eye.distanceTo(vp.camera.target)
    assert abs(got - d) < 0.05, 'camera distance %.3f, wanted %.3f' % (got, d)


def run(_context: str):
    lock = OUT + '_lock_' + SHOT['name'] + '.txt'
    os.makedirs(OUT, exist_ok=True)
    if os.path.exists(lock) and open(lock).read().strip() == SHOT['run']:
        print('already ran', SHOT['run'])
        return
    open(lock, 'w').write(SHOT['run'])

    app = adsk.core.Application.get()
    doc = find_doc(app)
    if app.activeDocument != doc:
        doc.activate()
    des = adsk.fusion.Design.cast(doc.products.itemByProductType('DesignProductType'))
    for o in des.rootComponent.allOccurrences:
        if SHOT['hide'] and o.name.startswith(tuple(SHOT['hide'])):
            o.isLightBulbOn = False

    lo, hi, corners = visible_corners(des)
    c = [(a + b) / 2 for a, b in zip(lo, hi)]
    a, e = math.radians(SHOT['az']), math.radians(SHOT['el'])
    if SHOT['up'] == 'z':
        to_eye = [math.cos(e) * math.cos(a), math.cos(e) * math.sin(a), math.sin(e)]
        up = [0, 0, 1]
    else:  # y-up models
        to_eye = [math.cos(e) * math.cos(a), math.sin(e), math.cos(e) * math.sin(a)]
        up = [0, 1, 0]
    view = [-x for x in to_eye]
    right = unit(cross(view, up))
    upv = unit(cross(right, view))
    th = math.tan(math.radians(SHOT['fov']) / 2)          # image horizontal half-angle
    tv = th * SHOT['h'] / SHOT['w']                       # image vertical half-angle
    d = 0.0
    for p in corners:
        rel = sub(p, c)
        depth_off = dot(rel, view)                         # + means farther than the target
        d = max(d, abs(dot(rel, right)) / (SHOT['fill'] * th) - depth_off,
                abs(dot(rel, upv)) / (SHOT['fill'] * tv) - depth_off)
    eye = [c[i] + d * to_eye[i] for i in range(3)]
    vp = app.activeViewport

    # 1) linework: capture keeps perspectiveAngle as the image's vertical fov
    set_camera(app, vp, eye, c, up, 2 * math.atan(tv), d)
    style0 = vp.visualStyle
    vp.visualStyle = adsk.core.VisualStyles.WireframeWithVisibleEdgesOnlyVisualStyle
    vp.refresh()
    adsk.doEvents()
    opt = adsk.core.SaveImageFileOptions.create(OUT + SHOT['name'] + '_line.png')
    opt.width, opt.height = SHOT['w'] * LINE_SCALE, SHOT['h'] * LINE_SCALE
    opt.isBackgroundTransparent = True
    opt.isAntiAliased = True
    assert vp.saveAsImageFileWithOptions(opt), 'linework capture failed'
    vp.visualStyle = style0

    info = dict(bbox=[lo, hi], center=c, d=d, eye=eye, vp=[vp.width, vp.height], shot=SHOT,
                hidden=[o.name for o in des.rootComponent.allOccurrences if not o.isLightBulbOn])
    # 2) render: keeps the viewport's horizontal fov
    if SHOT['render']:
        set_camera(app, vp, eye, c, up, 2 * math.atan(th * vp.height / vp.width), d)
        rm = des.renderManager
        ss = rm.sceneSettings
        envs = rm.renderEnvironments
        ss.backgroundEnvironment = [envs.item(i) for i in range(envs.count) if envs.item(i).name == 'Sharp Highlights'][0]
        ss.backgroundSolidColor = adsk.core.Color.create(8, 8, 9, 255)
        ss.isGroundDisplayed = True
        ss.isGroundReflections = True
        ss.groundRoughness = 0.15
        rr = rm.rendering
        rr.aspectRatio = adsk.fusion.RenderAspectRatios.CustomRenderAspectRatio
        rr.resolutionWidth, rr.resolutionHeight = SHOT['w'], SHOT['h']
        rr.renderQuality = SHOT['quality']
        fut = rr.startLocalRender(OUT + SHOT['name'] + '_render.png', vp.camera)
        info['render'] = [fut.imageWidth, fut.imageHeight]
    json.dump(info, open(OUT + SHOT['name'] + '_info.json', 'w'), indent=1)
    print(json.dumps({k: info[k] for k in ('d', 'vp', 'hidden')}), info.get('render'))
