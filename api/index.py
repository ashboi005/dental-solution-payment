from flask import Flask, request, jsonify
from flask_cors import CORS  # ✅ Import CORS for Flask
from datetime import datetime
import gspread
from google.oauth2.service_account import Credentials
import json
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "*"}})

SCOPES = [
    "https://spreadsheets.google.com/feeds",
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive.file",
    "https://www.googleapis.com/auth/drive",
]
CREDS_FILE = "credentials.json"  
creds = Credentials.from_service_account_info(
    json.loads(os.getenv("GOOGLE_CREDENTIALS")),  
    scopes=SCOPES
)
client = gspread.authorize(creds)

SPREADSHEET_ID = os.getenv("SPREADSHEET_ID")
if not SPREADSHEET_ID:
    raise ValueError("SPREADSHEET_ID is missing in .env file")

try:
    sheet = client.open_by_key(SPREADSHEET_ID).sheet1
except Exception as e:
    raise Exception(f"Error opening spreadsheet: {e}")

@app.route("/api/submit_form", methods=["POST"])
def submit_form():
    """
    Receives form data and appends it as a new row to Google Sheets.
    """
    try:
        data = request.json
        if not data or not all(k in data for k in ("name", "phone", "email")):
            return jsonify({"error": "Missing required fields"}), 400
        
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        sheet.append_row([timestamp, data["name"], data["phone"], data["email"]])
        
        return jsonify({"result": "success"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/healthchecker", methods=["GET"])
def healthchecker():
    return {"status": "success", "message": "Integrate Flask Framework with Next.js"}


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)
