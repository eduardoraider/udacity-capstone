from flask import abort, jsonify, request
from server import db
from auth.auth import requires_auth
from models.movie import Movie


def route_edit_movie(app):
    @app.route('/movies/<int:movie_id>/edit', methods=['PATCH'])
    @requires_auth('edit:movie')
    def edit_movie(payload, movie_id):

        body = request.get_json()

        movie = Movie.query.filter(Movie.id == movie_id).one_or_none()

        if movie is None:
            abort(404)

        title = body.get('title', None)
        image = body.get('image', None)
        date = body.get('date', None)

        if title == "" or image == "" or date == "":
            abort(422)

        error = False

        try:

            movie.title = title,
            movie.image_link = image,
            movie.release_date = date

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
                    'title': title,
                    'image': image,
                    'date': date
                }), 200
