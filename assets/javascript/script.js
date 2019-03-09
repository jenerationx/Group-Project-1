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
    apiKey: "AIzaSyD_snZYOPOx9m99BoAtz6f2M4ZNpOinGek",
    authDomain: "decisionmaker-d2e6a.firebaseapp.com",
    databaseURL: "https://decisionmaker-d2e6a.firebaseio.com",
    projectId: "decisionmaker-d2e6a",
    storageBucket: "decisionmaker-d2e6a.appspot.com",
    messagingSenderId: "354052183088"
  };
  firebase.initializeApp(config);

  var database = firebase.database();
  
  

  $("#show-choices").on("click", function(event){
    event.preventDefault();
    var userLocation = $("#location").val().trim();
    console.log(userLocation);
    var cuisine = $("#cuisine").val().trim();
    console.log(cuisine);
    var priceRange = $("#price-range").val().trim();
    console.log(priceRange);    
  })

  $("#choose-for-me").on("click", function(event){
    event.preventDefault();
    var userLocation = $("#location").val().trim();
    console.log(userLocation);
    var cuisine = $("#cuisine").val().trim();
    console.log(cuisine);
    var priceRange = $("#price-range").val().trim();
    console.log(priceRange);    
  })
  
 /* $.ajax({
    method: "GET",
    url: 
  })
*/