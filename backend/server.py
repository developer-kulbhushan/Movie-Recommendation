from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import uvicorn
from recommendation import pm, gm, get_system_prompt, get_user_query_prompt

# --- FastAPI App ---
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # <-- allow all origins (use specific domains in prod)
    allow_credentials=True,
    allow_methods=["*"],  # <-- allow all HTTP methods
    allow_headers=["*"],  # <-- allow all headers
)

# Request body model
class QueryRequest(BaseModel):
    user_query: str

# Response body model
class RecommendationResponse(BaseModel):
    response: str

@app.post("/recommend", response_model=RecommendationResponse)
def recommend_movies(request: QueryRequest):
    try:
        # Logic from your original function
        movies_metadata = pm.query_index(request.user_query)
        system_prompt = get_system_prompt(movies_metadata)
        user_query_prompt = get_user_query_prompt(request.user_query)
        response = gm.get_answer(system_prompt, user_query_prompt)

        return RecommendationResponse(response=response)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))