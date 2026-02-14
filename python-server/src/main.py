from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from src.routers.summarize import router as summarize_router
from src.config.settings import PORT


app = FastAPI(title="Note Summarization Service")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(summarize_router)


if __name__ == "__main__":
    port = int(PORT) if PORT else 5000
    uvicorn.run(app, host="0.0.0.0", port=port)