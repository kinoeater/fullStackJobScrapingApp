const express = require("express");
const {searchJob} = require("../controllers/searchJob")


const router = express.Router(); 

router.post("/",searchJob);

module.exports = router;