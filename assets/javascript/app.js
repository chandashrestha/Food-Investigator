//https://www.dallasopendata.com/resource/44uy-sq8p.json

//Dallas API key: cZCIb3I7r2cKcWJjDtVnJNGEg
//Yelp API key: yKDe0xglbZ0FaxN-kTSoi2GJLo5lyRk1n5gthGSoRef_BZ-QdBWAYeuNv4Tpk5Oe5Pf90S8wb2vpP-W64XtXvAWziqarzyQPP_22o2wIkjewt1ZkxU1d1q2s9w-0W3Yx
//Google Maps API: AIzaSyC_uDKyICtoBmf8pI2nW0o64vS9vjWE49k



// This syncs with our Firebase database
var config = {
  apiKey: "AIzaSyBmpXuhRwOwSgByzvBllXTh9U9fPUHxpWo",
  authDomain: "restaurantapi-3b03d.firebaseapp.com",
  databaseURL: "https://restaurantapi-3b03d.firebaseio.com",
  projectId: "restaurantapi-3b03d",
  storageBucket: "",
  messagingSenderId: "468305590353"
};
firebase.initializeApp(config);

// This assigns the firebase database to the database variable
var database = firebase.database();

// This is the function that queries the Dallas Open Data API
function query(restaurant) {
  // queryRestaurant is the variable that will hold the name of the restaurant so that the queryURL can be dynamic as the user searches different restaurants
  queryRestaurant = restaurant;
  var queryURL = "https://www.dallasopendata.com/resource/44uy-sq8p.json?program_identifier=" + queryRestaurant + "&$order=insp_date";
  // the &$order=insp_date is putting the objects within the results array in order by date of inspection. Withouth thsi parameter the data is returned is no specific order and thus you are not guaranteed to get the score from the latest inspection
  $.ajax({
    url: queryURL,
    type: "GET",
    data: {
      "$limit": 100,
      "$$app_token": "cZCIb3I7r2cKcWJjDtVnJNGEg"
    }
  }).then(function (data) {
    // This takes the latest inspection and pulls the score off the object, and enters that score as text in the results div
    $("#results").text(data[data.length - 1].score);
    // This takes the latest inspection and pulls the street address as well as the zip code and enters it as text in the address div
    $("#address").text(data[data.length - 1].site_address + " " + data[data.length - 1].zip);
    // This grabs the name of the restaurant off the object
    $("#name").text(data[data.length - 1].program_identifier);
    // These console.logs allow us to check that we are pulling the correct data
    console.log(data[data.length - 1].score);
    console.log(data[data.length - 1]);
    console.log(data.length);
    // This establishes the variable restAddress and enters the street address information in to the variable. We will use this address later in the Google Map API for dynamic mapping
    var restAddress = (data[data.length - 1].site_address + " " + data[data.length - 1].zip);
    console.log(restAddress);
    // Ths runs the map function, which holds the ajax call to the Google Map API. This function is a "pure function" and the dynamic restAddress is passed through the function
    map(restAddress);

    name = data[data.length - 1].program_identifier;
    results = data[data.length - 1].score
    console.log(name);

    database.ref().push({
      name: name,
      address: restAddress,
      results: results,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
      });

  });
};

database.ref().on("child_added", function(childSnapshot) {

 $("#hos").append(
  "<tr>" +
  "<td>" + childSnapshot.val().name + "</td>" +
  "<td>" + childSnapshot.val().address + "</td>" +
  "<td>" + childSnapshot.val().results + "</td>" +
  "</tr>"
 );
});

// This is an event handler that triggers the query function (calling the Dallas API) when a user clicks Submit button on the page
$(document).on("click", "#submit", function () {
  // This captures the text that was entere in the input box and changes all the text to upper case, as the Dallas API requires upper case submissions
  newRestaurant = $("#input").val().toUpperCase();
  // This calls the query function, which runs the Dallas API 
  query(newRestaurant);
});

// This function calls the Google Map API. restAddress is a variable that contains the address of the most recently searched restaurant
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

//url: "https://www.dallasopendata.com/resource/44uy-sq8p.json?program_identifier=MESO MAYA",

//https://www.dallasopendata.com/resource/44uy-sq8p.json?program_identifier=MESO%20MAYA&$select=max(score)