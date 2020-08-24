import pandas as pd
from textblob import TextBlob
import os

print(os.chdir("public"))

df = pd.read_csv("rq1data.csv")


def cleanText(text):
    print(text)

    blob = TextBlob(text)
    text = "".join([str(sentence).capitalize() for sentence in blob.sentences])
    print(text)
    print("---")


for text in df["clean_text"][:100]:
    cleanText(text)
