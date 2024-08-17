var currentDay = document.getElementById('current-day');
var currentDate= document.getElementById('current-date');
var city= document.getElementById('city');
var temp=document.getElementById('temp');
var statuss = document.getElementById('status');
var nextDay=document.getElementsByClassName('next-day');
var nextDate=document.getElementsByClassName('next-date');
var nextCity = document.getElementsByClassName('next-city');
var nextTemp = document.getElementsByClassName('next-temp')
var nextStatuss= document.getElementsByClassName('next-status')
var search = document.getElementById('input-search')
var waetherArray =[];
async function fetchApi (cityName){
    try{
        var response = await fetch (`https://api.weatherapi.com/v1/forecast.json?key=83c0dfe417224a5d8be90007241607&q=${cityName}&days=3`);
        var finalData = await response.json()
        waetherArray = finalData;
        
    }catch{
        console.log('error')
    }
    
    
}

async function currentWeather(){
    currentDay.innerHTML=getCurrentDayName();
    currentDate.innerHTML=waetherArray.location.localtime;
    city.innerHTML=waetherArray.location.name;
    temp.innerHTML = waetherArray.current.temp_c;
    statuss.innerHTML=waetherArray.current.condition.text;
}
// next days 
function nextDayWeather(data){
    var nextWeatherDays= data.forecast.forecastday;
    console.log(nextWeatherDays)
    for (var i =0 ; i < 2 ; i++){
        var nextdate = new Date(nextWeatherDays[i].date);
        nextDay[i].innerHTML=nextdate.toLocaleDateString('en-US', {weekday:'long'});
        nextCity[i].innerHTML=waetherArray.location.name;
        nextTemp[i].innerHTML=nextWeatherDays[i].day.maxtemp_c;
        nextStatuss[i].innerHTML=nextWeatherDays[i+1].day.condition.text;

        
    }
}
search.addEventListener('input' ,function(){
    startApp(search.value)
})
async function startApp (city='cairo'){
    await fetchApi (city);
    currentWeather();
    nextDayWeather(waetherArray)
}
startApp ()
function getCurrentDayName() {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date();
    const dayName = days[today.getDay()];
    return dayName;
}



