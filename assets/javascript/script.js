/*
NOT IN ANY PARTICULAR ORDER 
=============================

- Create function that grabs the results from the API(s)
    - Create function that randomizes the results in the API containing restuarant info.
    - Make an on-click event, that displays the random result when the user hits the "Try Again" button

- Create a function that grabs the results of the zip-code and radius from the geolocation API
    - Figure out a way to get restaurants within a certain radius and display them using the food API

- Use firebase to store user's information and their inputs, store recommended restaurants.

- When the user clicks a certain drop-down, to only display those as part of the randomizer
    - Example: When user hits 'Fast Food' => Only display fast-food restaurants
    - Check for keywords like 'type of cuisine/food in the API Documentation'

--------
Bonus
----------
If we get far enough:
- If user wants to display the menu, to display a link to the menu or a picture. Create options for those also.

*/


var config = {
  apiKey: "AIzaSyDiRTsG36T5bpRpKTUxJ_Ew9Z7srEmAKfA",
  authDomain: "wheretoeat-514d4.firebaseapp.com",
  databaseURL: "https://wheretoeat-514d4.firebaseio.com",
  projectId: "wheretoeat-514d4",
  storageBucket: "wheretoeat-514d4.appspot.com",
  messagingSenderId: "9732935588"
};
firebase.initializeApp(config);

var database = firebase.database();

$("#show-choices").on("click", function (event) {
  event.preventDefault();
  $("#restaurants").empty();
  var userLocation = $("#location").val().trim();
  console.log(userLocation);
  var cuisine = $("#cuisine").val().trim();
  console.log(cuisine);
  var priceRange = $("#price-range").val().trim();
  console.log(priceRange);

  var queryURL = "https://api.foursquare.com/v2/venues/explore?client_id=PXVN42TSZPDRDQX5YLJQXWPRSKQDVDFKB3B2EDHKUKGMGQJO&client_secret=TN4NHHCPCIGXVKI5VWSSR4JKBYO0DJTEDS02BKDBOUVY5KKJ&near="
    + userLocation + "&query=" + cuisine + "&price=" + priceRange + "&limit=10&v=20190311";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);

    var restuarantDetails = response.response.groups[0].items;

    var a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    var n;
    var r = [];
    for (n = 1; n <= 3; ++n) {
      var i = Math.floor(Math.random() * (10 - n));
      r.push(a[i]);
      a[i] = a[10 - n];
    }
    console.log(r);

    var restaurantName1 = restuarantDetails[r[0]].venue.name;
    var restaurantName2 = restuarantDetails[r[1]].venue.name;
    var restaurantName3 = restuarantDetails[r[2]].venue.name;

    var restuarantLoc1 = response.response.groups[0].items[r[0]].venue.location.formattedAddress;
    var restuarantLoc2 = response.response.groups[0].items[r[1]].venue.location.formattedAddress;
    var restuarantLoc3 = response.response.groups[0].items[r[2]].venue.location.formattedAddress;

    var lat1 = restuarantDetails[r[0]].venue.location.lat;
    var lng1 = restuarantDetails[r[0]].venue.location.lng;
    var lat2 = restuarantDetails[r[1]].venue.location.lat;
    var lng2 = restuarantDetails[r[1]].venue.location.lng;
    var lat3 = restuarantDetails[r[2]].venue.location.lat;
    var lng3 = restuarantDetails[r[2]].venue.location.lng;

    console.log(lat1, lng1, lat2, lng2, lat3, lng3);

    var p1 = $("<p>").text(restaurantName1 + " " + restuarantLoc1);
    var p2 = $("<p>").text(restaurantName2 + " " + restuarantLoc2);
    var p3 = $("<p>").text(restaurantName3 + " " + restuarantLoc3);

    $("#restaurants").append(p1);
    $(p1).append(p2);
    $(p2).append(p3);

  });
})

$("#choose-for-me").on("click", function (event) {
  event.preventDefault();
  $("#restaurants").empty();
  var userLocation = $("#location").val().trim();
  console.log(userLocation);
  var cuisine = $("#cuisine").val().trim();
  console.log(cuisine);
  var priceRange = $("#price-range").val().trim();
  console.log(priceRange);

  var queryURL = "https://api.foursquare.com/v2/venues/explore?client_id=PXVN42TSZPDRDQX5YLJQXWPRSKQDVDFKB3B2EDHKUKGMGQJO&client_secret=TN4NHHCPCIGXVKI5VWSSR4JKBYO0DJTEDS02BKDBOUVY5KKJ&near="
    + userLocation + "&query=" + cuisine + "&price=" + priceRange + "&v=20190311";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);

    // console.log(response.response.groups[0]);
    var restuarantDetails = response.response.groups[0].items;

    var numOfResults = response.response.groups[0].items.length;

    var suggestedRestuarantIndex = Math.floor(Math.random() * (numOfResults - 1));
    console.log(suggestedRestuarantIndex);

    var restaurantName = restuarantDetails[suggestedRestuarantIndex].venue.name;

    console.log(restaurantName);

    var restuarantLoc = response.response.groups[0].items[suggestedRestuarantIndex].venue.location.formattedAddress;
    $("#restaurants").text("We suggest: " + restaurantName + "   " + restuarantLoc);
    console.log(response.response.groups[0].items[suggestedRestuarantIndex].venue.location.formattedAddress);
    var lat = restuarantDetails[suggestedRestuarantIndex].venue.location.lat;
    var lng = restuarantDetails[suggestedRestuarantIndex].venue.location.lng;
    console.log(lat, lng);

    var wazeBtn = $("<button>");

    wazeBtn.attr("id", "waze-btn");

    wazeBtn.addClass("btn text-light");

    wazeBtn.text("Take me there with Waze");

    $("#restaurants").append(wazeBtn);

    $("#try-again").show();
    $("#waze-btn").on("click", function (event) {
      event.preventDefault();
      window.location = "https://www.waze.com/ul?ll=" + lat + "%2C" + lng + "&navigate=yes&zoom=17";

      // stores the recommendation in a temp object

    });
    var recommendedation = {
      name: restaurantName,
      location: restuarantLoc,
    };

    // Uploads new recommendation to the database
    database.ref().push(recommendedation);

    console.log(recommendedation.name);
    console.log(recommendedation.location);
    database.ref().on("child_added", function (childSnapshot) {
      console.log(childSnapshot.val());

      // Store everything into a variable.
      var restName = childSnapshot.val().name;
      var restLoc = childSnapshot.val().location[1];
      console.log(restName);
      console.log(restLoc);
      var newRow = $("<tr>").prepend(
        $("<td>").text(restName),
        $("<td>").text(restLoc),
    );

    // Append the new row to the table
    $("#recommendation").append(newRow);

    });
  });

});
$("#try-again").on("click", function (event) {
  event.preventDefault();
  $("#restaurants").empty();
  var userLocation = $("#location").val().trim();
  console.log(userLocation);
  var cuisine = $("#cuisine").val().trim();
  console.log(cuisine);
  var priceRange = $("#price-range").val().trim();
  console.log(priceRange);

  var queryURL = "https://api.foursquare.com/v2/venues/explore?client_id=PXVN42TSZPDRDQX5YLJQXWPRSKQDVDFKB3B2EDHKUKGMGQJO&client_secret=TN4NHHCPCIGXVKI5VWSSR4JKBYO0DJTEDS02BKDBOUVY5KKJ&near="
    + userLocation + "&query=" + cuisine + "&price=" + priceRange + "&v=20190311";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);

    var restuarantDetails = response.response.groups[0].items;

    var numOfResults = response.response.groups[0].items.length;

    var suggestedRestuarantIndex = Math.floor(Math.random() * (numOfResults - 1));
    console.log(suggestedRestuarantIndex);

    var restaurantName = restuarantDetails[suggestedRestuarantIndex].venue.name;
    var restuarantLoc = response.response.groups[0].items[suggestedRestuarantIndex].venue.location.formattedAddress;

    console.log(restaurantName);
    var lat = restuarantDetails[suggestedRestuarantIndex].venue.location.lat;
    var lng = restuarantDetails[suggestedRestuarantIndex].venue.location.lng;
    console.log(lat, lng);
    // var restuarantLoc = response.response.groups[0].items[suggestedRestuarantIndex].venue.location.formattedAddress;

    $("#restaurants").text("We suggest: " + restaurantName + "   " + restuarantLoc);
    // $("#restaurants").text("We suggest: " + (response.response.groups[0].items[suggestedRestuarantIndex].venue.name) + "    " + response.response.groups[0].items[suggestedRestuarantIndex].venue.location.address + "    " +response.response.groups[0].items[suggestedRestuarantIndex].venue.location.city + ", " + response.response.groups[0].items[suggestedRestuarantIndex].venue.location.state) + "   " +response.response.groups[0].items[suggestedRestuarantIndex].venue.location.postalCode;
    $("#try-again").show();
    // https://www.waze.com/ul?ll=40.75889500%2C-73.98513100&navigate=yes&zoom=17
  });

});
