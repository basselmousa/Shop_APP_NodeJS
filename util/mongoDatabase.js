const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {

    MongoClient.connect('mongodb+srv://bassel:mlD0mm1htbQbW74P@nodejs-shop-app.f915l.mongodb.net/shop-app?retryWrites=true&w=majority',{
        useNewUrlParser: true, useUnifiedTopology: true
    })
        .then(client => {
            console.log('Connected')
            _db = client.db();
            callback(client);
        })
        .catch(err => {
            console.log(err);
            throw err;
        });

};

const getDb = ()=>{
    if (_db){
        return _db;
    }
    throw 'No Database Found';
}

exports.mongoConnect = mongoConnect;

exports.getDb = getDb;
