import { useState, useEffect, useMemo } from "react";
import "./App.css";
import DayCard from "./components/DayCard";
import { getWeatherIcon } from "./weatherIcons";
import HourCard from "./components/HourCard";
import DayDropdown from "./components/DayDropdown";
import Stats from "./components/Stats";
import UnitsWrapper from "./components/UnitsWrapper";
import ErrorMessage from "./components/ErrorMessage";
import Loader from "./components/Loader";
import Hero from "./components/Hero";
import { useWeather } from "./context/WeatherContext";


const getLongDay = (d: string) =>
  new Date(d).toLocaleDateString("en-US", { weekday: "long" });
function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [unitsOpen, setUnitsOpen] = useState(false);
  const { units, setUnits, error, setError, weather, setWeather, fetchWeatherData } = useWeather();
  const [dayChecked, setDayChecked] = useState(getLongDay(new Date().toISOString()));
  const [city, setCity] = useState("");
  const [locationName, setLocationName] = useState("Berlin, DE");

  const getDayName = (date: string) =>
    new Date(date)
      .toLocaleDateString("en-US", { weekday: "short" })
      .toUpperCase();

  const filteredHourlyData = useMemo(() => {
    if (!weather || !weather.hourly) return [];
    return weather.hourly.time.reduce((acc, time, index) => {
      const dayName = getLongDay(new Date(time).toISOString());
      if (dayName === dayChecked) {
        acc.push({
          time: time,
          temp: weather.hourly.temperature_2m[index],
          weatherCode: weather.hourly.weather_code[index],
        });
      }
      return acc;
    }, [] as { time: string; temp: number; weatherCode: number }[]);
  }, [weather, dayChecked]);

  useEffect(() => {
    const getDefaultWeather = async () => {
      try {
        const data = await fetchWeatherData(52.52, 13.41);
        setWeather(data);
      } catch (error) {
        console.log("Error:", error);
      }
    };
    getDefaultWeather();
  }, [units]);

  const handleSearch = async () => {
    if (!city) return;
    try {
      const geoResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`,
      );
      const geoData = await geoResponse.json();

      if (geoData.results) {
        const { latitude, longitude } = geoData.results[0];
        setLocationName(
          `${geoData.results[0].name}, ${geoData.results[0].country}`,
        );
        const data = await fetchWeatherData(latitude, longitude);
        setWeather(data);
      }
    } catch (error) {
      console.log("Search error:", error);
      setError((error as Error).message);
    }
  };

  console.log(weather);
  

  const availableDays = useMemo(() => {
    if (!weather?.daily?.time) return [];
    return weather.daily.time.map((dateStr) => getLongDay(new Date(dateStr).toISOString()));
  }, [weather]);

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!weather) {
    return <Loader />;
  }

  return (
    <div className="app">
      <UnitsWrapper
        unitsOpen={unitsOpen}
        setUnitsOpen={setUnitsOpen}
        units={units}
        setUnits={setUnits}
      />

      <Hero city={city} setCity={setCity} handleSearch={handleSearch} />

      <main className="content">
        <section className="left">
          <div className="current">
            <div className="current__info">
              <p className="current__location">{locationName}</p>
              <p className="current__date">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>

            <div className="current__temp">
              <img
                src={getWeatherIcon(weather.current.weather_code)}
                alt="weather icon"
              />
              <span>{weather.current.temperature_2m}°</span>
            </div>
          </div>
          <Stats weather={weather} />
          <div className="daily">
            <h3 >Daily forecast</h3>
            <div className="daily__list">
              {weather.daily.time.map((day, index) => (
                <DayCard
                  key={index}
                  day={getDayName(day)}
                  max={weather.daily.temperature_2m_max[index]}
                  min={weather.daily.temperature_2m_min[index]}
                  icon={getWeatherIcon(weather.daily.weather_code[index])}
                />
              ))}
            </div>
          </div>
        </section>
        <div className="hourly">
          <div className="hourly__header">
            <h3>Hourly forecast</h3>
            <DayDropdown
              days={availableDays}
              dayChecked={dayChecked}
              setDayChecked={setDayChecked}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            />
          </div>
          <div className="hourly__list">
            {filteredHourlyData.map((hour, index) => (
              <HourCard
                key={index}
                time={new Date(hour.time).toLocaleTimeString("en-US", {
                  hour: "numeric",
                  hour12: true,
                })}
                temp={hour.temp}
                icon={getWeatherIcon(hour.weatherCode)}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
