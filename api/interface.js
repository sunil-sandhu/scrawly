const puppeteer = require("puppeteer");

const interface = {
  browser: null,
  page: null,
  async init() {
    try {
      this.browser = await puppeteer.launch({
        args: [
          // `--proxy-server=http=${randProxy}`,
          // "--incognito",
        ],
        headless: false,
        // slowMo: 250,
      });
      this.page = await this.browser.newPage();
      await this.page.setViewport({ width: 1279, height: 768 });
    } catch (err) {
      console.log(err);
    }
  },
  async visitPage(url) {
    await this.page.goto(url);
  },

  async close() {
    await this.browser.close();
  },

  /**
   * Runs querySelectorAll on whatever selector is passed in.
   * Then maps over returned values, finds the attribute that was passed in and returns those values as an array.
   * @param {string} selector
   * @param {string} attribute
   * @returns {Array[]}
   */
  async querySelectorAllAttributes(selector, attribute) {
    try {
      return await this.page.$$eval(
        selector,
        (elements, attribute) => {
          return elements.map((element) => element[attribute]);
        },
        attribute
      );
    } catch (error) {
      console.log(error);
    }
  },

  /**
   * Runs querySelector on whatever selector is passed in.
   * Then maps over returned value, finds the attribute that was passed in and returns that value.
   * @param {string} selector
   * @param {string} attribute
   * @returns {Array[]}
   */
  async querySelectorAttribute(selector, attribute) {
    try {
      return await this.page.$eval(
        selector,
        (element, attribute) => {
          return element[attribute];
        },
        attribute
      );
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = interface;
