const puppeteer = require("puppeteer");
const importedData = require("../data.json");

async function scrapeJobs(position, location) {
  var position = position.replace(" ", "+").trim();

  var location = location.replace(" ", "+").trim();
  let url = `https://de.indeed.com/jobs?q=${position}&l=${location}`;
  console.log('Url is: '+ url );

  
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  page.$$eval( ('h2.title'))    

   //  const jobTitle = await page.$('h2.title').getProperty('textContent');
  // const jobUrl =
  //   "https://de.indeed.com/" + (await jobTitle.getProperty("href"));
  // const location = await jobTitle.getProperty("textContent");

  const jobTitles = await page.evaluate(() => {
    // Serializing the outputs otherwise it will be undefined
    return [
      JSON.stringify(performance.getEntriesByType('mark')),
      JSON.stringify(performance.getEntriesByType('measure')),
      JSON.stringify(window.TailorPipe.getEntries())
    ];
  });
  
  return {jobTitle};
}

module.exports = {
  scrapeJobs,
};
