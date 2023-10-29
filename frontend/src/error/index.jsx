// https://kentcdodds.com/blog/use-react-error-boundary-to-handle-errors-in-react
export default function ErrorFallback({ error }) {
  return (
    <div role="alert">
      <p>Algo ha ido mal:</p>
      <pre style={{ color: 'red' }}>{error.message}</pre>
    </div>
  );
}
const crud = (
  <ErrorBoundary
    fallbackRender={({ error, resetErrorBoundary }) => (
      <div role="alert">
        <div>Oh no</div>
        <pre>{error.message}</pre>
        <button
          onClick={() => {
            // this next line is why the fallbackRender is useful
            resetComponentState();
            // though you could accomplish this with a combination
            // of the FallbackCallback and onReset props as well.
            resetErrorBoundary();
          }}
        >
          Volver a intentar
        </button>
      </div>
    )}
  >
    <ComponentThatMayError />
  </ErrorBoundary>
);
