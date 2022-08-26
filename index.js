const Client = require("./base/Client");
const config = require("./config.json");
require("./base/Prototypes");
require("dotenv/config");

const client = new Client({ config });
client.login(process.env.TOKEN);