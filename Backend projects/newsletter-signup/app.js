const express = require("express");
const bodyParser = require("body-parser");
//const request = require("request");
const https = require("https");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get('/', function(req,res){
    res.sendFile(__dirname + '/signup.html');
});

app.post('/', function(req,res){
    var firstName = req.body.fName;
    var lastName = req.body.lName;
    var email = req.body.email;

    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }

    var jsonData = JSON.stringify(data);

    const url = "";
    const options = {
        method: 'POST',
        auth: "dhara:apikey"
    }
   const request= https.request(url, options, function(response){

        if(response.statusCode === 200){
            res.sendFile(__dirname +"/success.html");
        }else{
            res.sendFile(__dirname + "/failure.html");
        }
        response.on("data", function(data){
            JSON.parse(data);
        })
    })

    request.write(jsonData);
    request.end();


});


//for failure rount

app.post('/failure', function(req,res){
    res.redirect('/');
})



app.listen(process.env.PORT || 3000, function(req,res){
    console.log("Server is running on port 3000");
})






