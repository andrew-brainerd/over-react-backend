const mongo = require('mongodb').MongoClient;
const chalk = require('chalk');
const log = console.log;

const dbUri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;

var db;

mongo.connect(dbUri, { useNewUrlParser: true }, (err, client) => {
    if (err) { log(chalk.red(err)); return; }
    db = client.db(dbName);
});

exports.addSearch = profile => {
    const collection = db.collection('search');
    const profileSearched = { name: profile };

    collection.insertOne(profileSearched, (err, result) => {
        if (!err) log(chalk.blue(`Added ${profileSearched.name} to DB`));
        else log(chalk.red(err));
    });
}
