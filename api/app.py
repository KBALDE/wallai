# TODO: create a fastapi app that post chatgpt api and return the response

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI
from dotenv import load_dotenv
import os
import uvicorn
load_dotenv()

app = FastAPI(docs_url="/api/py/docs", openapi_url="/api/py/openapi.json")

# TODO CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
# TODO: add CORS policy
# make a list of allowed origins
ALLOWED_ORIGINS = ["http://localhost:3000"]    

# add CORS policy
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
class ChatRequest(BaseModel):
    message: str

@app.post("/api/py/chat")
async def chat(request: ChatRequest):
    client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": request.message}]
    )
    return {"response": response.choices[0].message.content}    

#if __name__ == "__main__":
#    uvicorn.run(app, host="0.0.0.0", port=8000)