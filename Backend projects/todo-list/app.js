const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");
const mongoose = require("mongoose");
const Date = require(__dirname + "/date.js");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

const dotenv = require("dotenv");
dotenv.config();

mongoose.connect(process.env.MongoDB_URL, {
    useNewUrlParser: true
    // useCreateIndex: true,
    // useUnifiedTopology: true,
    // useFindAndModify: false
}).then(() => {
    console.log("Connected to the db");
}).catch((err) => {
    console.log(err);
});

const taskSchema = {
    name: String
};

const Task = mongoose.model("Task", taskSchema);

const task1 = new Task({
    name: "Welcome to your to do list"
});

const task2 = new Task({
    name: "Hit the + button to add a new task"
});

const task3 = new Task({
    name: "<-- Hit this to delete a task."
});

const defaultTasks = [task1, task2, task3];

const listSchema = {
    name: String,
    tasks: [taskSchema]
};

const List = mongoose.model("List", listSchema);

app.get("/", function(req,res){

    Task.find({}, function(err, foundTasks){
        if(err){
            console.log(err);
        }else{
            // console.log(foundTasks);
            if(foundTasks.length === 0){
                Task.insertMany(defaultTasks, function(err){
                    if(err){
                        console.log(err);
                    }else{
                        console.log("Added");
                    }
                });

            }
            res.render("list", {ListTitle: "Today", taskList: foundTasks});
        }
    });
    
});

app.post("/customListName", function(req,res){
    const customListName = bodyParser.customListName;

    res.redirect("/"+customListName);
})

app.get("/:customListName", function(req,res){
    const customListName = _.capitalize(req.params.customListName);

    List.findOne({name: customListName}, function(err, foundList){
        if(!err){
            if(!foundList){
                const list = new List({
                    name: customListName,
                    tasks: defaultTasks
                });
                list.save();
                res.redirect("/"+customListName);
            }else{
            res.render("list", {ListTitle: foundList.name, taskList: foundList.tasks});
            }
        }
    })
 
});

app.post("/", function(req,res){
    const taskName = req.body.newTask;
    const listName = req.body.list;
    const task = new Task({
        name: taskName
    });

    if(listName === "Today"){
        task.save();
        res.redirect("/");
    }else{
        List.findOne({name: listName}, function(err, foundList){
            if(!err){
                foundList.tasks.push(task);
                foundList.save();
                res.redirect("/"+listName);
            }
        })
    }
    
  
});

app.post("/delete", function(req,res){
    const checkedTaskId = req.body.checkbox;
    const listName = req.body.listName;

    if(listName === 'Today'){
        Task.findByIdAndRemove(checkedTaskId, function(err){
            if(!err){
                console.log("Deleted task");
                res.redirect("/");
            }
        });
    }else{
        List.findOneAndUpdate({name: listName},{$pull: {tasks: {_id: checkedTaskId}}}, function(err, foundList){
            if(!err){
                res.redirect("/"+listName);

            }
        });
    }
 
});


app.get("/about", function(req,res){
    res.render("about");
});
app.listen(3000, function(){
    console.log("Server is running on port 3000");
});






















