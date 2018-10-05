//https://www.dallasopendata.com/resource/44uy-sq8p.json

//Dallas API key: cZCIb3I7r2cKcWJjDtVnJNGEg
//Yelp API key: yKDe0xglbZ0FaxN-kTSoi2GJLo5lyRk1n5gthGSoRef_BZ-QdBWAYeuNv4Tpk5Oe5Pf90S8wb2vpP-W64XtXvAWziqarzyQPP_22o2wIkjewt1ZkxU1d1q2s9w-0W3Yx
//Google Maps API: AIzaSyC_uDKyICtoBmf8pI2nW0o64vS9vjWE49k


function query(restaurant) {
  queryRestaurant = restaurant;
  var queryURL = "https://www.dallasopendata.com/resource/44uy-sq8p.json?program_identifier=" + queryRestaurant + "&$order=insp_date";
  // the &$order=insp_date is putting the objects within the results array in order by data of inspection
  $.ajax({
    url: queryURL,
    type: "GET",
    data: {
      "$limit": 100,
      "$$app_token": "cZCIb3I7r2cKcWJjDtVnJNGEg"
    }
  }).done(function (data) {
    $("#results").text(data[data.length - 1].score);
    $("#address").text(data[data.length - 1].site_address);
    console.log(data[data.length - 1].score);
    console.log(data[data.length - 1]);
    console.log(data.length)
  });
};

// function query2 () {
// $.ajax({
//   url: "https://api.yelp.com/v3/businesses/search?term=dodie's&location=75206",
//   type: "GET",
//   headers: {
//     "authorization" : "yKDe0xglbZ0FaxN-kTSoi2GJLo5lyRk1n5gthGSoRef_BZ-QdBWAYeuNv4Tpk5Oe5Pf90S8wb2vpP-W64XtXvAWziqarzyQPP_22o2wIkjewt1ZkxU1d1q2s9w-0W3Yx"
//   }
// }).done(function(data) {
// console.log(data);
// });
// };

// query2();

$(document).on("click", "#submit", function () {
  newRestaurant = $("#input").val().toUpperCase();
  query(newRestaurant);
});

// $("#submit").on("click", function(){

// });


//url: "https://www.dallasopendata.com/resource/44uy-sq8p.json?program_identifier=MESO MAYA",

//https://www.dallasopendata.com/resource/44uy-sq8p.json?program_identifier=MESO%20MAYA&$select=max(score)