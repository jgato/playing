import pymongo

connection_string = "mongodb://localhost"

connection = pymongo.Connection(connection_string, safe=True)
db = connection.albums
images = db.images
albums = db.albums


images_list = images.find( {})




def search(image_id):
     album = albums.find_one({ 'images':image_id}) 
     if album is None:
          return False
     return True

removed = 0
for image in images_list:
     exists = search(image["_id"])
     if not exists:
          removed = removed +1
          print "removing ", image["_id"]
          images.remove({"_id": image["_id"]})

print "removed ", removed


