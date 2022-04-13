from flask import Flask, render_template, redirect,jsonify
from flask_pymongo import PyMongo
import pymongo
from config import password
import requests
import json

app = Flask(__name__)
url = "https://data.mongodb-api.com/app/data-yvusg/endpoint/data/beta/action/find"

def api_listing(collection="npu",url=url,api_key='bvPF5IDCISoLArd9AGQSJW0Rc134wES2TfpFI7FR8SJK6oDWdfN8f4lUHRAVQWqU'):
    payload = json.dumps({"collection":collection ,"database": "crime_db_4","dataSource": "Cluster0",})
    headers = {'Content-Type': 'application/json','Access-Control-Request-Headers': '*','api-key': api_key}
    response = requests.request("POST", url, headers=headers, data=payload)
    return (response.json()["documents"])

npu_listings = api_listing(collection="npu")
cat_listings=api_listing(collection="cat")
data_listings=api_listing(collection="crime_info")
cat_neighborhood_listings=api_listing(collection="cat_neighborhood")
year_neighborhood_listings=api_listing(collection="year_neighborhood")

#for listing in listings:
    
    #del listing['_id']
    #print(listing)


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
