from pytube import YouTube
import os
import whisper

class Handler:
    def __init__(self) -> None:
        self.output_path = os.getcwd()
        self.model = whisper.load_model("small")
    
    def handle_video_to_audio(self, video_url, filename):
        video_url = video_url
        data = YouTube(video_url)
        output_path = self.output_path
        audio = data.streams.get_audio_only()
        audio.download(output_path=output_path, filename=filename)
        audio_path = self.output_path + "/" + filename
        text = self.model.transcribe(audio_path)
        return text['text']


# video_url = 'https://www.youtube.com/watch?v=SnuNtIO9Cnw'

# data = YouTube(video_url)
# output_path = os.getcwd()
# audio = data.streams.get_audio_only()
# audio_filename = "file.mp4"
# audio.download(output_path=output_path, filename=audio_filename)

# print(audio)

# model = whisper.load_model("small")
# audio_path = output_path + "/" + audio_filename
# text =  model.transcribe(audio_path)
# print(text['text'])

