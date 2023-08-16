import os
from flask import jsonify
from auth.auth import AuthError


def init_routes(app):
    @app.route('/')
    def index():
        excited = os.environ['EXCITED']
        greeting = "Capstone is Live"
        if (excited):
            greeting = greeting + "!!!!! You are doing great" \
                "in this Udacity project."
        return greeting

    # 400 Bad Request
    @app.errorhandler(400)
    def bad_request(error):
        return jsonify({
            'success': False,
            'error': 400,
            'message': 'Error 400 / Bad Request'
        }), 400

    # 401 Unauthorized
    @app.errorhandler(401)
    def unauthorized(error):
        return jsonify({
            'success': False,
            'error': 401,
            'message': 'Error 401 / Unauthorized'
        }), 401

    # 403 Forbidden
    @app.errorhandler(403)
    def forbidden(error):
        return jsonify({
            'success': False,
            'error': 403,
            'message': 'Error 403 / Forbidden'
        }), 403

    # 404 Not Found
    @app.errorhandler(404)
    def not_found(error):
        return jsonify({
            'success': False,
            'error': 404,
            'message': 'Error 404 / Not Found'
        }), 404

    # 405 Method Not Allowed
    @app.errorhandler(405)
    def not_allowed(error):
        return jsonify({
            'success': False,
            'error': 405,
            'message': 'Error 405 / Method Not Allowed'
        }), 405

    # 409 Conflict
    @app.errorhandler(409)
    def conflict(error):
        return jsonify({
            'success': False,
            'error': 409,
            'message': 'Error 409 / Conflict'
        }), 409

    # 422 Unprocessable Entity
    @app.errorhandler(422)
    def unprocessable_entity(error):
        return jsonify({
            "success": False,
            "error": 422,
            "message": "Error 422 / Unprocessable Entity"
        }), 422

    # 500 Internal Server Error
    @app.errorhandler(500)
    def server_error(error):
        return jsonify({
            'success': False,
            'error': 500,
            'message': 'Error 500 / Internal Server Error'
        }), 500

    # Auth0 Error
    @app.errorhandler(AuthError)
    def auth_error(auth_error):
        return jsonify({
            "success": False,
            "error": auth_error.status_code,
            "message": auth_error.error['description']
        }), auth_error.status_code
