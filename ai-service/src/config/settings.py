import os
from dotenv import load_dotenv

ENVIRONMENT = os.getenv("ENVIRONMENT", "development")

load_dotenv(f".env.{ENVIRONMENT}")

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
PORT = os.getenv("PORT", 8000)