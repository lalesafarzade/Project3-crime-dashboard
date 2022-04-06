from flask import Flask, render_template, redirect,jsonify
from flask_pymongo import PyMongo
import pymongo

app = Flask(__name__)

# Use flask_pymongo to set up mongo connection
#app.config["MONGO_URI"] = "mongodb://localhost:27017/tset"
#mongo = PyMongo(app)
conn = 'mongodb://localhost:27017'

# Pass connection to the pymongo instance.
client = pymongo.MongoClient(conn)
db = client.crime_db
npu_listings = db.npu.find()
cat_listings=db.cat.find()
data_listings=db.crime_info.find()

#for listing in listings:
    
    #del listing['_id']
    #print(listing)


@app.route("/")
def home():
     return render_template("index.html")

@app.route("/choropleth")
def mapping():
     return render_template("choropleth.html")

@app.route("/leafletmap")
def leaflet():
     return render_template("map.html")

@app.route("/dashboard")
def dash():
     return render_template("dashboard.html")





@app.route("/MapAPI")
def data_map():
    res=[]
    for listing in npu_listings:
        del listing['_id']
        res.append(listing)
    return jsonify(res)

@app.route("/catAPI")
def data_cat():
    res=[]
    for listing in cat_listings:
        del listing['_id']
        res.append(listing)
    return jsonify(res)

@app.route("/data")
def data_total():
    res=[]
    for listing in data_listings:
        del listing['_id']
        res.append(listing)
    return jsonify(res)



if __name__ == '__main__':
    app.run(debug=True)
