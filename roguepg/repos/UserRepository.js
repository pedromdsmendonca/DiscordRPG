const mongo = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';

let coll = {}

mongo.connect(url, { useNewUrlParser: true })
    .then(client => {
        coll = client.db('RoguePG').collection('Users');
        console.log('Connected to User Collection with: ');
        coll.find().toArray().then(items => {
            console.log(items.length + ' users');
        });
    })
    .catch(err =>{
        console.log(err);
    });

class UserRepository {
    addUser(user, character){
        let u = {
            name: user.name,
            discordId: user.discordId,
            character: character
        };

        coll.insertOne(u);
    }

    userExistWithId(id){
        return coll.countDocuments({discordId: id}).then( count => {
            return count > 0;
        });
    }

    getUser(id){
        return coll.findOne({discordId: id});
    }

    update(user){
        return coll.updateOne({discordId: user.discordId}, {'$set': {character: user.character}});
    }
}

module.exports = UserRepository;