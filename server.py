from flask import Flask, render_template, redirect,jsonify
import os
#from flask_pymongo import PyMongo
import pymongo
from flask_cors import CORS

app = Flask(__name__)
app.config['MONGO_CONNECT'] = False
CORS(app)
#local

client = pymongo.MongoClient(os.getenv("MONGO_URI", "mongodb://localhost:27017/"))
db = client.crime_db_3
#cloud
#conn=myconnection
#client = pymongo.MongoClient(conn)
#db = client.crime_db_4
npu_listings = list(db.npu.find())
cat_listings=list(db.cat.find())
data_listings=list(db.crime_info.find())
cat_neighborhood_listings=list(db.cat_neighborhood.find())
year_neighborhood_listings=list(db.year_neighborhood.find())

@app.route("/", methods=["GET"])
def home():
     return render_template("index.html")
@app.route("/neighborhood", methods=["GET"])
def mapping():
     return render_template("choropleth.html")
@app.route("/dashboard", methods=["GET"])
def dash():
     return render_template("cat_dashboard.html")
@app.route("/dash" , methods=["GET"])
def dashing():
     return render_template("dashboard.html")
@app.route("/map" , methods=["GET"])
def lalamap():
     return render_template("lalamap.html")
@app.route("/year_neighborhood", methods=["GET"])
def year_neighborhood():
    res=[]
    for listing in year_neighborhood_listings:
        res.append({
         'neighborhood': listing["neighborhood"],
        'occur_year': listing["occur_year"],
        'occur_count': listing["occur_count"]})
    return jsonify(res=res)
@app.route("/cat_neighborhood", methods=["GET"])
def cat_neighborhood():
    res=[]
    for listing in cat_neighborhood_listings:
        res.append({
        'neighborhood': listing["neighborhood"],
        'crime_type': listing["crime_type"],
        'occur_year': listing["occur_year"],
        'occur_month':listing["occur_month"],
        'occur_count': listing["occur_count"]})
    return jsonify(res=res)
@app.route("/MapAPI", methods=["GET"])
def MapAPI():
    res=[]
    for listing in npu_listings:
        res.append({ 'npu': listing["npu"],
        'occur_year': listing["occur_year"],
        'occur_count': listing["occur_count"]})
    return jsonify(res=res)
@app.route("/catAPI", methods=["GET"])
def catAPI():
    # print(cat_listings[0])
    res=[]
    for listing in cat_listings:
        # del listing['_id']
        res.append({ 'npu': listing["npu"],
        'crime_type': listing["crime_type"],
        'occur_year': listing["occur_year"],
        'occur_month':listing["occur_month"],
        'occur_count': listing["occur_count"]})
    return jsonify(res=res)
@app.route("/data", methods=["GET"])
def data():
    res=[]
    for listing in data_listings:
        # del listing['_id']
        res.append({'index': listing["index"],
        'offense_id' : listing["offense_id"],
        'rpt_date' : listing["rpt_date"],
        'beat' : listing["beat"],
        'location' : listing["location"],
        'UC2_Literal' : listing["UC2_Literal"],
        'neighborhood' : listing["neighborhood"],
        'npu' : listing["npu"],
        'lat' : listing["lat"],
        'long' : listing["long"],
        'occur_year' : listing["occur_year"],
        'occur_month' : listing["occur_month"]})
    return jsonify(res=res)
if __name__ == '__main__':
    app.run(debug=True)