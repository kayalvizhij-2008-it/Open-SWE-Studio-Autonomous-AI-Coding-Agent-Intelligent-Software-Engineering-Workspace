"""Compatibility entrypoint for the FastAPI application."""

import os
os.environ.setdefault("REDIS_URI", "redis://localhost:6379")
os.environ.setdefault("REDIS_URI_CUSTOM", "")

from openswe.api.app import app

__all__ = ["app"]
