const express = require("express");
const {searchJob} = require("../controllers/searchJob2")


const router = express.Router(); 

router.post("/",searchJob);

module.exports = router;