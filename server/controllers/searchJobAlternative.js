const puppeteer = require("puppeteer");

const searchJob = async (req, res) => {
  let position = req.body.position;
  let location = req.body.location;
  position = position.trim().replace(/\s/g, "+");
  location = location.trim().replace(/\s/g, "+");

  console.log(position, location);
  let url = `https://de.indeed.com/jobs?q=${position}&l=${location}`;

  const browser = await puppeteer.launch({
    headless: true,
  });
  const page = await browser.newPage();
  await page.goto(url);

  const jobResuts = await page.evaluate(() => {
    const jobList = [];
    const locationList = [];
    const companyList = [];
    const summaryList = [];
    const postDateList = [];
    const readMoreList = [];

    const JobsPerPage = document.querySelectorAll("h2.title").length;
    for (i = 0; i < JobsPerPage; i++) {
      jobList.push(document.querySelectorAll("h2.title")[i].innerText);
      locationList.push(document.querySelectorAll(".location")[i].innerText);
      companyList.push(
        document.querySelectorAll("span.company")[i].innerText.trim()
      );
      summaryList.push(
        document.querySelectorAll("div.summary")[i].innerText.trim()
      );
      postDateList.push(
        document.querySelectorAll("span.date")[i].innerText.trim()
      );
     
      readMoreList.push(
        "https://de.indeed.com"+document.querySelectorAll(".jobtitle")[i].getAttribute("href").trim()
        );
      
    }

    var data = [];

    for (var x = 0; x < jobList.length; x++) {
      var element = {
        job: jobList[x],
        location: locationList[x],
        company: companyList[x],
        postDate: postDateList[x],
        readMore: readMoreList[x],
        summary: summaryList[x],
      };

      data.push(element);
    }
    
    return data;
  });

  await browser.close();

  res.send(await jobResuts);
};
module.exports = {
  searchJob,
};