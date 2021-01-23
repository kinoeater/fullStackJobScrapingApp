const puppeteer = require('puppeteer');

(async () => {
  
  const browser = await puppeteer.launch({
    headless: false
  });
  const page = await browser.newPage();
  
  await page.goto('https://www.indeed.com/q-Software-Development-l-Berlin-jobs.html', {"waitUntil" : "networkidle2"});
   
  await page.waitForSelector('jobsearch-SerpJobCard-footer')
let element = await page.$('jobtitle')
let value = await page.evaluate(el => el.textContent, element.innerText)
console.log(value)

})();