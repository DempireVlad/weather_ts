
type HeroProps = {
  city: string;
  setCity: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: (e?: React.KeyboardEvent<HTMLInputElement>) => void;
};

const Hero = ({ city, setCity, handleSearch }: HeroProps) => {
  return (
    <section className="hero">
      <h1 className="hero__title">How’s the sky looking today?</h1>
      <div className="search">
        <input
          type="text"
          className="search__input"
          placeholder="Search for a place..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch(e);
            }
          }}
        />
        <button type="submit" className="search__button" onClick={() => handleSearch()}>
          Search
        </button>
      </div>
    </section>
  );
};

export default Hero;