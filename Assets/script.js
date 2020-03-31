// Need to create a click handler to grab the city that is input into the search bar using $(id).val()
    //consider clering the divs with the city weather info when the search is clicked
    //input the city as a parameter in the queryUrl to search the API
    //also need to save the city that is input to local storage and prepend it under the search bar
    //the city name also needs to be added to the right side column

//use moment.js format to have the date appear next to the city name in the right column
//append the icon after the date using this url "http://openweathermap.org/img/wn/" + icon + "@2x.png" and the reponse.icon

//need to find the corerct paths in the "response" to get the values for temp, humidity, wind speed, UV index
// then need to add these responses to the p elements that they correspond to 


//setting previous searches to show when the page is closed and re-opened
window.onload = function() {

    var storedCities = JSON.parse(localStorage.getItem("citiesArray")) || [];
    
    storedCities = storedCities.slice(0, 9);
    
    $("#citySearches").empty();        
    
    //loop through the array and for each item in the array create an item that I want to use -- look at jquery drinks list
    for (var i =0; i < storedCities.length; i++) {
            
        newCityEl = $("<li class='list-group-item'>" + storedCities[i] + "</li>");
        
        $("#citySearches").append(newCityEl);
    }
}




$(document).ready(function() {
    console.log("test");
    
    
    $("#searchButton").on("click", function(event){
        console.log("click");
        event.preventDefault();
        
        // set the city variable for the left column and API call
        var city = $("#cityInput").val();
        
        //setting up local storage for the cities entered
        //storedCities quals whatever is in local storage names cities array or a blank array
        var storedCities = JSON.parse(localStorage.getItem("citiesArray")) || [];
        //new ccity is equal to the var city (pulled from the search bar)
        var newCity = city;
        //pushing new city into the storedCities array at the front
        storedCities.unshift(newCity);
        //setting citiesArray in local storage equal to the stringified array storedCities
        localStorage.setItem("citiesArray", JSON.stringify(storedCities));
        
        storedCities = storedCities.slice(0, 9);
        
        $("#citySearches").empty();        
        
        //loop through the array and for each item in the array create an item that I want to use -- look at jquery drinks list
        for (var i =0; i < storedCities.length; i++) {
            
            newCityEl = $("<li class='list-group-item'>" + storedCities[i] + "</li>");
            
            $("#citySearches").append(newCityEl);
        }
        
        
        
        
        var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=c59597ffd14758d47fc6dad0d31f1be0";
    
        $.ajax({
            url: queryUrl,
            method: "GET"
        })
    
        .then(function(response) {
            console.log(response);
    
            //set all of the weather elements in the right column
    
            var city = response.name;
            console.log(city);
            var date = moment().format('l');
            console.log(date);
            
            $("#cityEl").text(city + " (" + date + ")");
    
            var temp = response.main.temp;
            console.log(temp);
            $("#tempEl").text("Temperature: " + temp + " °F");
    
            var humidity = response.main.humidity;
            console.log(humidity);
            $("#humidEl").text("Humidity: " + humidity + "%");
    
            var wind = response.wind.speed;
            console.log(wind);
            $("#windEl").text("Wind Speed: " + wind + " MPH");
    
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
                console.log("UV Index:" + uv);
                $("#uvEl").html("<p>UV Index: " + "<span id='uvColor' >" + uv + "</span></h1>");
    
                if (uv <= 2.5) {
                    $("#uvColor").addClass("low")
                } 
                else if (uv > 2.5 && uv <= 5.5) {
                    $("#uvColor").addClass("moderate")
                }
                else if (uv > 5.5 && uv <= 7.5) {
                    $("#uvColor").addClass("high")
                }
                else if (uv > 7.5 && uv <= 10.5) {
                    $("#uvColor").addClass("very-high")
                }
                else if (uv > 10.5) {
                    $("#uvColor").addClass("extreme")
                } 
    
            })
    
    
            //5 day forecast api call
    
            var forecastQueryUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=c59597ffd14758d47fc6dad0d31f1be0"
    
            $.ajax({
                url: forecastQueryUrl,
                method: "GET"
            })
    
            .then(function(response) {
                console.log(response);
    
                var futureDate1 = moment().add(1, 'days').format("l");
                console.log(futureDate1);
    
                $("#forecast1").empty();
    
                $("#forecast1").append("<div id= 'day1' class='card-body'>");
                    
                $("#day1").append("<h5 class='card-title'>" + futureDate1 + "</h5>");
    
                var weatherIcon1 = response.list[5].weather[0].icon;
                console.log(weatherIcon1);
                var weatherIcon1 = ("https://openweathermap.org/img/wn/" + weatherIcon1 + "@2x.png");
    
                $("#day1").append("<img src=" + weatherIcon1 + ">");
    
                var futureTemp1 = response.list[5].main.temp;
                console.log(futureTemp1);
    
                $("#day1").append("<p class='card-text'>Temp: " + futureTemp1 + " °F</p>")
    
                var futureHumid1 = response.list[5].main.humidity;
                console.log(futureHumid1);
    
                $("#day1").append("<p class='card-text'>Humidity: " + futureHumid1 + "%</p>")
    
                
                
                
                //Day 2
    
                var futureDate2 = moment().add(2, 'days').format("l");
                console.log(futureDate2);
    
                $("#forecast2").empty();
    
                $("#forecast2").append("<div id='day2' class='card-body'>");
                    
                $("#day2").append("<h5 class='card-title'>" + futureDate2 + "</h5>");
    
                var weatherIcon2 = response.list[13].weather[0].icon;
                console.log(weatherIcon2);
                var weatherIcon2 = ("https://openweathermap.org/img/wn/" + weatherIcon2 + "@2x.png");
    
                $("#day2").append("<img src=" + weatherIcon2 + ">");
    
                var futureTemp2 = response.list[13].main.temp;
                console.log(futureTemp2);
    
                $("#day2").append("<p class='card-text'>Temp: " + futureTemp2 + " °F</p>")
    
                var futureHumid2 = response.list[13].main.humidity;
                console.log(futureHumid2);
    
                $("#day2").append("<p class='card-text'>Humidity: " + futureHumid2 + "%</p>")
    
    
    
                //Day 3
    
    
                var futureDate3 = moment().add(3, 'days').format("l");
                console.log(futureDate3);
    
                $("#forecast3").empty();
    
                $("#forecast3").append("<div id='day3' class='card-body'>");
                    
                $("#day3").append("<h5 class='card-title'>" + futureDate3 + "</h5>");
    
                var weatherIcon3 = response.list[21].weather[0].icon;
                console.log(weatherIcon3);
                var weatherIcon3 = ("https://openweathermap.org/img/wn/" + weatherIcon3 + "@2x.png");
    
                $("#day3").append("<img src=" + weatherIcon3 + ">");
    
                var futureTemp3 = response.list[21].main.temp;
                console.log(futureTemp3);
    
                $("#day3").append("<p class='card-text'>Temp: " + futureTemp3 + " °F</p>");
    
                var futureHumid3 = response.list[21].main.humidity;
                console.log(futureHumid3);
    
                $("#day3").append("<p class='card-text'>Humidity: " + futureHumid3 + "%</p>");
    
    
                //Day 4
    
                var futureDate4 = moment().add(4, 'days').format("l");
                console.log(futureDate4);
    
                $("#forecast4").empty();
    
                $("#forecast4").append("<div id='day4' class='card-body'>");
                    
                $("#day4").append("<h5 class='card-title'>" + futureDate4 + "</h5>");
    
                var weatherIcon4 = response.list[29].weather[0].icon;
                console.log(weatherIcon4);
                var weatherIcon4 = ("https://openweathermap.org/img/wn/" + weatherIcon4 + "@2x.png");
    
                $("#day4").append("<img src=" + weatherIcon4 + ">");
    
                var futureTemp4 = response.list[29].main.temp;
                console.log(futureTemp4);
    
                $("#day4").append("<p class='card-text'>Temp: " + futureTemp4 + " °F</p>");
    
                var futureHumid4 = response.list[29].main.humidity;
                console.log(futureHumid4);
    
                $("#day4").append("<p class='card-text'>Humidity: " + futureHumid4 + "%</p>");
                
                
    
                //Day 5
    
                var futureDate5 = moment().add(4, 'days').format("l");
                console.log(futureDate5);
    
                $("#forecast5").empty();
    
                $("#forecast5").append("<div id='day5' class='card-body'>");
                    
                $("#day5").append("<h5 class='card-title'>" + futureDate5 + "</h5>");
    
                var weatherIcon5 = response.list[37].weather[0].icon;
                console.log(weatherIcon5);
                var weatherIcon5 = ("https://openweathermap.org/img/wn/" + weatherIcon5 + "@2x.png");
    
                $("#day5").append("<img src=" + weatherIcon5 + ">");
    
                var futureTemp5 = response.list[37].main.temp;
                console.log(futureTemp5);
    
                $("#day5").append("<p class='card-text'>Temp: " + futureTemp5 + " °F</p>");
    
                var futureHumid5 = response.list[37].main.humidity;
                console.log(futureHumid5);
    
                $("#day5").append("<p class='card-text'>Humidity: " + futureHumid5 + "%</p>");
    
    
                
            
            
            
                
            
            
            
            
            
            
            
                // maybe try array for days 1-5 and calling $("'#forecast(' + i + ')'")
                
                // var times = [5, 13, 21, 29, 37];
        
                // var count = 0
        
                // for (var i = 0; i < times.length; i++) {
    
                
                // $("#forecastCard").append("<div class='card-body'>");
                
                // $(".card-body").append("<h5 class='card-title'>" + futureDate + "</h5>");
                
                // count++;
                // var futureDate = moment().add(count, 'days').format("l");
                // console.log(futureDate);
                
                // $("#rightRow2").append("<h5 class='card-title'>" + futureDate + "</h5>");
                
                // var weatherIcon = response.list[i].weather[0].icon;
                // console.log(weatherIcon);
                
                // var futureTemp = response.list[i].main.temp;
                // console.log(futureTemp);
                
                // var futureHumid = response.list[i].main.humidity;
                // console.log(futureHumid);
                
                // }
                
        
                })
            })
        
    })
        
    
})