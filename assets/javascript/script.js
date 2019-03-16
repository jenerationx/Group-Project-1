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
  $("#try-again").hide();
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
    console.log(restuarantDetails);
    for (var i = 0; i < r.length; i++) {
      var restaurantName = restuarantDetails[r[i]].venue.name;
      var restaurantLoc = restuarantDetails[r[i]].venue.location.formattedAddress;
      var threeChoices = $("<p>" + "<strong>" + restaurantName + "</strong>" + "   " + restaurantLoc + "</p>");
      $("#restaurants").append(threeChoices);
      $(threeChoices).addClass("py-2")
      console.log(restaurantName);
      console.log(this);
      var lat = restuarantDetails[r[i]].venue.location.lat;
      var lng = restuarantDetails[r[i]].venue.location.lng;
      console.log(lat, lng);

      var wazeBtn = $("<button>");

      wazeBtn.attr("id", "waze-btn");

      wazeBtn.addClass("btn text-light float-right");

      wazeBtn.text("Take me there with Waze");

      threeChoices.append(wazeBtn);

      $("#waze-btn").on("click", function (event) {
        event.preventDefault();
        window.location = "https://www.waze.com/ul?ll=" + lat + "%2C" + lng + "&navigate=yes&zoom=17";
      });
          // stores the recommendation in a temp object
    var recommendedation = {
      name: restaurantName,
      location: restaurantLoc,
    };

    // Uploads new recommendation to the database
    database.ref().push(recommendedation);

    };

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

    var restuarantDetails = response.response.groups[0].items;

    var numOfResults = response.response.groups[0].items.length;

    var suggestedRestuarantIndex = Math.floor(Math.random() * (numOfResults - 1));
    console.log(suggestedRestuarantIndex);

    var restaurantName = restuarantDetails[suggestedRestuarantIndex].venue.name;

    console.log(restaurantName);

    var restaurantLoc = response.response.groups[0].items[suggestedRestuarantIndex].venue.location.formattedAddress;
    console.log(restaurantLoc);
    var appChoice = $("<p>" + "<strong>" + restaurantName + "</strong>" + "   " + restaurantLoc + "</p>");
    $("#restaurants").append(appChoice);

    var lat = restuarantDetails[suggestedRestuarantIndex].venue.location.lat;
    var lng = restuarantDetails[suggestedRestuarantIndex].venue.location.lng;
    console.log(lat, lng);

    var wazeBtn = $("<button>");

    wazeBtn.attr("id", "waze-btn");

    wazeBtn.addClass("btn text-light float-right");

    wazeBtn.text("Take me there with Waze");

    appChoice.append(wazeBtn);

    $("#try-again").show();
    $("#waze-btn").on("click", function (event) {
      event.preventDefault();
      window.location = "https://www.waze.com/ul?ll=" + lat + "%2C" + lng + "&navigate=yes&zoom=17";
    });
    // stores the recommendation in a temp object
    var recommendedation = {
      name: restaurantName,
      location: restaurantLoc,
    };

    // Uploads new recommendation to the database
    database.ref().push(recommendedation);

    console.log(recommendedation.name);
    console.log(recommendedation.location);

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
    var restaurantLoc = response.response.groups[0].items[suggestedRestuarantIndex].venue.location.formattedAddress;

    console.log(restaurantName);

    var appChoice = $("<p>" + "<strong>" + restaurantName + "</strong>" + "   " + restaurantLoc + "</p>");
    $("#restaurants").append(appChoice);

    var lat = restuarantDetails[suggestedRestuarantIndex].venue.location.lat;
    var lng = restuarantDetails[suggestedRestuarantIndex].venue.location.lng;
    console.log(lat, lng);

    var wazeBtn = $("<button>");

    wazeBtn.attr("id", "waze-btn");

    wazeBtn.addClass("btn text-light float-right");

    wazeBtn.text("Take me there with Waze");

    appChoice.append(wazeBtn);

    $("#try-again").show();
    $("#waze-btn").on("click", function (event) {
      event.preventDefault();
      window.location = "https://www.waze.com/ul?ll=" + lat + "%2C" + lng + "&navigate=yes&zoom=17";
    });
    $("#try-again").show();

    // stores the recommendation in a temp object
    var recommendedation = {
      name: restaurantName,
      location: restaurantLoc,
    };

    // Uploads new recommendation to the database
    database.ref().push(recommendedation);

  });

});
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
  $("#recommendation").prepend(newRow);
});