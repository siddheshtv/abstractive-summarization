from pytube import YouTube
import os
import whisper

class Handler:
    def __init__(self) -> None:
        pass
    
    def handle_video_to_audio(self, video_url, file_name):
        output_path = os.getcwd()
        model = whisper.load_model("small")
        data = YouTube(video_url)
        output_path = output_path
        audio = data.streams.get_audio_only()
        audio.download(output_path=output_path, filename=file_name)
        audio_path = output_path + "/" + file_name
        text = model.transcribe(audio_path)
        return text['text']
    
    def handle_video_to_audio_offline(self, video):
        model = whisper.load_model("small")
        text = model.transcribe(video)
        return text['text']

    def handle_file_gracefully(self, file_name):
        output_path = os.getcwd()
        audio_path = output_path + "/" + file_name
        os.remove(audio_path)
        return print("Gracefully removed audio file...")

