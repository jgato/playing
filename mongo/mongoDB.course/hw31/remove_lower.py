"""
 Extract the lower score of type homework from a collection in mongodb
 The documents looks like to that:

{
	"_id" : 0,
	"name" : "aimee Zank",
	"scores" : [
		{
			"type" : "exam",
			"score" : 1.463179736705023
		},
		{
			"type" : "quiz",
			"score" : 11.78273309957772
		},
		{
			"type" : "homework",
			"score" : 35.8740349954354
		}
	]
}
 @Author: Jose Gato Luis
"""

import pymongo

connection_string = "mongodb://localhost"

connection = pymongo.Connection(connection_string, safe=True)

db = connection.school
students = db.students


def lowest (scores):
    note = 100
    l_score = {}
    for score in scores:
         if (score["type"] == "homework") and (score["score"] < note):
              note = score["score"]
              l_score = score

    return l_score

def remove_from_doc ( doc, lowest_score):
    pass

c_students = students.find()

for student in c_students:
     
     scores = student["scores"]
     #print scores
     lowest_score = lowest(scores)
     # The "key" is to return the complete dict containing the lowest score
     # now two approaches 
     # pure python style, remove the dict from the array of scores
     # and then update the document into mongo with the new scores array
     scores.remove(lowest_score)
     students.update( { "_id" : student["_id"]} , { "scores" : scores })
     
     # montodb style, directly update the document pulling the lowest dict
     #students.update( { "_id" : student["_id"]} , { "$pull" : {"scores" : lowest_score }} )

     # Dont know which one is the better approach in terms of performance
