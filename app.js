let formDOM = document.querySelector("#locationINPTForm");
let locationINPT = document.querySelector("#locationINPTForm input");
let spanLocation = document.querySelector("#currentLocation");

getCurrentWeather(51.5073219, -0.1276474);

function apiGeolocationURL(location) {
  return `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=7b1f5fe32203ec309dfbf166a3f4a8f8`;
}
async function getLatLon(location) {
  try {
    let url = apiGeolocationURL(location);

    let FetchedResult = await fetch(url, { mode: "cors" });

    let resultJSON = await FetchedResult.json();

    if (resultJSON.length == 0) {
      throw new Error("location not found");
    }
    return resultJSON;
  } catch (error) {
    console.error(error);
    console.log("catched");
    locationINPT.setCustomValidity("Invalid location.");
    locationINPT.reportValidity();
  }
}

locationINPT.addEventListener("change", () => {
  locationINPT.setCustomValidity("");
  locationINPT.reportValidity();
  //   formDOM.reset();
  //   locationINPT.reset();
});

console.log(formDOM);

formDOM.addEventListener("submit", (e) => {
  e.preventDefault();
  //   locationINPT.setCustomValidity("");
  //   locationINPT.reportValidity();

  let value = locationINPT.value;

  getLatLon(value)
    .then((result) => {
      currentLocation.textContent = result[0].name;
      let lat = result[0].lat;
      let lon = result[0].lon;
      getCurrentWeather(lat, lon);

      console.log(result);
    })
    .catch(() => {
      debugger;
      console.log("catched");
      locationINPT.setCustomValidity("Invalid location.");
    });
});

let tempNumber = document.querySelector("#currentTemp .temperatureNumber");
let feelNumber = document.querySelector("#feelsLike .temperatureNumber");

async function getCurrentWeather(lat, lon) {
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=7b1f5fe32203ec309dfbf166a3f4a8f8`;
  console.log("lat", lat);
  console.log("lon", lon);

  let result = await fetch(url, { mode: "cors" });
  let resultJSON = await result.json();

  tempNumber.textContent = resultJSON.main.temp + "°";
  feelNumber.textContent = resultJSON.main.feels_like + "°";

  console.log(resultJSON);
}
