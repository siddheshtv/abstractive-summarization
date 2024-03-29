from transformers import pipeline

class Summarize:
    def __init__(self) -> None:
        pass
    
    def get_summary(self, text):
        summarizer = pipeline("summarization", model="iamsid47/summarization_model")
        summary = summarizer(text)
        return summary