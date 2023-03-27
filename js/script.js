let background = document.querySelector("#card");
let cloudBG = document.querySelector("#clouds");
let weather = {
    apiKey: "05044ff180e834ecf2166d21fee4fce5",
    
    fetchWeather: function(city){
        fetch("https://api.openweathermap.org/data/2.5/weather?q="
        + city + "&units=metric&appid=" + this.apiKey
        )
        .then((response)=> response.json())
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data){
        const {name} = data;
        const {icon, description} = data.weather[0];
        const {temp, humidity} = data.main;
        const {speed} = data.wind;
       //const {timezone} = data.sys.type + data.timezone;
        setBackground(description);
     
        const timezoneOffset = data.timezone; // Get the timezone offset in seconds
        const currentDate = new Date(); // Get the current date and time in the local timezone
        const localTime = currentDate.getTime(); // Get the current time in milliseconds
        const utcTime = localTime + (currentDate.getTimezoneOffset() * 60 * 1000); // Convert local time to UTC time
        const cityTime = utcTime + (timezoneOffset * 1000); // Add the city's timezone offset to get the city's time
        // Display the current time and date in the city's timezone
        const formattedTime = new Date(cityTime).toLocaleTimeString();
        const formattedDate = new Date(cityTime).toLocaleDateString();
       
        //const currentTime = new Date((currentTimestamp + timezoneOffset) * 1000);
    
    // check if it's currently daytime or nighttime
        ///const isDaytime = currentTime >= new Date(sunriseTimestamp * 1000) && currentTime <= new Date(sunsetTimestamp * 1000);
    
    // output the result
                
            const currentTime = new Date().getTime() / 1000;
            const sunrise = data.sys.sunrise;
            const sunset = data.sys.sunset;
            
            if (currentTime > sunrise && currentTime < sunset) {
              console.log('It is currently daytime.');
              document.body.style.backgroundImage = "url('./resources/Day.png')"; 
              background.style.backgroundImage = "url('./resources/PhoneDay-04-04.png')"

             
            } else {
              console.log('It is currently nighttime.');
              document.body.style.backgroundImage = "url('./resources/Night.png')";
              background.style.backgroundImage = "url('./resources/PhoneNight-03.png')"
             
    }
        console.log(name, icon, description, temp, humidity, speed,formattedTime,formattedDate);
        document.querySelector('.weather__city').innerText = "" + name;
        document.querySelector(".weather__time").innerHTML = `Time : ${formattedTime} ` + `Date : ${formattedDate}`;
        document.querySelector('.weather__icon').src ="http://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector('.weather__Description').innerText = "Description: " + description;
        document.querySelector('.weather__temp').innerText = temp + "℃";
        document.querySelector('.weather__humidity').innerText = "Humidity: " + humidity + "%";
        document.querySelector('.weather__wind').innerText = "Wind Speed: " + speed + "%";
        //document.querySelector('.weather').addclassList.remove('loading');
        
    },
    search: function(){
        this.fetchWeather(
            document.querySelector('.search__bar').value
        );
    },
  
}

document.querySelector('.search button').addEventListener('click',function(){
    weather.search();
});
document.querySelector('.search__bar').addEventListener('keyup',function(event){
    if(event.key == "Enter"){
        weather.search();
    }
});

function setBackground(description) {
    if (description == "light rain") {
     
    } else if (description == "clear sky") {
    
    } else if (description == "scattered clouds") {
      cloudBG.src = "./resources/ScatteredClouds-06.png";
    } else if (description == "broken clouds") {
      cloudBG.src = "./resources/BrokenClouds-06.png";
     // document.body.style.backgroundImage = "url('./resources/cloudy.avif')"; 
    }
    else if(description == " few clouds") {
      cloudBG.src = "./resources/clouds-06-06.png "; 
      //background.src = "./resources/cloudy.avif";
    }
  }
