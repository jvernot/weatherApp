// Need to create a click handler to grab the city that is input into the search bar using $(id).val()
    //consider clering the divs with the city weather info when the search is clicked
    //input the city as a parameter in the queryUrl to search the API
    //also need to save the city that is input to local storage and prepend it under the search bar
    //the city name also need to be added to the right side column

//use moment.js format to have the date appear next to the city name in the right column
//append the icon after the date using this url "http://openweathermap.org/img/wn/" + icon + "@2x.png" and the reponse.icon

//need to find the corerct paths in the "response" to get the values for temp, humidity, wind speed, UV index
// then need to add these responses to the p elements that they correspond to 

window.onload = function() {

    var storedCities = JSON.parse(localStorage.getItem("citiesArray")) || [];
    
    storedCities = storedCities.slice(0, 10);
    
    $("#cityDiv").empty();        
    
    //loop through the array and for each item in the array create an item that I want to use -- look at jquery drinks list
    for (var i =0; i < storedCities.length; i++) {

        newCityDiv = $("<div class='p-2' id='cityCards'>" + storedCities[i] + "</div>");
    
        $("#cityDiv").append(newCityDiv);
    }
}




$(document).ready(function() {
    console.log("test");


    $("#searchButton").on("click", function(event){
        console.log("click");
        event.preventDefault();
       
        //set the city and date in right column
        var city = $("#cityInput").val();
        console.log("City: ", city);

        
        var date = moment().format('l');
        console.log(date);
        
        $("#cityEl").text(city + " (" + date + ")");


        //setting up local storage for the cities entered
        //storedCities quals whatever is in local storage names cities array or a blank array
        var storedCities = JSON.parse(localStorage.getItem("citiesArray")) || [];
        //new ccity is equal to the var city (pulled from the search bar)
        var newCity = city;
        //pushing new city into the storedCities array
        storedCities.unshift(newCity);
        //setting citiesArray in local storage equal to the stringified array storedCities
        localStorage.setItem("citiesArray", JSON.stringify(storedCities));

        storedCities = storedCities.slice(0, 10);

        $("#cityDiv").empty();        

        //loop through the array and for each item in the array create an item that I want to use -- look at jquery drinks list
        for (var i =0; i < storedCities.length; i++) {


            newCityDiv = $("<div class='p-2' id='cityCards'>" + storedCities[i] + "</div>");

            $("#cityDiv").append(newCityDiv);
        }





        var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=c59597ffd14758d47fc6dad0d31f1be0";

        $.ajax({
            url: queryUrl,
            method: "GET"
        })

        .then(function(response) {
            console.log(response);

            //set all of the weather elements in the right column

            var temp = response.main.temp;
            console.log(temp);
            $("#tempEl").text("Temperature: " + temp + "°F");

            var humidity = response.main.humidity;
            console.log(humidity);
            $("#humidEl").text("Humidity: " + humidity + "%");

            var wind = response.wind.speed;
            console.log(wind);
            $("#windEl").text("Wind Speed: " + wind + "MPH");

            var icon = response.weather[0].icon;
            var icon = ("http://openweathermap.org/img/wn/" + icon + "@2x.png");
            $("#cityEl").append("<img src=" + icon + ">");



            //need to record the lat and long from the location and use another API call to get the UV index

            var latitude = response.coord.lat;
            var longitude = response.coord.lon;

            console.log("lat: " + latitude);
            console.log("lon: " + longitude);

            var uvQueryUrl = "http://api.openweathermap.org/data/2.5/uvi?appid=c59597ffd14758d47fc6dad0d31f1be0&lat=" + latitude + "&lon=" + longitude;

            $.ajax({
                url: uvQueryUrl,
                method: "GET"
            })

            .then(function(response) {
                console.log(response);

                var uv = response.value;
                console.log(uv);
                $("#uvEl").text("UV Index: " + uv);

            })


            //5 day forecast api call

            var forecastQueryUrl = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=c59597ffd14758d47fc6dad0d31f1be0"

            $.ajax({
                url: forecastQueryUrl,
                method: "GET"
            })

            .then(function(response) {
                console.log(response);


            })
        })


    })

})