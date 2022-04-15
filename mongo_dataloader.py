import pandas as pd
from pymongo import MongoClient 


client = MongoClient() 



def data_loading(csv,db):
    df=pd.read_csv(csv)
    dict_=df.to_dict(orient = 'records')
    #db.collection.drop()
    db.collection.insert_many(dict_)

