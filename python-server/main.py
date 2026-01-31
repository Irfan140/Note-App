from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Note Summarization Service")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class SummarizeRequest(BaseModel):
    content: str

class SummarizeResponse(BaseModel):
    summary: str

# Initialize modern OpenAI model 
llm = ChatOpenAI(
    model="gpt-4o-mini",
    temperature=0.0,
    api_key=os.getenv("OPENAI_API_KEY"),
)

# Modern LCEL chain: prompt | model | output_parser
prompt = ChatPromptTemplate.from_template(
    """You are a helpful assistant that summarizes notes concisely.
    
Summarize the following note in 2-3 sentences, capturing the key points:

{text}

Summary:"""
)

summarize_chain = prompt | llm | StrOutputParser()

@app.get("/")
def read_root():
    return {"message": "Note Summarization API is running"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}

@app.post("/summarize", response_model=SummarizeResponse)
async def summarize_note(request: SummarizeRequest):
    """
    Summarize note content using modern LangChain + OpenAI
    """
    try:
        if not request.content or len(request.content.strip()) < 10:
            raise HTTPException(
                status_code=400, 
                detail="Content is too short to summarize"
            )
        
        # Modern .invoke() with dict input
        result = summarize_chain.invoke({"text": request.content})
        
        return SummarizeResponse(summary=result.strip())
    
    except Exception as e:
        raise HTTPException(
            status_code=500, 
            detail=f"Summarization failed: {str(e)}"
        )

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
