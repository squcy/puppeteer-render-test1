const puppeteer = require("puppeteer");
require("dotenv").config();

const scrapeLogic = async (res) => {
  const browser = await puppeteer.launch({
    args: [
      "--disable-setuid-sandbox",
      "--no-sandbox",
      "--single-process",
      "--no-zygote",
    ],
    executablePath:
      process.env.NODE_ENV === "production"
        ? process.env.PUPPETEER_EXECUTABLE_PATH
        : puppeteer.executablePath(),
  });
  try {
    const page = await browser.newPage();

    await page.goto("https://api.vevioz.com/api/button/mp3/4xa9Pc-xic0");

    // Set screen size
    await page.setViewport({ width: 1080, height: 1024 });

    // Type into search box
   // await page.type(".search-box__input", "automate beyond recorder");

    // Wait and click on first result
    const searchResultSelector = "div:nth-child(2) > div > div.w-28.p-2.mx-2.my-2.text-center.border.rounded-lg.cursor-pointer.bit64 > div:nth-child(2)";
    await page.waitForSelector(searchResultSelector);
   // await page.click(searchResultSelector);

 //   const searchResultSelector2 = "div > div > div > div > a";
  //  await page.waitForSelector(searchResultSelector2 , {timeout: 120000} );
    //await page.click(searchResultSelector);

    // Locate the full title with a unique string
 //   const textSelector = await page.waitForSelector(
//      "text/Customize and automate"
//    );
   const fullTitle = await searchResultsSelector.evaluate((el) => el.textContent);

    // Print the full title
    const logStatement = `The title of this blog post is ${fullTitle}`;
    console.log(logStatement);
    res.send(logStatement);
  
  } catch (e) {
    console.error(e);
    res.send(`Something went wrong while running Puppeteer: ${e}`);
  } finally {
    await browser.close();
  }
};

module.exports = { scrapeLogic };
