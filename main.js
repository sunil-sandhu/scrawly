const interface = require("./api/interface");
const system = require("./api/system");

(async () => {
  await interface.init();
  await interface.visitPage("https://sunilsandhu.com");
  let links = await interface.querySelectorAllAttributes("a", "href");
  console.log(links);
  await system.saveFile(links);
})();
