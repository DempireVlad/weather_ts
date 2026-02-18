import React, { createContext, useContext, useState,  } from "react";

export type Units = {
  temperature: "celsius" | "fahrenheit";
  windSpeed: "kmh" | "mph";
  precipitation: "mm" | "inch";
};


type WeatherData = {
  current: {
    apparent_temperature: number;
    precipitation: number;
    relative_humidity_2m: number;
    temperature_2m: number;
    weather_code: number;
    time: string;
    wind_speed_10m: number;
  };
  current_units: {
    apparent_temperature: string;
    precipitation: string;
    relative_humidity_2m: string;
    temperature_2m: string;
    wind_speed_10m: string;
  }
  hourly: {
    time: string[];
    temperature_2m: number[];
    weather_code: number[];
  };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    weather_code: number[];
  };
};


interface WeatherContextType {
  units: Units;
  setUnits: React.Dispatch<React.SetStateAction<Units>>;
  error: string | null;                              
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  weather: WeatherData | null;
  setWeather: React.Dispatch<React.SetStateAction<WeatherData | null>>;
  fetchWeatherData: (lat: number, lon: number) => Promise<WeatherData | null>;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const WeatherProvider = ({ children }: { children: React.ReactNode }) => {
  const [error, setError] = useState<string | null>(null);
 
  const [units, setUnits] = useState<Units>({
    temperature: "celsius",
    windSpeed: "kmh",
    precipitation: "mm",
  });


   const [weather, setWeather] = useState<WeatherData | null>(null);

 const fetchWeatherData = async (lat: number, lon: number) => {
    setError(null);
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,apparent_temperature,precipitation,relative_humidity_2m,wind_speed_10m,weather_code&hourly=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min,weather_code&temperature_unit=${units.temperature}&wind_speed_unit=${units.windSpeed}&precipitation_unit=${units.precipitation}&timezone=auto`,
      );
      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }
      const data: WeatherData = await response.json();
      return data;
    } catch (error) {
      setError("Something went wrong. Please try again later.");
      return null;
    }
  };

  return (
    <WeatherContext.Provider value={{ 
      units, 
      setUnits, 
      error,    
      setError,
      weather,
      setWeather,
      fetchWeatherData
    }}>
      {children}
    </WeatherContext.Provider>
  );
};


export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error("useWeather must be used within a WeatherProvider");
  }
  return context;
};