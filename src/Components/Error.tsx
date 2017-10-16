import * as React from 'react';

export const Error = () => {
  return (
    <div className="error">
      <h1 className="error-text">
        Fetching data. Click the button or refresh the page if it's taking too
        long.
      </h1>
      <button className="error-button" onClick={() => location.reload()}>
        Try again
      </button>
    </div>
  );
};
