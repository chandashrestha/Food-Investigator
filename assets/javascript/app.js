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
  }).then(function (data) {
    $("#results").text(data[data.length - 1].score);
    $("#address").text(data[data.length - 1].site_address + " " + data[data.length - 1].zip);
    console.log(data[data.length - 1].score);
    console.log(data[data.length - 1]);
    console.log(data.length);
    var restAddress = (data[data.length - 1].site_address + " " + data[data.length - 1].zip);
    console.log(restAddress);
    map(restAddress)
  });
};

$(document).on("click", "#submit", function () {
  newRestaurant = $("#input").val().toUpperCase();
  query(newRestaurant);
});

function map (restAddress) {
$.ajax({
  url: "https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyC_uDKyICtoBmf8pI2nW0o64vS9vjWE49k&address=" + restAddress,
  method: "GET",
})
.then(function(response){
  console.log(response.results[0].geometry.location)

  var myLatLng = response.results[0].geometry.location

  console.log(myLatLng)
  
  var map = new google.maps.Map(document.getElementById('map'), {
    center: myLatLng,
    zoom: 12
  });

  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: 'Hello World!'
  });

});
};
// $("#submit").on("click", function(){

// });


//url: "https://www.dallasopendata.com/resource/44uy-sq8p.json?program_identifier=MESO MAYA",

//https://www.dallasopendata.com/resource/44uy-sq8p.json?program_identifier=MESO%20MAYA&$select=max(score)