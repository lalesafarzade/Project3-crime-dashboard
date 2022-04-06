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


@app.route("/", methods=["GET"])
def home():
     return render_template("index.html")

@app.route("/mapping", methods=["GET"])
def mapping():
     return render_template("choropleth.html")

@app.route("/leaflet", methods=["GET"])
def leaflet():
     return render_template("map.html")

@app.route("/dash", methods=["GET"])
def dash():
     return render_template("dashboard.html")





@app.route("/MapAPI", methods=["GET"])
def MapAPI():
    res=[]
    for listing in npu_listings:
        del listing['_id']
        res.append(listing)
    return jsonify(res)

@app.route("/catAPI", methods=["GET"])
def catAPI():
    res=[]
    for listing in cat_listings:
        del listing['_id']
        res.append(listing)
    return jsonify(res)

@app.route("/data", methods=["GET"])
def data():
    res=[]
    for listing in data_listings:
        del listing['_id']
        res.append(listing)
    return jsonify(res)



if __name__ == '__main__':
    app.run(debug=True)
