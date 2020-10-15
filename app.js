const express = require("express");
const app = express();
const bodyparser=require("body-parser"); //required so that we can access the requested data

app.get("/",function(req,res){
  res.sendFile(__dirname + "/index.html"); //when user requests the main home page directed to the html that consists of form
});
//to post the data output according to the city that user has entered
app.post("/",function(req,res){
 const q=req.body.cityname; //using the cityname that user asked for

//Postman is not working this URL is to be used in this way but maybe its not working
 const appkey="06bccece67a8eafc948377364b859bc1";
 const unit="metric";
 const url="https://api.openweathermap.org/data/2.5/weather?q="+ query +"&units="+ unit+"&appid="+ appkey; //main Url to get the weather from open weather
 https.get(url,function(response){ //to fetch the data request is made
  console.log(response.statuscode); // statuscode will tell us that the requests is transferred
  response.on("data",function(data){ //data response from open weather site
    const weatherdata=JSON.parse(data);
    const temp= weatherdata.main.temp;// get the particular temp of cityname
    const weatherdescription=weatherdata.weather[0].description; // paticular description
    const icon=weatherdata.weather[0].icon;//particular icon
    const imageurl="http://openweathermap.org/img/wn/"+ icon +"@2x.png";
    res.write("<h2>The weather is currently"+weatherdescription+".</h2>");
    res.write("<h1>The temperature in "+query+" is"+temp+"degree celsius.</h1>");
    res.write("<img src="+imageurl+">"); // finally send back to the user the main output
    res.send();
  });
});
});
//res.send("Server is connected");
app.listen(3000,function(){
  console.log("Server is running on port 3000");
});
