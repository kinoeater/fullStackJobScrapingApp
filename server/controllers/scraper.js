const puppeteer = require("puppeteer");

async function indeed() {
  //const browser = await puppeteer.launch({ headless: false, , slowMo: 100, devtools: true });
  const browser = await puppeteer.launch({ headless: false}); // slow down by 250ms
  const page = await browser.newPage();
  await page.goto("https://de.indeed.com/jobs?q=software+developer&l=Munchen", {
    waitUntil: "networkidle2",
  });

  let next = 1;

while (next > 0 ) {

  // check cookies
  page.waitForTimeout(2000);
   await page.evaluate( function checkCookies() {   
    const q = document.querySelectorAll('#onetrust-accept-btn-handler').length;
    if(q>0) {
     document.querySelector('#onetrust-accept-btn-handler').click();
    }})

    page.waitForTimeout(2000);
    // check pop up 
    await page.keyboard.press("Enter");
//  await page.evaluate( function checkPopUp() {   
//  const p = document.querySelectorAll('.popover-x-button-close').length;
//  if(p>0) {
//   document.querySelector('.popover-x-button-close').click();
//  }})

  const jobs = await page.evaluate( () => 
  Array.from(document.querySelectorAll("div.jobsearch-SerpJobCard")).map(card => ({
    jobName: card.querySelector('h2.title').innerText,
    company: card.querySelector('span.company').innerText
  })) )

  const next = await page.evaluate(() => 
  
  document.querySelectorAll("*[aria-label='Weiter']").length
  )
  
  if(next>0) {
    await page.evaluate(() => 
  
    document.querySelector("*[aria-label='Weiter']").click() )
      }

  
}


console.log(jobs);
console.log(next);
//  await browser.close();

}




indeed();