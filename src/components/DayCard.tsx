type DayCardProps = {
  day: string;
  max: number;
  min: number;
  icon: string;
};

function DayCard({ day , max, min, icon }: DayCardProps) {
    return (
            <div className="day">
                <span className="day__name">{day}</span>
                <img
                  className="day__icon"
                  src={icon}
                  alt="weather icon"
                />
                <div className="day__temp">
                  <span className="day__temp__max">{max}°</span>
                  <span className="day__temp__min">{min}°</span>
                </div>
              </div>
    )
}

export default DayCard