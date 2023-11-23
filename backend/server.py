# create a flask server that interacts with a postgresql local database

from flask import Flask, request, jsonify
from flask_cors import CORS
# import sqlalchemy
from sqlalchemy import Integer, String, Float, Numeric, DateTime, Boolean, JSON
from sqlalchemy.orm import Mapped, mapped_column
from flask_sqlalchemy import SQLAlchemy

import json
import os
import csv

# from initTables import import_csvs
import initTables

app = Flask(__name__)
CORS(app)

# connect to the database
# DATABASE_URL = "127.0.0.1:5432"
DATABASE_URI = 'postgresql+psycopg2://user:password@127.0.0.1:5432/future'
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URI

db = SQLAlchemy(app)

tables = initTables.init(db)

#get all csvs in folder
csv_folder = 'init_csvs'
for file in os.listdir(csv_folder):
    if file.endswith(".csv"):
        table_name = (file.split(' ')[0])
        print("processing {table} csv".format(table=table_name))
        with open(os.path.join(csv_folder, file), mode='r', encoding='utf-8-sig') as f:
            reader = csv.reader(f)
            header = next(reader)
            with app.app_context():
                tables[table_name].query.delete()
                # add each row to table
                for i in reader:
                    kwargs = {column: value for column, value in zip(header, i)}
                    new_entry = tables[table_name](**kwargs)
                    db.session.add(new_entry)
                    db.session.commit()

with app.app_context():
    db.drop_all()
    db.create_all()