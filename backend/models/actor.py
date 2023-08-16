from server import db
from datetime import date
from utils.format_age import calculateAge
from utils.format_date import format_datetime


class Actor(db.Model):
    __tablename__ = 'actors'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    birthdate = db.Column(db.DateTime, nullable=False)
    gender = db.Column(db.Integer, nullable=False)
    image_link = db.Column(db.String(500), nullable=False)
    casting = db.relationship('Casting', backref='actors',
                              lazy='dynamic', cascade="all, delete")

    def __repr__(self):
        return f'<Actor ID: {self.id}, name: {self.name}>'

    def short(self):
        return {
            'id': self.id,
            'name': self.name,
            'gender': self.gender,
            'image_link': self.image_link
        }

    def long(self):
        return {
            'id': self.id,
            'name': self.name,
            'age': calculateAge(self.birthdate.strftime("%Y%m%d%H%M%S")),
            'born': format_datetime(self.birthdate.strftime("%Y%m%d%H%M%S")),
            'birthdate': self.birthdate.strftime("%Y-%m-%d"),
            'gender': self.gender,
            'image_link': self.image_link,
        }
