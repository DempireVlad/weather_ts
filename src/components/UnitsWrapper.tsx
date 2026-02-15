

type UnitsWrapperProps = {
  unitsOpen: boolean;
  setUnitsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  units: {
    temperature: "celsius" | "fahrenheit";
    windSpeed: "kmh" | "mph";
    precipitation: "mm" | "inch";
  };
  setUnits: React.Dispatch<React.SetStateAction<{
    temperature: "celsius" | "fahrenheit";
    windSpeed: "kmh" | "mph";
    precipitation: "mm" | "inch";
  }>>;
};


const UnitsWrapper = ({ unitsOpen, setUnitsOpen, units, setUnits }: UnitsWrapperProps) => {
    return(
       <header className="header">
        <div className="logo">
          <img src="/logo.svg" alt="logo" />
        </div> 
            <div className="units-wrapper">
          <button className="units" onClick={() => setUnitsOpen(!unitsOpen)}>
            Units
          </button>
          {unitsOpen && (
            <div className="units-dropdown">
              <div className="units-section">
                <p className="units-title">Temperature</p>
                <div className={`units-option ${units.temperature === "celsius" ? "active" : ""}`} onClick={() => setUnits({ ...units, temperature: "celsius" })}>
                  Celsius (°C)
                </div>
                <div className={`units-option ${units.temperature === "fahrenheit" ? "active" : ""}`} onClick={() => setUnits({ ...units, temperature: "fahrenheit" })}>
                  Fahrenheit (°F)
                </div>
              </div>

              <div className="units-section">
                <p className="units-title">Wind Speed</p>
                <div className={`units-option ${units.windSpeed === "kmh" ? "active" : ""}`} onClick={() => setUnits({ ...units, windSpeed: "kmh" })}>
                  km/h
                </div>
                <div className={`units-option ${units.windSpeed === "mph" ? "active" : ""}`} onClick={() => setUnits({ ...units, windSpeed: "mph" })}>
                  mph
                </div>
              </div>

              <div className="units-section">
                <p className="units-title">Precipitation</p>
                <div className={`units-option ${units.precipitation === "mm" ? "active" : ""}`} onClick={() => setUnits({ ...units, precipitation: "mm" })}>
                  Millimeters (mm)
                </div>
                <div className={`units-option ${units.precipitation === "inch" ? "active" : ""}`} onClick={() => setUnits({ ...units, precipitation: "inch" })}>
                  Inches (in)
                </div>
              </div>
            </div>
          )}
        </div>
        </header>
    )
}

export default UnitsWrapper;