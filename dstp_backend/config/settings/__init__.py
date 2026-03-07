"""
DSTP Backend — Settings Package Init
Auto-selects the correct settings module based on the DJANGO_ENV
environment variable.

Set DJANGO_ENV=development  →  loads dev.py
Set DJANGO_ENV=production   →  loads prod.py
Default (unset)             →  loads dev.py (safe fallback)
"""

import os

env = os.environ.get("DJANGO_ENV", "development").lower()

if env == "production":
    from .prod import *   # noqa: F401, F403
else:
    from .dev import *    # noqa: F401, F403