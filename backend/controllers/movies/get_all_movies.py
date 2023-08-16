from flask import request, abort, jsonify
from auth.auth import requires_auth
from flask_cors import CORS, cross_origin
from models.movie import Movie


def route_get_all_movies(app):
    @app.route('/movies', methods=['GET'])
    @requires_auth('get:movies')
    def get_all_movies(payload):

        movies = Movie.query.all()

        if movies is None:
            abort(404)

        movies = [movie.short() for movie in movies]

        return jsonify({
                    'success': True,
                    'movies': movies
                }), 200
