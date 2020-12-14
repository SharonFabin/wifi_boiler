var config = {};
config.boiler = {};
config.twitter = {};
config.redis = {};
config.web = {};

config.web.client_port = process.env.WEB_PORT || 3000;
config.web.server_port = 9000;
config.web.ip = "localhost";
export default config;
