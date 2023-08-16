from server import db


class Casting(db.Model):
    __tablename__ = 'castings'

    id = db.Column(db.Integer, primary_key=True)
    actor_id = db.Column(db.Integer, db.ForeignKey('actors.id'),
                         nullable=False)
    movie_id = db.Column(db.Integer, db.ForeignKey('movies.id'),
                         nullable=False)

    def __repr__(self):
        return f'<Casting ID: {self.id}, Actor ID: {self.actor_id}, \
                Movie ID: {self.movie_id}>'

    actor = db.relationship('Actor', backref="castings", viewonly=True)
    movie = db.relationship('Movie', backref="castings", viewonly=True)

    def actor_details(self):
        return {
            'id': self.id,
            'actor_id': self.actor_id,
            'actor_name': self.actor.name,
            'image_link': self.actor.image_link
        }

    def movie_details(self):
        return {
            'id': self.id,
            'movie_id': self.movie_id,
            'movie_title': self.movie.title,
            'image_link': self.movie.image_link
        }
