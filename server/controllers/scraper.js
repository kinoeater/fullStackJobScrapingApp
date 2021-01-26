const puppeteer = require("puppeteer");

async function indeed() {
  //const browser = await puppeteer.launch({ headless: false, , slowMo: 100, devtools: true });
  const browser = await puppeteer.launch({
    headless: false,
   // slowMo: 100,
    //devtools: true,
    args: [
      '--incognito', 
    ]
  }); // slow down by 250ms
  const page = await browser.newPage();
  await page.goto("https://de.indeed.com/jobs?q=python+developer&l=Hamburg", {
    waitUntil: "networkidle2",
  });

  let next = 1;
  let pageNo = 0;

while (next > 0 ) {
  pageNo= pageNo +1;
console.log(pageNo+1);
  // check cookies
 
   await page.evaluate( function checkCookies() {   
    const q = document.querySelectorAll('#onetrust-accept-btn-handler').length;
    if(q>0) {
     document.querySelector('#onetrust-accept-btn-handler').click();
    }})


    // check pop up 
    await page.keyboard.press("Enter");

  const jobs = await page.evaluate( () => 
  Array.from(document.querySelectorAll("div.jobsearch-SerpJobCard")).map(card => ({
    jobName: card.querySelector('h2.title').innerText,
    company: card.querySelector('span.company').innerText
  })) )

  const next = await page.evaluate(() => 
  
  document.querySelectorAll("*[aria-label='Weiter']").length
  )
  
  if(next>0) {

let newUrl = await page.evaluate( () => document.querySelector("*[aria-label='Weiter']").getAttribute('href') );
newUrl = 'https://de.indeed.com/'+newUrl

await page.goto(newUrl, {
  waitUntil: "networkidle2",
});


      }
if(pageNo>5) {
  break;
}
  
}


console.log(jobs);
console.log(next);
//  await browser.close();

}




indeed();