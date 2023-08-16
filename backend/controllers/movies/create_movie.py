from flask import abort, jsonify, request
from server import db
from auth.auth import requires_auth
from models.movie import Movie


def route_create_movie(app):
    @app.route('/movies/create', methods=['POST'])
    @requires_auth('post:movie')
    def create_movie(payload):

        body = request.get_json()

        title = body.get('title', None)
        image = body.get('image', None)
        date = body.get('date', None)

        if title == "" or image == "" or date == "":
            abort(422)

        error = False

        try:
            create_movie = Movie(
                title=title,
                image_link=image,
                release_date=date
            )
            db.session.add(create_movie)
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
