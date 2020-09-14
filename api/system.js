const fs = require("fs");

const system = {
  async saveFile(data, filePath = Date.now(), fileType = "json") {
    fs.writeFile(`${filePath}.${fileType}`, JSON.stringify(data), function (err) {
      if (err) return console.log(err);
    });
  },
};

module.exports = system;
