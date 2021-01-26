const puppeteer = require("puppeteer");
const scraper = require("./scraper");

const searchJob = async (req, res) => {
  let position = req.body.position;
  let location = req.body.location;
  position = position.trim().replace(/\s/g, "+");
  location = location.trim().replace(/\s/g, "+");

  console.log(position, location);
  

const jobresults = await scraper.indeed(position,location);


  res.send(await jobresults);
};
module.exports = {
  searchJob,
};