from nlp.summarize import Summarize
from mp4_handler.handler import Handler
from fastapi import FastAPI, HTTPException, UploadFile, File
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import os


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

class RequestData(BaseModel):
    video_url: str
    filename: str

@app.get("/")
def checker():
    return "Server Running"

@app.post("/summarize")
def summarization(request_data: RequestData):
    video_url = request_data.video_url
    filename = request_data.filename

    if not video_url or not filename:
        raise HTTPException(status_code=400, detail="Video URL and filename are required.")

    print("Starting sequence...")
    text_summary = Summarize()
    handle_video = Handler()
    print(f"Video URL: {video_url}\nFile name: {filename}\n\nConverting video to text...")
    text = handle_video.handle_video_to_audio(video_url, filename)
    print(text)
    print(type(text))
    summary = text_summary.get_summary(text)
    handle_video.handle_file_gracefully(filename)
    return {"summary": summary}

@app.post("/summarize-offline")
async def summarization_offline(file: UploadFile = File(...)):
    if not file:
        raise HTTPException(status_code=400, detail="File upload required.")

    upload_folder = 'uploads'
    os.makedirs(upload_folder, exist_ok=True)
    file_path = os.path.join(upload_folder, file.filename)
    with open(file_path, "wb") as file_object:
        file_object.write(file.file.read())

    print(f"Uploaded file: {file_path}")

    handle_video = Handler()
    audio_file = handle_video.handle_video_to_audio_offline(file_path)

    text_summary = Summarize()
    text = text_summary.get_summary(audio_file)
    os.remove(file_path)
    print("Gracefully removed uploaded file...")
    return {"summary": text}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
