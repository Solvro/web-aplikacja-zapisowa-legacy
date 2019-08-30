import csv
import random


SEX = ['M', 'F']
INDEX_BEGIN = 236775

with open('emails.csv', 'r') as csvfile:
    data = csv.DictReader(csvfile)
    with open('generated_participants.csv', mode='w') as file:
        file.write("index,sex,faculty,name,email\n")
        for row_no, row in enumerate(data):
            index = INDEX_BEGIN + row_no
            sex = random.choice(SEX)
            faculty = random.randint(1, 13)
            name = row['name'][:20]
            email = row['email']
            file.write(f"{index},{sex},{faculty},{name},{email}\n")
