import pandas as pd
from textblob import TextBlob
import os
import re

print(os.chdir("public"))

df = pd.read_csv("rq1data.csv")
exclude = [184, 234, 438, 1082, 2317, 2729, 3621, 4183, 5841, 6119, 6772, 6829, 7983, 8837, 10127, 12141, 12552, 13364,
           17285, 17487, 21759, 23372, 24100, 25711, 26423, 27692, 30451, 20459, 20464, 31237, 32103, 33606, 33789, 36123, 16005, 34641, 36150, 13335, 26947, 9512, 21737]
print(len(exclude))
print(len(df))
df = df[~df["idx"].isin(exclude)]
print(len(df))
df.to_csv("rq1data.csv")

# def cleanText(text):
#     text = re.sub("@[a-zA-Z0-9_-]+", "@SCREEN_NAME", text)
#     # print(text)
#     # print("---")
#     return text


# for text in df["clean_text"][:1000]:
#     text = cleanText(text)
#     if "@SCREEN_NAME" in text:
#         print(text)
