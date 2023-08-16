from flask import abort, jsonify, request
from server import db
from auth.auth import requires_auth
from models.casting import Casting


def route_delete_casting(app):
    @app.route('/casting/<int:casting_id>/delete', methods=['DELETE'])
    @requires_auth('delete:casting')
    def delete_casting(payload, casting_id):

        error = False

        casting = db.session.query(Casting).filter_by(
            id=casting_id).one_or_none()

        if casting is None:
            abort(404)

        try:

            db.session.delete(casting)
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
                }), 200
