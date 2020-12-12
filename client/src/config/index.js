var config = {};
config.boiler = {};
config.twitter = {};
config.redis = {};
config.web = {};

config.web.client_port = process.env.WEB_PORT || 3000;
config.web.server_port = 9000;
config.web.ip = "192.168.68.100";
export default config;
