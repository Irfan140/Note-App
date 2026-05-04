
from fastapi import APIRouter, HTTPException
from src.models.schema import SummarizeRequest, SummarizeResponse
from src.services.summarize import summarize_chain

router = APIRouter()


@router.get("/")
def read_root():
    return {"message": "Note Summarization API is running"}


@router.get("/health")
def health_check():
    return {"status": "healthy"}


@router.post("/summarize", response_model=SummarizeResponse)
async def summarize_note(request: SummarizeRequest):
    """
    Summarize note content using modern LangChain + Groq
    """
    try:
        if not request.content or len(request.content.strip()) < 10:
            raise HTTPException(
                status_code=400,
                detail="Content is too short to summarize",
            )

        result = summarize_chain.invoke({"text": request.content})

        return SummarizeResponse(summary=result.strip())

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Summarization failed: {str(e)}",
        )