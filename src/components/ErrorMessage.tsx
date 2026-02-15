
type ErrorMessageProps = {
  message: string;
};

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <div className="error-screen">
      <h2>Oops! ⛈️</h2>
      <p>{message}</p>
      <button onClick={() => window.location.reload()}>Try again</button>
    </div>
  );
};

export default ErrorMessage;