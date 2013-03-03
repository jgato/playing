mkdir -p data/rs{1,2,3}
mongod --replSet rs1 --logpath data/1.log --dbpath data/rs1 --port 27017 --fork --oplogSize=50 --smallfiles
mongod --replSet rs1 --logpath data/2.log --dbpath data/rs2 --port 27018 --fork --oplogSize=50 --smallfiles
mongod --replSet rs1 --logpath data/3.log --dbpath data/rs3 --port 27019 --fork --oplogSize=50 --smallfiles
