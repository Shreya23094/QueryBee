#demo code

from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def root():
    return {"message": "Hello, API is running!"}
