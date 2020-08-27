import pandas as pd
from textblob import TextBlob
import os
import re

print(os.chdir("public"))

df = pd.read_csv("rq2data.csv")


def cleanText(text):
    text = re.sub("@[a-zA-Z0-9_-]+", "@SCREEN_NAME", text)
    # print(text)
    # print("---")
    return text


for text in df["clean_text"][:1000]:
    text = cleanText(text)
    if "@SCREEN_NAME" in text:
        print(text)
