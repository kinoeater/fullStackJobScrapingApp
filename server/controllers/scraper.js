const puppeteer = require("puppeteer");

async function indeed(position,location) {

  let url = `https://de.indeed.com/jobs?q=${position}&l=${location}`;
  console.log(url);
  //const browser = await puppeteer.launch({ headless: false, , slowMo: 100, devtools: true });
  const browser = await puppeteer.launch({
    headless: true,
    // slowMo: 100,
    //devtools: true,
    args: ["--incognito"],
  }); // slow down by 250ms
  const page = await browser.newPage();
  await page.goto(url, {
    waitUntil: "networkidle2",
  });

  let next = 1;
  let pageNo = 0;
  let jobList = [];

  while (next > 0) {
    pageNo = pageNo + 1;
    console.log(pageNo);
    // check cookies

    try {
      await page.evaluate(function checkCookies() {
        const q = document.querySelectorAll("#onetrust-accept-btn-handler")
          .length;
        if (q > 0) {
          document.querySelector("#onetrust-accept-btn-handler").click();
        }
      });
  
    } catch (error) {
      console.log("Cookies accept error: "+error)
    }
try {
    await page.keyboard.press("Enter");
} catch (error) {
    
    console.log("Do you want email error: "+error)
}
    // check pop up
   
/*
    let jobs = await page.evaluate(() =>
      Array.from(document.querySelectorAll("div.jobsearch-SerpJobCard")).map(
        (card) => ({
          job: card.querySelectorAll("h2.title").length>0 ? card.querySelector("h2.title").innerText.trim() : " ",
          location: card.querySelectorAll(".location").length>0 ? card.querySelector(".location").innerText.trim() : " ",
          company: card.querySelectorAll("span.company").length>0 ? card.querySelector("span.company").innerText.trim() : " ",
          postDate: card.querySelectorAll("span.date").length>0 ? card.querySelector("span.date").innerText.trim() : " ",
          readMore: card.querySelectorAll(".jobtitle").length>0 ? card.querySelector(".jobtitle").getAttribute("href").trim() : " ",
          summary: card.querySelectorAll("div.summary").length>0 ? card.querySelector("div.summary").innerText.trim() : " ",

        })
      )
    ); */

    let jobs = await page.evaluate(() =>
    Array.from(document.querySelectorAll("div.jobsearch-SerpJobCard"),    
    (card) => ({
      job: card.querySelectorAll("h2.title").length>0 ? card.querySelector("h2.title").innerText.trim() : " ",
      location: card.querySelectorAll(".location").length>0 ? card.querySelector(".location").innerText.trim() : " ",
      company: card.querySelectorAll("span.company").length>0 ? card.querySelector("span.company").innerText.trim() : " ",
      postDate: card.querySelectorAll("span.date").length>0 ? card.querySelector("span.date").innerText.trim() : " ",
      readMore: card.querySelectorAll(".jobtitle").length>0 ? card.querySelector(".jobtitle").getAttribute("href").trim() : " ",
      summary: card.querySelectorAll("div.summary").length>0 ? card.querySelector("div.summary").innerText.trim() : " ",

    }))
  );


  jobList=jobList.concat(jobs);
 
// check if the next page is present

   next = await page.evaluate(
      () => document.querySelectorAll("*[aria-label='Weiter']").length
    );
// if the next page is present then navigate to next page
    if (next > 0) {
      let newUrl = await page.evaluate(() =>
        document.querySelector("*[aria-label='Weiter']").getAttribute("href")
      );
      newUrl = "https://de.indeed.com/" + newUrl;

      await page.goto(newUrl, {
        waitUntil: "networkidle2",
      });
    }


  }

  await browser.close();
  
  return jobList;
   
}

module.exports = {
    indeed,
  };
