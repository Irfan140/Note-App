from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from src.config.settings import GROQ_API_KEY

# Initialize Groq model
llm = ChatGroq(
    model="llama-3.3-70b-versatile",
    temperature=0.0,
    api_key=GROQ_API_KEY,
)

#  LCEL chain: prompt | model | output_parser
prompt = ChatPromptTemplate.from_template(
    """Summarize the following note in 2-3 concise sentences capturing the key points.
Do NOT include any preamble, labels, or introductory text — respond with ONLY the summary itself.

Note:
{text}"""
)

summarize_chain = prompt | llm | StrOutputParser()