import * as React from 'react';

export const Error = () => {
  return (
    <div className="error">
      <h1 className="error-text">
        Failed to fetch data. Click the button or refresh the page to try again.
      </h1>
      <button className="error-button" onClick={location.reload()}>
        Try again
      </button>
    </div>
  );
};
