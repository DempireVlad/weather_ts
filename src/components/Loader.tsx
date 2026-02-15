import { BarLoader } from "react-spinners";
 type LoaderProps = {
  message?: string;
};
function Loader({ message }: LoaderProps) {
  return (
    <div className="loader-wrapper">
      <p>{message || "Waiting weather data..."}</p>
      <BarLoader 
        color="#36d7b7" 
        height={5} 
        width={200} 
        speedMultiplier={1.5}
      />
    </div>
  );
}

export default Loader;