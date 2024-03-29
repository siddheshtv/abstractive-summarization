from nlp.summarize import Summarize
from mp4_handler.handler import Handler
from fastapi import FastAPI, HTTPException

app = FastAPI()

@app.get("/")
def checker():
    return "Server Running"

@app.post("/summarize")
def summarization(request_data: dict):
    video_url = request_data.get('video_url')
    filename = request_data.get('filename')

    if not video_url or not filename:
        raise HTTPException(status_code=400, detail="Video URL and filename are required.")

    text_summary = Summarize()
    handle_video = Handler()

    text = handle_video.handle_video_to_audio(video_url, filename)
    print(text)
    print(type(text))
    summary = text_summary.get_summary(text)
    return {"summary": summary}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
