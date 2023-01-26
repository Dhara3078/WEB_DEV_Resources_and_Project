const mongoose = require('mongoose');
const User = require('./User')

mongoose.connect("mongodb://localhost/fruitsDB", 
   () => {
    console.log("connected");
   },
    e => console.error(e)
);

const fruitSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please add name entry"]
        },
        rating: {
            type: Number,
            min: 1,
            max: 10
        },
        review: String
    }
);

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit({
    name: "Mango",
    rating: 9,
    review: "Great"
});

// fruit.save();




//read operation
Fruit.find(function(err, fruits){
    if(err){
        console.log(err);
    }else{

        fruits.forEach(function(fruit){
            console.log(fruit.name);
        });
    }
});

//update operation
// Fruit.updateOne({_id: "62dbae21d9671861538aa206"}, {name: "Peach"}, function(err){
//     if(err){
//         console.log(err);
//     }else{
//         console.log("Upadated!");
//     }
// });

//delete operation
Fruit.deleteOne({name: "Peach"}, function(err){
    if(err){
        console.log(err);
    }else{
        console.log("Deleted");
    }
});



// relation between schemas

const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favouriteFruite: fruitSchema
});

const Person = mongoose.model("Person", personSchema);

const kiwi = new Fruit({
    name: "Kiwi",
    rating: 8,
    review: "Good"
});

kiwi.save();
const person = new Person({
    name: "Mahi",
    age: 11,
    favouriteFruite: kiwi
});

person.save();


// console.log(person);



// const orange = new Fruit({
//     name: "orange",
//     rating: 8,
//     review: "Good"
// });

// const banana = new Fruit({
//     name: "Banana",
//     rating: 8,
//     review: "Good"
// });

// Fruit.insertMany([kiwi,orange,banana], function(err){
//     if(err){
//         console.log(err);
//     }else{
//         console.log("Success");
//     }
// });













// run()
// async function run() {
//     const user = new User({
//         name: "Dhara",
//         age: 20
//     })
//     await user.save()
//     console.log(user);
// }

// const user = new User({
//     name: "Dhara",
//     age: 20
// })

// const user.save().then(() => console.log("user saved"))















