from fastapi import FastAPI
import sys
import os

# Add the parent directory (project root) to sys.path so we can import 'backend'
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from backend.main import app

# This is necessary for Vercel to find the app instance
# It looks for a variable named 'app' in this file
