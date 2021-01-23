const puppeteer = require('puppeteer');
const importedData = require("./data.json");

(async () => {
  const browser = await puppeteer.launch({
    headless: false
  });
  const page = await browser.newPage();
  await page.goto('https://de.indeed.com/Software-Developer-Jobs-in-Munich');

const jobScrapResults = await page.evaluate(() => {
    
    const jobList = [];
    const locationList = [];
    const companyList = [];
    const summaryList = [];
    const postDateList = [];
    const readMoreList = [];

    const JobsPerPage =document.querySelectorAll('h2.title').length;
    for(i=0;i<JobsPerPage;i++) { 
        
       jobList.push(document.querySelectorAll('h2.title')[i].innerText)
       locationList.push(document.querySelectorAll('.location')[i].innerText)
         companyList.push(document.querySelectorAll('span.company')[i].innerText.trim())
         summaryList.push(document.querySelectorAll('div.summary')[i].innerText.trim())
         postDateList.push(document.querySelectorAll('span.date')[i].innerText.trim())
         readMoreList.push(document.querySelectorAll('.jobtitle')[i].getAttribute('href').trim())
}

const data = [];

for (var x = 0; x < jobList.length; x++) {
    var element = {
                  job: jobList[x],
                  location: locationList[x],
                  company: companyList[x],
                  postDate: postDateList[x],
                readeMore: readMoreList[x],
                  summary: summaryList[x]
    };

    data.push(element);
}

console.log(data)
await browser.close();
  return data;

});

 // console.log(  jobScrapResults);
  // console.log(  importedData);
  await browser.close();
 

})();