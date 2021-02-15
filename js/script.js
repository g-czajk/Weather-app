// GENERAL VARIABLES

const cityName = document.querySelector(".city");
const icon = document.querySelector(".icon-img");
const temp = document.querySelector(".temp-value");
const feelsLike = document.querySelector(".feels-like-temp-value");
const pressure = document.querySelector(".pressure-value");
const windSpeed = document.querySelector(".wind-speed");
const windDirection = document.querySelector(".wind-direction");
const desc = document.querySelector(".description");
const wrapper = document.querySelector(".wrap");

const input = document.querySelector(".input");
const btn = document.querySelector(".button");
const error = document.querySelector(".error");

const regex = new RegExp(
    "^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$"
);

let storage = {};

// DISPLAY RECEIVED DATA IN UI

const showData = function (data) {
    cityName.textContent = `${data.name}, ${data.sys.country}`;
    icon.src = `img/${data.weather[0].icon}.png`;
    temp.textContent = Math.round(data.main.temp);
    feelsLike.textContent = `odczuwalna: ${Math.round(data.main.feels_like)}`;
    pressure.textContent = `ciśnienie: ${data.main.pressure} hPa`;
    windSpeed.textContent = `wiatr: ${data.wind.speed} m/s`;
    windDirection.style.transform = `rotate(${data.wind.deg}deg)`;
    desc.textContent = data.weather[0].description;
};

// DISPLAY ERROR SCREEN IF DIDN'T GET WEATHER DATA FOR SOME REASON

const showError = function (err) {
    cityName.textContent =
        err.message !== "Nie odnaleziono miasta"
            ? "Coś poszło nie tak :("
            : err.message;
    icon.src = `img/unknown.png`;
    temp.textContent = `--`;
    feelsLike.textContent = `--`;
    pressure.textContent = `--`;
    windSpeed.textContent = `--`;
    windDirection.style.transform = `rotate(0deg)`;
    desc.textContent = `---`;
};

// STYLE INPUT DEPENDING ON CORRECTNESS OF INSERTED VALUE

const styleInput = function (isError) {
    input.blur();
    if (isError) {
        input.classList.add("ring-red-500", "ring-2");
        error.classList.remove("hidden");
    } else {
        input.classList.remove("ring-red-500", "ring-2");
        error.classList.add("hidden");
    }
};

// LOAD DATA FROM API

const loadData = async function (city) {
    // test input value against RegExp (exclude calls containing forbidden characters like "/", "?", etc.)
    if (regex.test(city)) {
        // then try to load data from backend server (which calls API)
        try {
            const getData = await fetch(
                `https://some-app-412.herokuapp.com/onecall?q=${city}`
            );
            const receivedData = await getData.json();
            const data = receivedData.json;
            if (receivedData.success && data.cod == 200) {
                // if everything ok, display received data in UI
                showData(data);
                // also store last city name in Local Storage
                storage.city = city;
                localStorage.setItem("storage", JSON.stringify(storage));
                // style input
                input.value = "";
                styleInput(false);
                // scroll to top of the APP on mobile
                wrapper.scrollIntoView({
                    behavior: "smooth",
                });
            }
            // if wrong city name was inserted (unknown city), throw error
            else if (
                receivedData.success &&
                data.cod == 404 &&
                data.message === "city not found"
            ) {
                throw new Error("Nie odnaleziono miasta");
            }
            // also throw error if failed to load data from API for any other reason
            else {
                throw new Error(
                    data ? `${data.cod}, ${data.message}` : receivedData.message
                );
            }
        } catch (err) {
            // display error screen in UI
            showError(err);
            // style input
            styleInput(false);
            // scroll to top of the APP on mobile
            wrapper.scrollIntoView({
                behavior: "smooth",
            });
            // log error into console
            console.log(err);
        }
    }
    // if input value didn't pass RegExp test (contained forbidden characters), style the input and display error message in UI
    else {
        styleInput(true);
    }
};

// TRIGGER FUNCTION LOADING DATA BASED ON INPUT VALUE

input.addEventListener("keyup", function (e) {
    if (input.value && e.keyCode == 13) {
        const city = input.value;
        loadData(city);
    }
});

btn.addEventListener("click", function () {
    if (input.value) {
        const city = input.value;
        loadData(city);
    }
});

// LOAD WEATHER FOR LAST INSTERTED CITY UPON REFRESHING/RE-ENTERING THE APP

window.addEventListener("load", function () {
    let data = localStorage.getItem("storage");
    if (data) {
        storage = JSON.parse(data);
        loadData(storage.city);
    } else {
        storage = {};
    }
});
