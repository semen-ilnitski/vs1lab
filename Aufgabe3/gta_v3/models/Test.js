key = "campus";
var re = new RegExp(key);

var text = "campus____irgendetwas";

if(text.match(re))
{
    console.log("Okay");
}