const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req,res){
    
    const querry = req.body.cityName;
    const apiKey = process.env.API_KEY;
    const unit = 'metric';
    const url = 'https://api.openweathermap.org/data/2.5/weather?q='+ querry +'0&appid=' + apiKey + '&units=' + unit;
    https.get(url, function(response){
        console.log(response.statusCode);

        response.on('data', function(data){
           // console.log(data); //it will print data in hexadecimal form
            //to convert it in js object 
            const weatherData = JSON.parse(data);
            console.log(weatherData);
            // console.log(weatherData);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const iconUrl = 'http://openweathermap.org/img/wn/' + icon + '@2x.png';
            //remember we can only have one send method
            // res.send('<h1>The temparature in London is ' + temp + " degrees celcius.</h1><br><h4>The weather in London is " + description + " today.</h4>")

            //but can have multiple writes
            res.write(`<h1>The temparature in ${querry} is ` + temp + " degrees kelvin.</h1>");
            res.write(`<h4>The weather in ${querry} is` + description + " today.</h4>");
            res.write('<img src=' + iconUrl + '>');
            res.send();
        })
    });
})

app.listen(3000, function(){
    console.log("server is runnning on port 3000");
});