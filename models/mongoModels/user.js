const getDb = require('../../util/mongoDatabase').getDb;
const mongodb = require('mongodb')

class User {
    name;
    email;
    static COLLECTION_NAME = "users";

    constructor(username, email) {
        this.name = username;
        this.email = email;
    }

    save() {
        const db = getDb();
        return db.collection(User.COLLECTION_NAME).insertOne(this);

    }

    static findById(userId) {
        const db = getDb();
        return db.collection(User.COLLECTION_NAME)
            .findOne({_id: new mongodb.ObjectID(userId)});
    }
}

module.exports = User;
