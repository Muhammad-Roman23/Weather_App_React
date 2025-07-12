import { useState } from "react";
import "./Weather.css";
import clear from "./animated/01d.svg";
import Cloudy from "./animated/02d.svg";
import rain from "./animated/09d.svg";
import Drizzle from "./animated/10d.svg";
import Thunderstorm from "./animated/11d.svg";
import Snow from "./animated/13d.svg";
import wind  from "./animated/wind-speed.svg";
import humidity  from "./animated/humidity.svg";
import pressure  from "./animated/pressure.svg";
import visibility  from "./animated/visibility.svg";
import sunrise  from "./animated/sunrise.svg";
import sunset  from "./animated/sunset.svg";

export const Weather = () => {
  const [City, setCity] = useState("");

  const [WeatherData, setWeatherData] = useState();

  const handleCityInput = (CityName) => {
    console.log(CityName);
    setCity(CityName);
  };

  let fetchWeather = async () => {
    let apiKey = "a35ba772956a3be0c973a4faf81ecc92";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${City}&appid=${apiKey}&units=metric`;

    let res = await fetch(url);
    console.log(res);

    let data = await res.json();
    console.log(data);
    setWeatherData(data);
    setCity("")

  };

  const renderimage = (value) => {
    console.log(value);

    if (value == "Clouds") {
      return Cloudy;
    } else if (value == "Rain") {
      return rain;
    } else if (value == "Drizzle") {
      return Drizzle;
    } else if (value == "Thunderstorm") {
      return Thunderstorm;
    } else if (value == "Snow") {
      return Snow;
    } else if (value == "Clear") {
      return clear;
    } else {
      return null;
    }
  };

  return (
    <>
      <div className="parent">
        <div className="top">
          <div className="search-bar">
            <div className="head">
              <h1>Weather App</h1>
            </div>
            <div className="input">
              <input
                type="text"
                placeholder="Enter city"
                value={City}
                onChange={(e) => handleCityInput(e.target.value)}
              />

              <div className="search-btn" onClick={() => fetchWeather()}>
                Search
              </div>
            </div>
          </div>
        </div>
        {WeatherData && (
          <div className="form-bg">
            <div className="bottom">
              <div className="weather">
                <div className="weather-photo">
                  <div className="line1">
                    <img
                      src={renderimage(WeatherData?.weather?.[0]?.main)}
                      alt="weather"
                      className="weather-img"
                    />
                    <div className="skip"></div>
                    <div className="data-short">
                      <div className="data-degree-msg">
                        <p className="weather-degree">
                          {" "}
                          {`${WeatherData?.wind?.deg}°C`}
                        </p>
                        <p className="weather-msg">
                          {WeatherData?.weather?.[0].description}
                        </p>
                      </div>
                      <div className="country">
                        <div className="city-name">
                          {" "}
                          <p> {WeatherData?.name}</p>{" "}
                        </div>
                        <div className="city-name">
                          {" "}
                          <p> {WeatherData?.sys?.country}</p>{" "}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="weather-info">
                  <div className="item-1">
                    <div className="item">
                      <img src={wind} alt="" className="weather-icon" />
                      <div className="weather-details">

                      <p className="data-head">Wind Speed</p>

                      <p className="data-speed-data">{`${WeatherData?.wind?.speed} km/h`}</p>
                      </div>
                    </div>
                    <div className="item">
                      <img src={humidity} alt="" className="weather-icon" />
          <div className="weather-details">

                      <p className="data-head">Humidity</p>

                      <p className="data-speed-data">{`${WeatherData?.main?.humidity} %`}</p>
          </div>
                    </div>
                  </div>
                  <div className="item-1">
                    <div className="item">
                      <img src={pressure} alt=""  className="weather-icon"/>
                      <div className="weather-details">
                      <p className="data-head">Pressure</p>

                      <p className="data-speed-data">{`${WeatherData?.main?.pressure} hpa`}</p>
                      </div>
                    </div>
                    <div className="item">
                      <img src={visibility} alt="" className="weather-icon" />
                      <div className="weather-details">
                      <p className="data-head">Visibilty</p>

                      <p className="data-speed-data">{`${WeatherData?.visibility} m`}</p>
                      </div>
                    </div>
                  </div>
                  <div className="item-1">
                    <div className="item">
                      <img src={sunrise} alt="" className="weather-icon"/>
                      <div className="weather-details">
                      <p className="data-head">Sunrise</p>

                      <p className="data-speed-data">
                        {new Date(
                          WeatherData?.sys?.sunrise * 1000
                        ).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                      </div>
                    </div>
                    <div className="item">
                      <img src={sunset} alt="" className="weather-icon"/>
                      <div className="weather-details">
                      <p className="data-head">Sunset</p>

                      <p className="data-speed-data">{new Date(
                          WeatherData?.sys?.sunset * 1000
                        ).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}</p>

                    </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
     
      </div>
    </>
  );
};
