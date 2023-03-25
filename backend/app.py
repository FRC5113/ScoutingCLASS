from flask import Flask
from flask import request
from flask_cors import CORS, cross_origin
import sqlite3 as sqlite

app = Flask(__name__)
conn = sqlite.connect("./data/db.sqlite")
cur = conn.cursor()
cur.execute("CREATE TABLE IF NOT EXISTS scoutdata (id INTEGER PRIMARY KEY AUTOINCREMENT, data TEXT);")
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@cross_origin
@app.route("/add", methods=["POST"])
def add():
    json_data = request.get_json()
    print(json_data)
    return 'OK'