from flask import Flask, request, jsonify
from flask_pymongo import ObjectId
from flask_cors import CORS, cross_origin
from pymongo import MongoClient
from vars import USERNAME, PASSWORD

app = Flask(__name__)

client = MongoClient(f'mongodb://{USERNAME}:{PASSWORD}@crudreactdb-shard-00-00.qjtmr.mongodb.net:27017,crudreactdb-shard-00-01.qjtmr.mongodb.net:27017,crudreactdb-shard-00-02.qjtmr.mongodb.net:27017/CrudReactDB?ssl=true&replicaSet=atlas-332f90-shard-0&authSource=admin&retryWrites=true&w=majority')
app.config['MONGODB_SETTINGS'] = {
    'db': client,
    'host': 'localhost',
    'port': 27017
}
CORS(app)
db = client.CrudReactDB
users = db.users


@app.route('/users', methods=['POST'])
def createUser():
    print(request.json)
    users.insert_one({
        'name': request.json['name'],
        'email': request.json['email'],
        'password': request.json['password']
    })

    id = str(users.find_one({'name':request.json['name']})['_id'])
    return jsonify(id)

@app.route('/users', methods=['GET'])
def getUsers():
    user = []
    for doc in users.find():
        user.append({
            '_id': str(ObjectId(doc['_id'])),
            'name':doc['name'],
            'email':doc['email'],
            'password': doc['password']
        })
    return jsonify(user)

@app.route('/users/<id>', methods=['GET'])
def getUser(id):
    user = users.find_one({'_id': ObjectId(id)})
    return jsonify({
        '_id' : str(ObjectId(id)),
        'name': user['name'],
        'email':user['email'],
        'password': user['password']
    })
    
@app.route('/users/<id>', methods=['DELETE'])
def deleteUser(id):
    users.delete_one({'_id': ObjectId(id)})
    return jsonify('User deleted')

@app.route('/users/<id>', methods=['PUT'])
def updateUser(id):
    users.replace_one({'_id': ObjectId(id)}, 
    
        {'name': request.json['name'],
        'email': request.json['email'],
        'password': request.json['password']
        })

    return 'User updated'

if __name__ == "__main__":
    app.run(debug=True)