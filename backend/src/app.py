from flask import Flask, request, jsonify
from flask_pymongo import ObjectId
from flask_cors import CORS, cross_origin
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)

conn = "mongodb://localhost:27017"
client = MongoClient(conn, serverSelectionTimeoutMS=5000)   # set a 5-second connection timeout
try:
    db = client.RESTAPIDB
    users = db.users
    print("Connect with the server.", client.server_info)
except Exception:
    print("Unable to connect to the server.")

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