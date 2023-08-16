from server import db
from utils.format_date import format_datetime


class Movie(db.Model):
    __tablename__ = 'movies'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    image_link = db.Column(db.String(500), nullable=False)
    release_date = db.Column(db.DateTime, nullable=False)
    casting = db.relationship('Casting', backref='movies',
                              lazy='dynamic', cascade="all, delete")

    def __repr__(self):
        return f'<Movie ID: {self.id}, title: {self.title}>'

    def short(self):
        return {
            'id': self.id,
            'title': self.title,
            'image_link': self.image_link,
        }

    def long(self):
        return {
            'id': self.id,
            'title': self.title,
            'release_date': format_datetime(self.release_date
                                            .strftime("%Y%m%d%H%M%S")),
            'original_date': self.release_date.strftime("%Y-%m-%d"),
            'image_link': self.image_link,
        }
