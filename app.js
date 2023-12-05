const express = require("express");
const  https = require("https");
const bodyParser = require("body-parser");

const app = express();
// whenever we watn to use new package we have to write this line
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");
        })

        app.post("/",function(req,res){
            console.log(req.body.cityName);
             
            const city = req.body.cityName
            const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=7b7b729a4e2356fecd7929b2ba59db3d&units=metric";
        https.get(url,function(response){
            //res.send("Server is up and running.")
            console.log(response.statusCode); 
            response.on("data",function(data){
                const weatherData = JSON.parse(data);
                const temp = weatherData.main.temp
                const description = weatherData.weather[0].description
                const icon = weatherData.weather[0].icon
                const imgURL = "https://openweathermap.org/img/wn/"+icon+"@2x.png"
                res.write("<p> The weather is currently : " + description + "</p>");
                res.write("<h1>The temprature in "+ city + " is " + temp + " degree Celcius</h1><br>");
                res.write("<img src="+imgURL+">");
                res.send()
                //console.log(icon);
               // console.log(temp);
                const object = {
                    name : "Deepak",
                    food : "Pav bhAji"
                }
                //console.log(JSON.stringify(object));
                //console.log(weatherData);
            });
        });
    });

        







app.listen(3500,function(){
    console.log("Server is running on port 3500.");
})