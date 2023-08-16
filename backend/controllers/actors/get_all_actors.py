from flask import abort, jsonify
from auth.auth import requires_auth
from models.actor import Actor


def route_get_all_actors(app):
    @app.route('/actors', methods=['GET'])
    @requires_auth('get:actors')
    def get_all_actors(payload):

        actors = Actor.query.all()

        if actors is None:
            abort(404)

        actors = [actor.short() for actor in actors]

        return jsonify({
                    'success': True,
                    'actors': actors
                }), 200
