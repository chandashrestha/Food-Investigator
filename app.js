//https://www.dallasopendata.com/resource/44uy-sq8p.json

//API key: cZCIb3I7r2cKcWJjDtVnJNGEg


function query (restaurant) {
queryRestaurant = restaurant;
var queryURL = "https://www.dallasopendata.com/resource/44uy-sq8p.json?program_identifier=" + queryRestaurant + "&$order=insp_date";
// the &$order=insp_date is putting the objects within the results array in order by data of inspection
$.ajax({
    url: queryURL,
    type: "GET",
    data: {
      "$limit" : 100,
      "$$app_token" : "cZCIb3I7r2cKcWJjDtVnJNGEg"
    }
}).done(function(data) {
  $("#score").text(data[data.length-1].score);
  $("#address").text(data[data.length-1].site_address);
  console.log(data[data.length-1].score);
  console.log(data[data.length-1]);
  console.log(data.length)
});
};

$(document).on("click", "#submit", function(){
    newRestaurant = $("#input").val();
    query(newRestaurant);
});

// $("#submit").on("click", function(){
    
// });


//url: "https://www.dallasopendata.com/resource/44uy-sq8p.json?program_identifier=MESO MAYA",

//https://www.dallasopendata.com/resource/44uy-sq8p.json?program_identifier=MESO%20MAYA&$select=max(score)