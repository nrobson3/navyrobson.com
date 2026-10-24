// All site copy lives here, so wording changes never touch layout code.

export const links = {
  upwork: 'https://www.upwork.com/freelancers/navyrobson',
  github: 'https://github.com/nrobson3',
  linkedin: 'https://www.linkedin.com/in/navy-robson',
}

export const about =
  "I'm a first-year engineering student at Western University and a freelance mechanical designer. " +
  "I design mechanisms, moulded parts and production drawings in Fusion 360, and I check each one with measured numbers before it's built. " +
  "I'm working toward co-op roles in mechanical design."

export const hero = {
  plate: 'gearbox',
  alt: 'Exploded 16:1 helical planetary gearbox: motor flange, sun gear, two planet carriers, ring gear and output cap',
  caption: '16:1 helical planetary gearbox',
  fact: 'Measured mesh gap 0.1636 mm, identical on all three planets.',
  /** the same fact in one phone-width line */
  factShort: 'Mesh gap 0.1636 mm, all three planets',
}

export const chapters = [
  { id: 'about', nav: 'About', title: 'Navy Robson' },
  { id: 'projects', nav: 'Projects', title: 'Projects' },
  { id: 'skills', nav: 'Skills', title: 'Skills and qualifications' },
  { id: 'experience', nav: 'Experience', title: 'Experience' },
  { id: 'beyond', nav: 'Beyond', title: 'Beyond the work' },
  { id: 'next', nav: 'Next', title: "What's next" },
] as const

// ---------- Chapter 3: Skills and qualifications ----------
// Every row says where it can be checked: a project anchor on this page or a public link.
export type Proof = { label: string; href: string }
export type SkillRow = { name: string; detail: string; proof: Proof[] }
export type SkillGroup = { title: string; rows: SkillRow[] }

const at = (id: string, label: string): Proof => ({ label, href: `#project-${id}` })

export const skillsIntro = 'What I use and how well, with each line pointing to where you can check it.'

export const skills: SkillGroup[] = [
  {
    title: 'CAD and drawings',
    rows: [
      {
        name: 'Autodesk Fusion 360',
        detail: 'My main tool, used daily: parametric parts, assemblies with joints and motion links, rendering and drawings.',
        proof: [at('gimbal', 'Gimbal'), at('gearbox', 'Gearbox'), at('snapfit', 'Housing')],
      },
      {
        name: 'Fusion 360 API',
        detail: 'Python scripts that build parts and check them: clash sweeps, volume checks and STEP round trips.',
        proof: [at('gripper', 'Gripper'), at('link', 'NASA link'), { label: 'GitHub', href: links.github }],
      },
      {
        name: 'Onshape',
        detail: 'Coursework at Western, including a multi-part assembly with mates.',
        proof: [],
      },
      {
        name: 'Drawings and GD&T',
        detail: 'ISO and ANSI sheets with sections, datums and geometric tolerances, generated from the model.',
        proof: [at('snapfit', 'Housing'), at('gimbal', 'Gimbal')],
      },
    ],
  },
  {
    title: 'Engineering',
    rows: [
      {
        name: 'Mechanism design',
        detail: 'Gear trains, linkages, rack and pinion, and lost-motion overrides, checked across their full range.',
        proof: [at('gimbal', 'Gimbal'), at('gearbox', 'Gearbox'), at('brake', 'Brake')],
      },
      {
        name: 'Design for injection moulding',
        detail: 'Draft, wall thickness, undercuts, parting lines and snap-fit strain against the material datasheet.',
        proof: [at('snapfit', 'Housing')],
      },
      {
        name: 'Design for 3D printing',
        detail: 'Flexures sized to strain limits, print orientation, and clearances that survive FDM tolerance.',
        proof: [at('gripper', 'Gripper'), at('gimbal', 'Gimbal')],
      },
      {
        name: 'Analysis',
        detail: 'Hand calculations, safety factors, a 2D finite-element solver I wrote, and tolerance checks.',
        proof: [at('brake', 'Brake'), at('gripper', 'Gripper')],
      },
      {
        name: 'Reverse engineering',
        detail: 'Parametric models from photos, sketches and old drawings, with the uncertain dimensions flagged.',
        proof: [at('link', 'NASA link')],
      },
    ],
  },
  {
    title: 'Code',
    rows: [
      {
        name: 'Python',
        detail: 'numpy, matplotlib and shapely, written as small tools with unit tests.',
        proof: [{ label: 'GitHub', href: links.github }],
      },
      {
        name: 'Git and GitHub',
        detail: 'Public, MIT-licensed repositories with tests and documentation.',
        proof: [{ label: 'GitHub', href: links.github }],
      },
    ],
  },
  {
    title: 'Qualifications',
    rows: [
      {
        name: 'Western University',
        detail: 'Bachelor of Engineering Science, common first year, 2026 to 2031 including a co-op year.',
        proof: [],
      },
    ],
  },
]

// ---------- Chapter 6: What's next ----------
export const next = {
  intro: 'Mechanical engineering, aimed at aerospace and motorsport.',
  body: [
    "After Western's common first year I'm going into mechanical engineering. I want to work where engineering is held to the tightest numbers: aerospace and motorsport, at places like Lockheed Martin or a Formula 1 team.",
    "The steps toward that start now: co-op and internship roles in mechanical design, and the Western Formula Racing team.",
  ],
  closing: 'Hiring for co-op or a design role?',
}

// ---------- Chapter 4: Experience ----------
// Aggregate numbers only: no individual client job is named or described here.
export const experience = {
  intro: 'Paid design work since September 2026, found, scoped, priced and delivered on my own.',
  role: 'Freelance Mechanical Designer',
  org: 'Upwork, self-employed',
  dates: 'since September 2026',
  summary:
    'I take small, well-defined jobs: mechanisms, moulded parts, sketch or photo to CAD, and drawing sets. Every delivery comes as the native Fusion 360 file, STEP, STL where it is printed, and PDF drawings, with a note listing each assumption I made.',
  stats: [
    { term: 'Jobs', value: '10' },
    { term: 'Job Success', value: '100%' },
    { term: 'Rating', value: '5.0 on every review' },
    { term: 'Repeat clients', value: '2' },
  ],
  quote:
    'The guy went above and beyond, I just asked for a simple cad model and he gave me a full motion analysis...',
  quoteSource: 'Client review of the camera gimbal, Upwork, 5.0',
  link: { label: 'Upwork profile and reviews', href: links.upwork },
}

// ---------- Chapter 5: Beyond the work ----------
export type BeyondEntry = {
  id: string
  name: string
  role: string
  text: string
  facts: Spec[]
  link?: { label: string; href: string }
}

export const beyondIntro = 'A racing team, a business I started at 17, and the code behind the models.'

export const beyond: BeyondEntry[] = [
  {
    id: 'wfr',
    name: 'Western Formula Racing',
    role: 'Recruit, autonomous subsystem, 2026',
    text:
      'For my recruit project I designed the driverless service brake shown above: mechanism, sizing, a control simulation and a CAN message set, cited rule by rule to the FSAE Rules and the Driverless Supplement.',
    facts: [
      { term: 'Clash check', value: '1,746 part pairs, 0 clashes' },
      { term: 'Analysis', value: 'A 2D finite-element solver written for the job' },
      { term: 'Code', value: '54 unit tests' },
    ],
    link: { label: 'See the brake', href: '#project-brake' },
  },
  {
    id: 'blackline',
    name: 'Blackline Growth',
    role: 'Founder, Meta Ads agency, from age 17',
    text:
      'A performance-marketing agency for jewellery brands. I ran the accounts, the testing and the reporting, and decided by the numbers rather than by taste.',
    facts: [
      { term: 'Client revenue', value: '$95k+ at 4.16x average return on ad spend' },
      { term: 'Best account', value: '$2.5k to $20.5k in revenue, 8.37x' },
      { term: 'Best campaign', value: '11.55x' },
    ],
  },
  {
    id: 'code',
    name: 'Open-source CAD tools',
    role: 'github.com/nrobson3, MIT licensed',
    text:
      'The Python behind my models, published as small tested tools: Fusion 360 scripts that build and verify parts, and checks that run on any STL.',
    facts: [
      { term: 'fusion360-parametric-parts', value: 'Gearset, gripper and housing generators with verification' },
      { term: 'injection-moulding-dfm', value: 'Draft, undercuts, wall thickness and parting lines from an STL; 29 tests' },
      { term: 'cad-drawing-sheets', value: 'ISO drawing sheets from Python, sections cut from meshes; 34 tests' },
    ],
    link: { label: 'GitHub', href: links.github },
  },
]

export const projectsIntro =
  'Six builds. Each one is shown first as its drawing and then as the finished model, with the numbers I checked it against.'

export type Spec = { term: string; value: string }
/** A dimension callout on a plate: tip in % of the plate (x across, y down), leader runs to the given side. */
export type Callout = { x: number; y: number; side: 'left' | 'right'; label: string }

/** Tips were picked on the 1080x1440 renders; each label restates a spec from that project's table. */
export const callouts: Record<string, Callout[]> = {
  gearbox: [
    { x: 38, y: 32, side: 'left', label: 'Mesh gap 0.1636 mm' },
    { x: 66, y: 62, side: 'right', label: 'Ring 54T, helix 15°' },
  ],
  gimbal: [
    { x: 60, y: 30, side: 'right', label: 'Tilt ±79.3°' },
    { x: 44, y: 69, side: 'left', label: 'Pan ±140.6°' },
  ],
  snapfit: [
    { x: 35, y: 48, side: 'left', label: 'Snap strain 0.74%' },
    { x: 21, y: 64, side: 'left', label: 'Wall 2.0 mm, draft 1.5°' },
  ],
  brake: [
    { x: 62, y: 38, side: 'right', label: 'Slotted pull-link' },
    { x: 42, y: 50, side: 'left', label: 'AK80-9, 76 bar' },
  ],
  link: [
    { x: 61, y: 35, side: 'right', label: 'Pin Ø6.06 mm, flagged' },
    { x: 35, y: 60, side: 'left', label: 'Holes 7/32 in' },
  ],
  gripper: [
    { x: 33, y: 50, side: 'left', label: 'Flexure 0.8 mm' },
    { x: 67, y: 46, side: 'right', label: 'Jaw gap 14.0 to 3.6 mm' },
  ],
}
/** The hero plate's left edge fades into the copy, so its callouts all run right. */
export const heroCallouts: Callout[] = [
  { x: 38, y: 32, side: 'right', label: 'Mesh gap 0.1636 mm' },
  { x: 66, y: 62, side: 'right', label: 'Ring 54T, helix 15°' },
]
export type Project = {
  id: string
  name: string
  summary: string
  /** who it was for and when; the first row of every label */
  made: string
  specs: Spec[]
  alt: string
  link?: { label: string; href: string }
}

// Each project is one calibre plate: linework that lights into the render.
// Art is generated by art/make_web_art.py into public/plates/<id>/.
// Every label uses the same schema, so the six read as one collection.
export const projects: Project[] = [
  {
    id: 'gimbal',
    name: '2-axis FPV camera gimbal',
    summary:
      'Pan and tilt for a DJI O4 Lite camera on two 1.5 g linear servos. A late range change was solved with a 1.5:1 gear stage instead of an unprintable pinion.',
    made: 'Client project, September 2026',
    specs: [
      { term: 'Pan / tilt', value: '±140.6° / ±79.3°' },
      { term: 'Servo stroke', value: '9 mm' },
      { term: 'Clash check', value: '15 poses, 0 clashes' },
      { term: 'Delivered', value: '3 days, rated 5.0' },
    ],
    alt: 'Two-axis FPV camera gimbal: charcoal base housing, grey tilt frame and the camera on top',
    link: { label: 'Upwork profile', href: links.upwork },
  },
  {
    id: 'snapfit',
    name: 'Snap-fit sensor housing',
    summary:
      'A two-part ABS housing redesigned so the snap fit moulds in a straight-pull tool. The pass-through core replaces two cam slides.',
    made: 'Original design, October 2026',
    specs: [
      { term: 'Wall / draft', value: '2.0 mm / 1.5°' },
      { term: 'Snap strain', value: '0.74% of 1.09% allowed' },
      { term: 'Mould slides', value: '0, down from 2' },
      { term: 'Faces under 0.5°', value: '0' },
    ],
    alt: 'Sensor housing with its cover lifted, showing the snap arm, PCB and battery cells inside the white body',
    link: { label: 'Draft and undercut checks on GitHub', href: 'https://github.com/nrobson3/injection-moulding-dfm' },
  },
  {
    id: 'brake',
    name: 'Driverless service brake',
    summary:
      'A motor-driven brake actuator for a driverless Formula SAE car. A slotted link lets the driver always press harder than the motor.',
    made: 'Western Formula Racing recruit project, October 2026',
    specs: [
      { term: 'Actuator', value: 'CubeMars AK80-9' },
      { term: 'Line pressure', value: '76 bar, 59 needed' },
      { term: 'Override detected', value: '94 ms' },
      { term: 'Machined parts at stall', value: 'Safety factor 4.0 or more' },
    ],
    alt: 'Brake pedal with a gold motor bracket, crank and slotted pull-link on a reference pedal box',
    link: { label: 'Design code on GitHub', href: 'https://github.com/nrobson3/driverless-service-brake' },
  },
  {
    id: 'link',
    name: 'Photo to CAD: 1977 NASA drive link',
    summary:
      'Two archive photos and a scale card turned into a parametric model. The card stood off the part plane, so I rescaled on the boss.',
    made: 'Reverse-engineering exercise, October 2026',
    specs: [
      { term: 'Input', value: '2 photos, 1 scale card' },
      { term: 'Within 1.7% of standard', value: '12 of 14 features' },
      { term: 'Bodies', value: 'Plate, boss, weld' },
      { term: 'STEP round trip', value: '0 ppm volume change' },
    ],
    alt: 'Stainless steel drive link with a turned boss and pin',
  },
  {
    id: 'gripper',
    name: 'Single-piece compliant gripper',
    summary:
      'Parallel jaws that print as one part, with no pins, screws or springs. All motion comes from flexure hinges sized against PLA.',
    made: 'Original design, August 2026',
    specs: [
      { term: 'Flexure', value: '0.8 mm, two nozzle widths' },
      { term: 'Peak strain', value: '1.05% at 12°' },
      { term: 'Safety factor', value: '1.9 PLA, 3.8 PETG' },
      { term: 'Jaw gap', value: '14.0 to 3.6 mm' },
    ],
    alt: 'Orange single-piece gripper with two parallelogram flexure linkages and long handles',
    link: { label: 'Generator script on GitHub', href: 'https://github.com/nrobson3/fusion360-parametric-parts' },
  },
  {
    id: 'gearbox',
    name: '16:1 helical planetary gearbox',
    summary:
      'A two-stage planetary for a NEMA 17, rebuilt from the gear math up. The 15-tooth sun undercut, so it went to 18 teeth.',
    made: 'Original design, July 2026',
    specs: [
      { term: 'Ratio', value: '16.000:1, measured' },
      { term: 'Teeth', value: '18 / 18 / 54' },
      { term: 'Helix / pressure angle', value: '15° / 20°' },
      { term: 'Mesh gap', value: '0.1636 mm on all three planets' },
    ],
    alt: hero.alt,
    link: { label: 'Gear generator on GitHub', href: 'https://github.com/nrobson3/fusion360-parametric-parts' },
  },
]
