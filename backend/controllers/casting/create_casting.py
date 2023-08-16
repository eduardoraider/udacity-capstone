from flask import abort, json, jsonify, request
from server import db
from auth.auth import requires_auth
from models.casting import Casting


def route_create_casting(app):
    @app.route('/casting', methods=['POST'])
    @requires_auth('create:casting')
    def create_casting(payload):

        body = request.get_json()

        movie_id = body.get('movie_id', None)
        casting_ids = body.get('casting_ids', None)

        if movie_id == "" or casting_ids == "":
            abort(401)

        error = False

        try:

            casting_ids = json.loads(casting_ids)
            for id in casting_ids:

                create_casting = Casting(
                    movie_id=movie_id,
                    actor_id=id
                )
                db.session.add(create_casting)
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
                'success': True
            }), 200
