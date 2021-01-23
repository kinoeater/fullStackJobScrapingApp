const express = require("express");
const JobList1 = require("../models/jobList1.model");
const importedData = require("../data.json");
const scrapers = require('./scrapers');


const searchJob = async(req, res, next) => {
   
  a= req.body.position;
  b = req.body.location;
//console.log(a,b);
  const jobDataResponse = await scrapers.scrapeJobs(a,b);
  console.log('Helooooo ////////////////////////////////////////////////////'+jobDataResponse)
  console.log(importedData)
  res.send(importedData);
};



module.exports = {
  searchJob,

};
