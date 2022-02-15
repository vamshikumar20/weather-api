function GetInfo()
{
   var newName = document.getElementById("cityInput");
   var cityName = document.getElementById("cityName");
   cityName.innerHTML = "--"+newName.value+"--";

  fetch('https://api.openweathermap.org/data/2.5/forecast?q='+newName.value+'&appid=f02d68936905fe8381426343096ae320')
  .then(response => response.json())
  .then(data => {
   //Getting the min and max values for each day
   for(i = 0; i<8; i++)
   {
       document.getElementById("day" + (i+1) + "Min").innerHTML = "Min: " + Number(data.list[i].main.temp_min - 273.15).toFixed(1)+ "°";
       //Number(1.3450001).toFixed(2); // 1.35
   }
   for(i = 0; i<8; i++)
   {
       document.getElementById("day" + (i+1) + "Max").innerHTML = "Max: " + Number(data.list[i].main.temp_max - 273.15).toFixed(2) + "°";
   }
   //------------------------------------------------------------

   //Getting Weather Icons
    for(i = 0; i<8; i++)
    {
       document.getElementById("img" + (i+1)).src = "http://openweathermap.org/img/wn/"+
       data.list[i].weather[0].icon
    +".png";
   }
   //------------------------------------------------------------
   console.log(data)
})
.catch(err => alert("Something Went Wrong: Try Checking Your Internet Coneciton"))
}

/////
const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatherItemsEl = document.getElementById('current-weather-items');
const timezone = document.getElementById('time-zone');
const countryEl = document.getElementById('country');
const weatherForecastEl = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('current-temp');

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const API_KEY ='f02d68936905fe8381426343096ae320';

setInterval(() => {
   const time = new Date();
   const month = time.getMonth();
   const date = time.getDate();
   const day = time.getDay();
   const hour = time.getHours();
   const hoursIn12HrFormat = hour >= 13 ? hour %12: hour
   const minutes = time.getMinutes();
   const ampm = hour >=12 ? 'PM' : 'AM'

   timeEl.innerHTML = (hoursIn12HrFormat < 10? '0'+hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10? '0'+minutes: minutes)+ ' ' + `<span id="am-pm">${ampm}</span>`

   dateEl.innerHTML = days[day] + ', ' + date+ ' ' + months[month]

}, 1000);

getWeatherData()
function getWeatherData()
{
   navigator.geolocation.getCurrentPosition((success) => {
       
       let {latitude, longitude } = success.coords;

       fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {

       console.log(data)
       showWeatherData(data);
       })

   })
}

function showWeatherData(data)
{
   let {humidity, pressure, sunrise, sunset, wind_speed} = data.current;

   timezone.innerHTML = data.timezone;
   countryEl.innerHTML = data.lat + 'N ' + data.lon+'E'

   currentWeatherItemsEl.innerHTML = 
   `<div class="weather-item">
       <div>Humidity</div>
       <div>${humidity}%</div>
   </div>
   <div class="weather-item">
       <div>Pressure</div>
       <div>${pressure}</div>
   </div>
   <div class="weather-item">
       <div>Wind Speed</div>
       <div>${wind_speed}</div>
   </div>
   <div class="weather-item">
       <div>Sunrise</div>
       <div>${window.moment(sunrise * 1000).format('HH:mm a')}</div>
   </div>
   <div class="weather-item">
       <div>Sunset</div>
       <div>${window.moment(sunset*1000).format('HH:mm a')}</div>
   </div>
   `;

   
}
/////

function DefaultScreen()
{
   document.getElementById("cityInput").defaultValue = "Delhi";
   GetInfo();
   
}
//Getting and displaying the text for the upcoming five days of the week
var d = new Date();
var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",];

//Function to get the correct integer for the index of the days array
function CheckDay(day)
{
   if(day + d.getDay() > 6)
   {
       return day + d.getDay() - 7;
   }
   else
   {
       return day + d.getDay();
   }
}

   for(i = 0; i<8; i++)
   {
       document.getElementById("day" + (i+1)).innerHTML = weekday[CheckDay(i)];
   }
   //------------------------------------------------------------

/*document.getElementById("day1Min").innerHTML = Math.round(data.list[0].main.temp_min - 273.15, -2);
document.getElementById("day2Min").innerHTML = Math.round(data.list[1].main.temp_min - 273.15, -2);
document.getElementById("day3Min").innerHTML = Math.round(data.list[2].main.temp_min - 273.15, -2);
document.getElementById("day4Min").innerHTML = Math.round(data.list[3].main.temp_min - 273.15, -2);
document.getElementById("day5Min").innerHTML = Math.round(data.list[4].main.temp_min - 273.15, -2);
document.getElementById("day6Min").innerHTML = Math.round(data.list[5].main.temp_min - 273.15, -2);
document.getElementById("day7Min").innerHTML = Math.round(data.list[6].main.temp_min - 273.15, -2);
document.getElementById("day8Min").innerHTML = Math.round(data.list[7].main.temp_min - 273.15, -2);*/

/*document.getElementById("day1Max").innerHTML = Math.round(data.list[0].main.temp_max - 273.15, -2);
document.getElementById("day2Max").innerHTML = Math.round(data.list[0].main.temp_max - 273.15, -2);
document.getElementById("day3Max").innerHTML = Math.round(data.list[0].main.temp_max - 273.15, -2);
document.getElementById("day4Max").innerHTML = Math.round(data.list[0].main.temp_max - 273.15, -2);
document.getElementById("day5Max").innerHTML = Math.round(data.list[0].main.temp_max - 273.15, -2);*/

/*document.getElementById("img1").src = "http://openweathermap.org/img/w/"+
data.list[0].weather[0].icon
+".png";
document.getElementById("img2").src = "http://openweathermap.org/img/w/"+
data.list[1].weather[0].icon
+".png";
document.getElementById("img3").src = "http://openweathermap.org/img/w/"+
data.list[2].weather[0].icon
+".png";
document.getElementById("img4").src = "http://openweathermap.org/img/w/"+
data.list[3].weather[0].icon
+".png";
document.getElementById("img5").src = "http://openweathermap.org/img/w/"+
data.list[4].weather[0].icon
+".png";*/
/*
document.getElementById("day1").innerHTML = weekday[CheckDay(0)];
document.getElementById("day2").innerHTML = weekday[CheckDay(1)];
document.getElementById("day3").innerHTML = weekday[CheckDay(2)];
document.getElementById("day4").innerHTML = weekday[CheckDay(3)];
document.getElementById("day5").innerHTML = weekday[CheckDay(4)];*/

/*weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";*/
