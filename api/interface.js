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
        slowMo: 100,
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

  /**
   * Runs querySelector on whatever selector is passed in.
   * Selector should be an input field
   * Then pass value into input field
   * @param {string} selector
   * @param {string} input
   * @return void
   */
  async querySelectorInputAndType(selector, input) {
    try {
      return await this.page.type(selector, input);
    } catch (error) {
      console.log(error);
    }
  },

  /**
   * Runs querySelector on whatever selector is passed in.
   * Selector should be an button
   * Clicks button
   * @param {string} selector
   * @return void
   */
  async querySelectorButtonAndClick(selector) {
    try {
      return await this.page.click(selector);
    } catch (error) {
      console.log(error);
    }
  },

  /**
   * Simple wrapper for Puppeteer evaulate function
   * Visit https://pptr.dev/#?product=Puppeteer&version=v10.1.0&show=api-pageevaluatepagefunction-args for more info
   * @param {string} data
   * @return void
   */
  async evaluatePage(data) {
    try {
      return await this.page.evaluate(data);
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = interface;
