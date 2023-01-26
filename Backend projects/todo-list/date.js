// console.log(module);

module.exports = getDate;

function getDate() {
    var today = new Date();
// var currentDay = today.getDay();
// var day = "";
// if(currentDay === 6 || currentDay === 0){
//     day = "Weekend";

// }else{
//     day = "weekday";
// }

var options = {
    weekday: "long",
    day: "numeric",
    month: "long"
};

var day = today.toLocaleDateString("en-US", options);

    return day;
}

