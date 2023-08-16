from flask import abort, jsonify, request
from auth.auth import requires_auth
from models.actor import Actor


def route_search_actor(app):
    @app.route('/actors/search', methods=['POST'])
    @requires_auth('get:actors')
    def search_actor(payload):

        body = request.get_json()
        search_term = body.get('search_term', None)

        if search_term:

            actors = Actor.query.filter(Actor.name.ilike(
                '%' + search_term + '%')).all()

            actors = [actor.short() for actor in actors]

            return jsonify({
                'success': True,
                'actors': actors
            }), 200

        else:
            abort(400)
