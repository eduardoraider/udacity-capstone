from flask import abort, jsonify, request
from server import db
from auth.auth import requires_auth
from models.actor import Actor
from datetime import date
from utils.format_age import calculateAge


def route_create_actor(app):
    @app.route('/actors/create', methods=['POST'])
    @requires_auth('post:actor')
    def create_actor(payload):

        body = request.get_json()

        name = body.get('name', None)
        birthdate = body.get('birthdate', None)
        gender = body.get('gender', None)
        image = body.get('image', None)

        if name == "" or birthdate == "" or gender == "" or image == "":
            abort(422)

        error = False

        try:
            create_actor = Actor(
                name=name,
                birthdate=birthdate,
                gender=gender,
                image_link=image
            )
            db.session.add(create_actor)
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
