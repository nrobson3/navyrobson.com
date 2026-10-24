"""Wait until a Fusion local render has (re)written its file: newer than --since and size stable.

    python wait_render.py <png> [--since <epoch>] [--timeout 900]
"""
import os
import sys
import time

path = sys.argv[1]
since = float(sys.argv[sys.argv.index("--since") + 1]) if "--since" in sys.argv else time.time()
timeout = float(sys.argv[sys.argv.index("--timeout") + 1]) if "--timeout" in sys.argv else 900
t0 = time.time()
last = -1
while time.time() - t0 < timeout:
    if os.path.exists(path) and os.path.getmtime(path) > since:
        size = os.path.getsize(path)
        if size == last and size > 0:
            print("ready", path, size, "after %.0f s" % (time.time() - t0))
            sys.exit(0)
        last = size
    time.sleep(3)
print("timeout", path)
sys.exit(1)
