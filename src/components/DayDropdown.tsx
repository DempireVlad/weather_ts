type DayDropdownProps = {
  dayChecked: string
  setDayChecked: React.Dispatch<React.SetStateAction<string>>
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  days: string[]
}

const DayDropdown = ({ dayChecked , setDayChecked, isOpen, setIsOpen, days }: DayDropdownProps) => {
  const todayName = new Date().toLocaleDateString("en-US", { weekday: "long" });
  return (
    <div className="dropdown">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="dropdown__button"
      >
        {dayChecked === todayName ? "Today" : dayChecked}
        <span className="dropdown__icon"></span>
      </button>

      {isOpen && (
        <ul className="dropdown__list">
          {days.map((day: string) => (
            <li
              key={day}
              className={`dropdown__item ${
                dayChecked === day ? "checked" : ""
              }`}
              onClick={() => {
                setDayChecked(day);
                setIsOpen(false);
              }}
            >
              {day === todayName ? "Today" : day}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DayDropdown;
