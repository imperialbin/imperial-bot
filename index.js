const Discord = require("discord.js");
const client = new Discord.Client();
const prefix = "!imp";
const mongoose = require("mongoose");
require("dotenv").config();

// Modules
const postCode = require("./modules/postCode");
const saveMessages = require("./modules/saveMessages");
const getCode = require("./modules/getCode");
const setApiToken = require("./modules/setApiToken");
const help = require("./modules/help");

// Utilities
const throwError = require("./utils/throwError");

client.on("ready", () => {
  client.user.setActivity("!imp help | https://imperialb.in/", {
    type: "PLAYING",
  });
  console.log("READY");
  mongoose.connect(
    process.env.DB_URI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
      if (err) return console.log(err);
      console.log("CONNECTED DATABASE");
    }
  );
});

client.on("message", async (msg) => {
  if (msg.channel.type == "dm" && !msg.author.bot) setApiToken(msg, client);
  if (msg.author.bot) return;
  if (msg.content.indexOf(prefix) !== 0) return;
  const command = msg.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g)
    .shift()
    .toLowerCase();
  switch (true) {
    case command === "help" || command === "h":
      help(msg);
      break;
    case command === "paste" ||
      command === "postcode" ||
      command === "post" ||
      command === "p":
      postCode(msg);
      break;
    case command === "save" ||
      command === "savemessages" ||
      command === "savemessages" ||
      command === "sm":
      saveMessages(msg);
      break;
    case command === "getcode" ||
      command === "get" ||
      command === "code" ||
      command === "g":
      getCode(msg);
      break;
    case command === "setapi" ||
      command === "setapitoken" ||
      command === "api" ||
      command === "setup":
      setApiToken(msg);
      break;
    default:
      throwError(msg, "Unknown command!");
      break;
  }
});

if (process.env.ENVIRONMENT === "DEVELOPMENT") {
  client.login(process.env.BOT_TOKEN_DEV);
  console.log("DEV TOKEN BEING USED!");
} else {
  client.login(process.env.BOT_TOKEN);
  console.log("PROD TOKEN BEING USED!");
}
