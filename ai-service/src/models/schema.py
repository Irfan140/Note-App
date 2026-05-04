from pydantic import BaseModel

class SummarizeRequest(BaseModel):
    content: str

class SummarizeResponse(BaseModel):
    summary: str