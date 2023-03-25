import json
from flask import Flask
from flask import request
from flask_cors import CORS, cross_origin
import sqlite3 as sqlite
from datetime import datetime

app = Flask(__name__)
conn = sqlite.connect("./data/db.sqlite")
cur = conn.cursor()
cur.execute("CREATE TABLE IF NOT EXISTS scoutdata (id INTEGER PRIMARY KEY AUTOINCREMENT, time TEXT, data TEXT);")
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@cross_origin
@app.route("/add", methods=["POST"])
def add():
    json_data = request.get_json()
    # print(json_data['data'])
    cur.execute("insert into scoutdata (time, data) values (?, ?)",
            (str(datetime.now()), json_data['data'],))
    conn.commit()
    return 'OK'

@cross_origin
@app.route("/get")
def get():
    cur.execute("select * from scoutdata;")
    rows = cur.fetchall()
    response = app.response_class(
        response=json.dumps(rows),
        status=200,
        mimetype='application/json'
    )
    return response