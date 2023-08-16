from flask import abort, jsonify
from server import db
from auth.auth import requires_auth
from models.actor import Actor


def route_delete_actor(app):
    @app.route('/actors/<int:actor_id>/delete', methods=['DELETE'])
    @requires_auth('delete:actor')
    def delete_actor(payload, actor_id):

        error = False

        actor = db.session.query(Actor).filter_by(id=actor_id).first()

        if actor is None:
            abort(404)

        try:

            actor_name = actor.name
            db.session.delete(actor)
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
                    'name': actor_name
                }), 200
