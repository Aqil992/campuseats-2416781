export function Loading() {
  return <p>Loading vendors...</p>;
}

export function ErrorMessage({ message, onRetry }) {
  return (
    <div>
      <p>Error loading vendors: {message}</p>
      <button onClick={onRetry}>Try Again</button>
    </div>
  );
}
