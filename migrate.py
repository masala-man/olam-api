import pymongo
import csv
import os 

# setup DB
client = pymongo.MongoClient("mongodb://localhost:27017")
db = client['olam']
words = db['word']

# parse CSV and insert into DB
with open('olam-enml.csv', encoding='utf-8') as csvFile:
	csvReader = csv.DictReader(csvFile, delimiter="	")
	for row in csvReader:
		entry = {
			"id": row["# id"],
			"english_word": row["english_word"],
			"part_of_speech": row["part_of_speech"],
			"malayalam_definition": row["malayalam_definition"]
		}
		words.insert_one(entry)
		print(f"{entry['english_word']} => {entry['malayalam_definition']}")
os.remove("olam-enml.csv")
print("---FINISHED---")