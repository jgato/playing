'''
Created on 22/01/2013

Home work of the free course: https://education.10gen.com/courses/10gen/M101P/2013_Spring/
MongoDB for python developers

The code is licensed under GPLV3 License

@author: Jose Gato
'''


import pymongo
import bottle


db_name = "mongoCourse"

@bottle.route("/")
def index():
    from pymongo import Connection
    
    connection = Connection("localhost", 27017)
    
    db = connection.mongoCourse
    names = db.names

    print names
    
    item = names.find_one()

    print item    
    return "<b>Hello %s </b>" % item["name"]


bottle.run(host='localhost', port=8080)
 
    

