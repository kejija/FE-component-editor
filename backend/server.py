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

# import pandas as pd

app = Flask(__name__)
CORS(app)

# connect to the database
# DATABASE_URL = "127.0.0.1:5432"
DATABASE_URI = 'postgresql+psycopg2://user:password@127.0.0.1:5432/future'
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URI

db = SQLAlchemy(app)

tables = initTables.init(db)

with app.app_context():
    db.drop_all()
    db.session.commit()
    db.create_all()

#get all csvs in folder
csv_folder = 'init_csvs'
for file in os.listdir(csv_folder):
    if file.endswith(".csv"):
        table_name = (file.split(' ')[0])
        print("processing {table} csv".format(table=table_name))
        # with open(os.path.join(csv_folder, file), mode='r', encoding='utf-8-sig') as f:
        # df = pd.read_csv(os.path.join(csv_folder, file))
        # with app.app_context():
        #     # tables[table_name].query.delete()
        #     # db.session.commit()
        #     try:
            # df.to_sql(table_name, con=db.engine, if_exists='append', index=False)
        #     except Exception as e:
        #         print(e)
        #         # db.session.rollback()
        #         continue
            # reader = csv.reader(f)
            # header = next(reader)
            # with app.app_context():
            #     # tables[table_name].query.delete()
            #     # add each row to table
                
            #     for i in reader:
            #         kwargs = {column: value for column, value in zip(header, i)}
            #         try:
            #             new_entry = tables[table_name](**kwargs)
            #             db.session.add(new_entry)
            #             db.session.commit()
                        

            #         except Exception as e:
            #             print(e)
            #             db.session.rollback()
            #             continue


@app.route('/add_component', methods=['POST'])
def add_component():
    data = request.get_json()
    print(data)
    # create component
    component = tables['components'](
        created_by=data['created_by'],
        name=data['name'],
        description=data['description'],
        image_url=data['image_url'],
        category_id=data['category_id'],
        cad=data['cad'],
        guide=data['guide']
    )
    db.session.add(component)
    db.session.commit()

app.run(debug=True)