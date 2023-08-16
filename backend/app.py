from flask import Flask
from server import setup_db
from flask_cors import CORS
from routes import app_routes


def create_app(test_config=None):

    app = Flask(__name__)
    setup_db(app)
    CORS(app, resources={r"/*": {"origins": "*"}})

    # CORS Headers
    @app.after_request
    def after_request(response):
        response.headers.add(
            'Access-Control-Allow-Headers',
            'Content-Type,Authorization')
        response.headers.add(
            'Access-Control-Allow-Methods',
            'GET,POST,PATCH,DELETE')
        return response

    app_routes(app)

    return app


app = create_app()

if __name__ == '__main__':
    app.run(debug=True)
