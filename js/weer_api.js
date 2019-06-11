"use strict"; //opt-out of "sloppy mode"
const debug = true; //debuggen
//bind HTML Elements via DOM
let weerButton = document.getElementById('weatherButton');
let weerButton2 = document.getElementById('weatherButton2');
let weatherTickerTape = document.getElementById('weatherTickerTape');
let weatherHere = document.getElementById('weatherHere');
let completeWeatherHere = document.getElementById('completeWeatherHere');

weerButton.addEventListener('click', getWeather);
weerButton2.addEventListener('click', getWeather2);
weatherTickerTape.addEventListener('click', getWeatherTickerTape);

//overige variabelen
let apiAddress = "http://weerlive.nl/api/json-data-10min.php?key="; //address
let key = "demo";
//let key = "77f9e00dfd"; //key van docent
let locatie = "&locatie=";
//let geoLocation = "52.391225,4.856799"; //longitude lattitude als locatie - Sloterdijk
let geoLocation = "Amsterdam"; //locatie als string
let url = apiAddress + key + locatie + geoLocation; //haal hier data

function getWeather2(){
  weatherHere.innerHTML = "";
  makeAjaxCall(url, "GET") . then (showWeather2, errorHandler);
}

function getWeather(){
  weatherHere.innerHTML = "";
  makeAjaxCall(url, "GET") . then (showWeather, errorHandler);
}

function getWeatherTickerTape(){
  weatherHere.innerHTML = "";
  makeAjaxCall(url, "GET") . then (showWeatherTickerTape, errorHandler);
}

function showWeather(weatherString) {
  let weatherObject = JSON.parse(weatherString);//JSON
  let ditWeer =
   weatherObject.liveweer[0].plaats +
   "<br>Tempertatuur " +
   weatherObject.liveweer[0].temp + "&#176;C" +
   "<br> Verwachting " +
   weatherObject.liveweer[0].samenv +
   "<br> Weerbeeld " +
   weatherObject.liveweer[0].image +
   '<img src="iconen-weerlive/' + weatherObject.liveweer[0].image + '.png">'
   weatherHere.innerHTML = ditWeer;
}

function showWeather2(weatherString){
  let weatherObject = JSON.parse(weatherString); //convert JSON string => Object
  let completeData = "";
  for (const [key, value] of Object.entries(weatherObject.liveweer[0])) {
    debug ? console.log('${key}: ${value}') : ""; //debug van console
    completeData += key + " : " + value + "<br>"; //maak String
    weatherHere.innerHTML = completeData; // string printen in browser
  }
}

function showWeatherTickerTape(weatherString){
  let weatherObject = JSON.parse(weatherString); //convert JSON string => Object

  let weatherArray = [
  weatherObject.liveweer[0].plaats + " - " +
  weatherObject.liveweer[0].temp + " - " +
  weatherObject.liveweer[0].samenv + " - " +
  '<img class="img" src="iconen-weerlive/' + weatherObject.liveweer[0].image + '.png">' + " - "];
  weatherArray.push(" reclame tekst ");
  tickerItem = document.getElementById('ticker__item').innerHTML = weatherArray;
}