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
db = client.test
listings = db.npu.find()
#for listing in listings:
    
    #del listing['_id']
    #print(listing)


@app.route("/")
def home():
     return render_template("index.html")

@app.route("/MapAPI")
def data_map():
    res=[]
    for listing in listings:
        del listing['_id']
        res.append(listing)
    return jsonify(res)



if __name__ == '__main__':
    app.run(debug=True)
