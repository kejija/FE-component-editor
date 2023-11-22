import sqlalchemy
from sqlalchemy import Column, Integer, String
from sqlalchemy import Table
from sqlalchemy.ext.declarative import declarative_base
import json

class Components():
  __tablename__ = 'components'
  id = Column(Integer, primary_key=True)
  name = Column(String)
  description = Column(String)
  price = Column(Integer)
  image = Column(String)
  category = Column(String)
  
  def toJSON(self):
    return json.dumps(self, default=lambda o: o.__dict__, 
      sort_keys=True, indent=2)