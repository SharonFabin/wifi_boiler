import config from "./index.js";
import mongo from "mongodb";
const { MongoClient } = mongo;
const url = `${config.mongo.uri}${config.mongo.host}:${config.mongo.port}`;
const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
let db;
if (!client.isConnected || db == null) {
    client.connect((err) => {
        if (err != null) console.log(err);
        console.log("Connected successfully to server");
        db = client.db(config.mongo.dbName);
    });
}
export { db };
