const express = require("express");
const routes = require("./routes/index");  // you can also write require("./routes"); because it is the index file already

const app = express();
const Port = 5000;

  
// middleware
app.use(function (req,res,next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
})
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

// routes routing middleware
app.use("/",routes);  // directs to   "./routes/index"


app.listen(Port, console.log(`Your app start on port number: ${Port} `));
