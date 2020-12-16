var config = {};
config.boiler = {};
config.twitter = {};
config.mongo = {};
config.web = {};

//config.default_stuff =  ['red','green','blue','apple','yellow','orange','politics'];
// config.twitter.user_name = process.env.TWITTER_USER || 'username';
// config.twitter.password=  process.env.TWITTER_PASSWORD || 'password';
config.mongo.uri = process.env.DUOSTACK_DB_MONGO || "mongodb://";
config.mongo.host = "localhost";
config.mongo.port = 27017;
config.mongo.dbName = "BoilerDatabase";

config.web.port = process.env.WEB_PORT || 9000;

config.boiler.pin = 4;

export default config;
