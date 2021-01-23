const express = require("express");
const JobList1 = require("../models/jobList1.model");
const importedData = require("../data.json");
const scrapers = require('./scrapers');
const puppeteer = require("puppeteer");


const searchJob = async(req, res, next) => {
   
  a= req.body.position;
  b = req.body.location;
  console.log(a,b);

  // var position = position.replace(" ", "+").trim();

  // var location = location.replace(" ", "+").trim();
 // console.log(position, location);
  let url = `https://de.indeed.com/jobs?q=${a}&l=${b}`;

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
        document.querySelectorAll(".jobtitle")[i].getAttribute("href").trim()
      );
    }

    var  data = [];

    for (var x = 0; x < jobList.length; x++) {
      var element = {
        job: jobList[x],
        location: locationList[x],
        company: companyList[x],
        postDate: postDateList[x],
        readeMore: readMoreList[x],
        summary: summaryList[x],
      };

      data.push(element);
    }
return data;
    
  });

 // console.log(data);
  // console.log(  importedData);
  await browser.close();


  res.send(await jobResuts);
};


async function scrapeJobs(position, location) {
  var position = position.replace(" ", "+").trim();

  var location = location.replace(" ", "+").trim();
 // console.log(position, location);
  let url = `https://de.indeed.com/jobs?q=${position}&l=${location}`;

  const browser = await puppeteer.launch({
    headless: true,
  });
  const page = await browser.newPage();
  await page.goto(url);

  const jobScrapResults = await page.evaluate(() => {
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
        document.querySelectorAll(".jobtitle")[i].getAttribute("href").trim()
      );
    }

    const data = [];

    for (var x = 0; x < jobList.length; x++) {
      var element = {
        job: jobList[x],
        location: locationList[x],
        company: companyList[x],
        postDate: postDateList[x],
        readeMore: readMoreList[x],
        summary: summaryList[x],
      };

      data.push(element);
    }

    return data;
  });

  //console.log(JjobScrapResults);
  // console.log(  importedData);
  await browser.close();
}



module.exports = {
  searchJob,

};
