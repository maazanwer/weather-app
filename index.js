const express = require('express');
const https = require('https');
const app = express();
const bodyParser = require('body-parser');
app.use(express.urlencoded({extended: true}));

app.listen(3000, function() {
  console.log("Congratulations... We are in")
})
app.get("/", function(req, res){
  res.sendFile(__dirname +  "/index.html")
})

app.post("/", function(req,res){
  var cityName = req.body.input


  const url = 'https://api.openweathermap.org/data/2.5/weather?q=' +cityName +'&units=metric&APPID=712d2983b8435eb7ab7373badb35f9f6'

  https.get(url, function(response) {
    console.log(response.statusCode)
    response.on("data", function(data) {
      var weatherData = JSON.parse(data);

      var temp = weatherData.main.temp
      var sky = weatherData.weather[0].description
      var icon = weatherData.weather[0].icon
      var imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
      var city = weatherData.name
      console.log(city)


      res.write("<h1>The temperature in "+ city  + " is " + temp + " Degree Celcius</h1>")
      res.write("<h2>The Weather Description is  " + sky + " in " + city+  " </h2>"); res.write("<img src =" + imageURL + ">");
      res.send()
    })
  })
})
