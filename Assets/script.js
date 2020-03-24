// Need to create a click handler to grab the city that is input into the search bar using $(id).val()
    //consider clering the divs with the city weather info when the search is clicked
    //input the city as a parameter in the queryUrl to search the API
    //also need to save the city that is input to local storage and prepend it under the search bar
    //the city name also need to be added to the right side column

//use moment.js format to have the date appear next to the city name in the right column
//need to figure out the weather symbol as well (likely a parameter pulled from the API)

//need to find the corerct paths in the "response" to get the values for temp, humidity, wind speed, UV index
// then need to add these responses to the p elements that they correspond to 

$(document).ready(function() {
    console.log("test");

    $("#searchButton").on("click", function(event){
        console.log("click");
        event.preventDefault();
       
        var city = $("#cityInput").val();
        console.log("City: ", city);

        var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=c59597ffd14758d47fc6dad0d31f1be0";

        $.ajax({
            url: queryUrl,
            method: "GET"
        })

        .then(function(response) {
            console.log(response);
        })

        
    })

})