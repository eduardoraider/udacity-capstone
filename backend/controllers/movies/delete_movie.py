from flask import abort, jsonify
from server import db
from auth.auth import requires_auth
from models.movie import Movie


def route_delete_movie(app):
    @app.route('/movies/<int:movie_id>/delete', methods=['DELETE'])
    @requires_auth('delete:movie')
    def delete_movie(payload, movie_id):

        error = False

        movie = db.session.query(Movie).filter_by(id=movie_id).first()

        if movie is None:
            abort(404)

        try:

            movie_title = movie.title
            db.session.delete(movie)
            db.session.commit()

        except Exception as ex:
            error = True
            db.session.rollback()
            app.logger.error(ex, exc_info=True)
        finally:
            db.session.close()
        if error:
            abort(422)
        else:
            return jsonify({
                    'success': True,
                    'title': movie_title
                }), 200
