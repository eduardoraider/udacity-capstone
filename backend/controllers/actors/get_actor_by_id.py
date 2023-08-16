from flask import abort, jsonify
from server import db
from auth.auth import requires_auth
from models.actor import Actor
from models.casting import Casting
from models.movie import Movie


def route_get_actor(app):
    @app.route('/actors/<int:actor_id>', methods=['GET'])
    @requires_auth('get:actors')
    def get_actor(payload, actor_id):

        actor = Actor.query.filter(Actor.id == actor_id).one_or_none()

        if actor is None:
            abort(404)

        actor_movies_query = db.session.query(Casting).join(Movie).filter(
            Casting.actor_id == actor_id).order_by("title").all()

        actor_movies = list(map(Casting.movie_details, actor_movies_query))

        data = actor.long()
        data['movies'] = actor_movies

        return jsonify({
                    'success': True,
                    'actor': data
                }), 200
