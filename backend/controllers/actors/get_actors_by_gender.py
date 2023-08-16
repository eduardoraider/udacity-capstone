from flask import abort, jsonify
from auth.auth import requires_auth
from models.actor import Actor


def route_gets_actors_by_gender(app):
    @app.route('/gender/<int:gender_id>', methods=['GET'])
    @requires_auth('get:actors')
    def gets_actors_by_gender(payload, gender_id):

        actors_by_gender = Actor.query.filter(Actor.gender == gender_id).all()

        actors_by_gender = [actor.short() for actor in actors_by_gender]

        return jsonify({
                    'success': True,
                    'actors': actors_by_gender
                }), 200
