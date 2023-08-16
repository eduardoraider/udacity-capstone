from flask import abort, jsonify, request
from server import db
from auth.auth import requires_auth
from models.actor import Actor
from datetime import date
from utils.format_age import calculateAge


def route_edit_actor(app):
    @app.route('/actors/<int:actor_id>/edit', methods=['PATCH'])
    @requires_auth('edit:actor')
    def edit_actor(payload, actor_id):

        body = request.get_json()

        actor = Actor.query.filter(Actor.id == actor_id).one_or_none()

        if actor is None:
            abort(404)

        name = body.get('name', None)
        birthdate = body.get('birthdate', None)
        gender = body.get('gender', None)
        image = body.get('image', None)

        if name == "" or birthdate == "" or gender == "":
            abort(422)

        error = False

        try:

            actor.name = name,
            actor.birthdate = birthdate,
            actor.gender = gender,
            actor.image_link = image

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
                    'name': name,
                    'age': birthdate,
                    'gender': gender,
                    'image': image
                }), 200
