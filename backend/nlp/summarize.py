# from transformers import PegasusForConditionalGeneration, PegasusTokenizer
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

# class Summarize:
#     def __init__(self) -> None:
#         self.tokenizer = PegasusTokenizer.from_pretrained("google/pegasus-xsum")
#         self.model = PegasusForConditionalGeneration.from_pretrained("google/pegasus-xsum")
    
#     def get_summary(self, text):
#         input_text = text
#         inputs = self.tokenizer([input_text], max_length=5120, truncation=True, return_tensors='pt')
#         summary_ids = self.model.generate(inputs['input_ids'], max_length=1024, num_beams=4, length_penalty=2.0, early_stopping=True)
#         summary = self.tokenizer.decode(summary_ids[0], skip_special_tokens=True)
#         return summary

class Summarize:
    def __init__(self) -> None:
        pass
    
    def get_summary(self, text):
        tokenizer = AutoTokenizer.from_pretrained("gauravkoradiya/T5-Fintuned-on-cnn_daily_mail")
        model = AutoModelForSeq2SeqLM.from_pretrained("gauravkoradiya/T5-Fintuned-on-cnn_daily_mail")
        if not text:
            return "Input text is empty"

        try:
            inputs = tokenizer([text], max_length=1024, truncation=True, return_tensors='pt')
            summary_ids = model.generate(inputs['input_ids'], max_length=512, num_beams=4, length_penalty=2.0, early_stopping=True)
            summary = tokenizer.decode(summary_ids[0], skip_special_tokens=True)
            return summary
        except Exception as e:
            return f"Error generating summary: {str(e)}"
    
# text = """
# Maria Sharapova has basically no friends as tennis players on the WTA Tour. The Russian player has no problems in openly speaking about it and in a recent interview she said: ‘I don’t really hide any feelings too much.
# I think everyone knows this is my job here. When I’m on the courts or when I’m on the court playing, I’m a competitor and I want to beat every single person whether they’re in the locker room or across the net.
# So I’m not the one to strike up a conversation about the weather and know that in the next few minutes I have to go and try to win a tennis match.
# I’m a pretty competitive girl. I say my hellos, but I’m not sending any players flowers as well. Uhm, I’m not really friendly or close to many players.
# I have not a lot of friends away from the courts.’ When she said she is not really close to a lot of players, is that something strategic that she is doing? Is it different on the men’s tour than the women’s tour? ‘No, not at all.
# I think just because you’re in the same sport doesn’t mean that you have to be friends with everyone just because you’re categorized, you’re a tennis player, so you’re going to get along with tennis players.
# I think every person has different interests. I have friends that have completely different jobs and interests, and I’ve met them in very different parts of my life.
# I think everyone just thinks because we’re tennis players we should be the greatest of friends. But ultimately tennis is just a very small part of what we do.
# There are so many other things that we’re interested in, that we do.’
# """

# tokenizer = PegasusTokenizer.from_pretrained("google/pegasus-xsum")
# model = PegasusForConditionalGeneration.from_pretrained("google/pegasus-xsum")

# input_text = text

# inputs = tokenizer([input_text], max_length=5120, truncation=True, return_tensors='pt')
# summary_ids = model.generate(inputs['input_ids'], max_length=150, num_beams=4, length_penalty=2.0, early_stopping=True)
# summary = tokenizer.decode(summary_ids[0], skip_special_tokens=True)