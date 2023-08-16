from flask import abort, jsonify, request
from auth.auth import requires_auth
from models.movie import Movie


def route_search_movie(app):
    @app.route('/movies/search', methods=['POST'])
    @requires_auth('get:movies')
    def search_movie(payload):

        body = request.get_json()
        search_term = body.get('search_term', None)

        if search_term:

            result = Movie.query.filter(Movie.title.ilike(
                '%' + search_term + '%')).all()

            movies = [movie.short() for movie in result]

            return jsonify({
                'success': True,
                'movies': movies
            }), 200

        else:
            abort(400)
