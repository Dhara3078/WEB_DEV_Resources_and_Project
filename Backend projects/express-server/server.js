const express = require("express");
const app = express();

//here '/' is for home route of your server
app.get("/", function(request, response){

    // console.log(request);
    response.send("Hello"); //you can pass html also (like "<h1>Hello</h1>")
});

app.get("/contact", function(req, res){

    
    res.send("Contact me at: dhara732002@gmail.com");
});

app.get("/about", function(req, res){

    
    res.send("<h1>Dhara Solanki</h1><hr><h3>3rd year student of computer engineering at Vishwakarma Government Engineering College</h3><br><hr><h2>Skills:</h2><ul><li>DSA</li><li>C</li><li>C++</li><li>Web development</li></ul>");
});

app.get("/hobby", function(req, res){

    
    res.send("<h1>Hobbies:</h1><hr><ol><li>Drawing</li><li>Reading Books</li><li>kpop music</li></ol>");
});
app.listen(3000, function(){
    console.log("Sever started on port 3000");
});






