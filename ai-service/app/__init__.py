from flask import Flask
from flask_cors import CORS

from .routes import ai


def create_app():
    app = Flask(__name__)
    CORS(app)
    app.register_blueprint(ai, url_prefix="/api/ai")

    @app.get("/health")
    def health():
        return {"success": True, "service": "nexafit-ai-service"}

    return app
