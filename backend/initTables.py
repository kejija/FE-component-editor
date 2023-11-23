from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import Integer, String, Float, Numeric, DateTime, Boolean, JSON

def init(db):
  class Manufactures(db.Model):
      id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
      name: Mapped[str] = mapped_column(String)
      description: Mapped[str] = mapped_column(String)
      country: Mapped[str] = mapped_column(String)
      website: Mapped[str] = mapped_column(String)
      category: Mapped[str] = mapped_column(String)

  class Users(db.Model):
      id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
      username: Mapped[str] = mapped_column(String, unique=True, nullable=False)
      email: Mapped[str] = mapped_column(String)
      password: Mapped[str] = mapped_column(String)
    
  class Categories(db.Model):
      id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
      name: Mapped[str] = mapped_column(String, nullable=False)
      description: Mapped[str] = mapped_column(String)
      parent_category_id: Mapped[int] = mapped_column(Integer)

  class Components(db.Model):
      __tablename__ = 'components'
      id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
      created_by: Mapped[int] = mapped_column(Integer, db.ForeignKey(Users.id))
      name: Mapped[str] = mapped_column(String)
      description: Mapped[str] = mapped_column(String)
      image_url: Mapped[str] = mapped_column(String)
      category: Mapped[int] = mapped_column(Integer, db.ForeignKey(Categories.id))
      cad: Mapped[str] = mapped_column(String)
      guide: Mapped[str] = mapped_column(String)

      @staticmethod
      def find_all(session):
        return session.query(Components).all()
    

  class Units(db.Model):
      id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
      name: Mapped[str] = mapped_column(String)
      description: Mapped[str] = mapped_column(String)
      type: Mapped[str] = mapped_column(String)
      SI_name: Mapped[str] = mapped_column(String)
      conversation_to_SI: Mapped[float] = mapped_column(Float)

  class Datasheets(db.Model):
      id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
      name: Mapped[str] = mapped_column(String)
      description: Mapped[str] = mapped_column(String)
      url: Mapped[str] = mapped_column(String)
      manufacutre_id: Mapped[int] = mapped_column(Integer, db.ForeignKey(Manufactures.id), nullable=False)

  class Parameters(db.Model):
      id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
      label: Mapped[str] = mapped_column(String)
      description: Mapped[str] = mapped_column(String)
      unit_id: Mapped[int] = mapped_column(Integer, db.ForeignKey(Units.id))
      default_value: Mapped[float] = mapped_column(String)
      component_id: Mapped[int] = mapped_column(Integer, db.ForeignKey(Components.id), nullable=False)
      datasheet_id: Mapped[int] = mapped_column(Integer, db.ForeignKey(Datasheets.id), nullable=False)
      value_type: Mapped[str] = mapped_column(String)
      type: Mapped[str] = mapped_column(String)
      formula: Mapped[str] = mapped_column(String)
      options: Mapped[str] = mapped_column(JSON)

  print('Tables initialized')

  return {
    'manufactures': Manufactures,
    'users': Users,
    'categories': Categories,
    'components': Components,
    'units': Units,
    'datasheets': Datasheets,
    'parameters': Parameters
  }