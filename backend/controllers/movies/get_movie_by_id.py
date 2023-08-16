from flask import abort, jsonify
from server import db
from auth.auth import requires_auth
from models.actor import Actor
from models.casting import Casting
from models.movie import Movie


def route_get_movie(app):
    @app.route('/movies/<int:movie_id>', methods=['GET'])
    @requires_auth('get:movies')
    def get_movie(payload, movie_id):

        movie = Movie.query.filter(Movie.id == movie_id).one_or_none()

        if movie is None:
            abort(404)

        movie_actors_query = db.session.query(Casting).join(Actor).filter(
            Casting.movie_id == movie_id).order_by("name").all()

        movie_actors = list(map(Casting.actor_details, movie_actors_query))

        data = movie.long()
        data['actors'] = movie_actors

        return jsonify({
                    'success': True,
                    'movie': data
                }), 200
