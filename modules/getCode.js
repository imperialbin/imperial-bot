const Users = require("../models/User");
const Imperial = require("imperial-node").Imperial;

// Utilities
const throwError = require("../utils/throwError");

module.exports = (msg) => {
  Users.findOne({ userId: msg.author.id }, (err, user) => {
    if (err)
      return throwError(
        msg,
        "An internal server error occurred! Please contact an admin!"
      );
    if (user) {
      const api = new Imperial(user.apiToken);
      const documentId = msg.content.split(" ")[2];
      api
        .getDocument(documentId)
        .then((document) => {
          if (document) {
            msg.channel
              .send(`\`\`\`${document.content}\`\`\``)
              .catch(() =>
                throwError(
                  msg,
                  `Code is too long! Here is a URL, https://imperialb.in/p/${documentId}`
                )
              );
          } else {
            throwError(
              msg,
              "Sorry, but we couldn't find the paste you were looking for!"
            );
          }
        })
        .catch(() =>
          throwError(msg, "There was an error getting your document!")
        );
    } else {
      throwError(
        msg,
        "Please link your IMPERIAL account by doing `!imp api` before trying to get code!"
      );
    }
  });
};
