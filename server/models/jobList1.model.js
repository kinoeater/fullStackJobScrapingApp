const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const JobList1 = Schema({
  job: {
    type: String,
  
  },
  location: {
    type: String,
    
  },
  company: {
    type: String,

  },
  summary: {
    type: String,

  },
  readMore: {
    type: String,

  },
  postDate: {
    type: String,

  },
});

module.exports = mongoose.model("JobList1", JobList1);
