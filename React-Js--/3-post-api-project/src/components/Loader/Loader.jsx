import React from "react";

function Loader({ loader }) {
  return (
    loader && (
      <div className="loader-container">
        <div className="spinner"></div>
      </div>
    )
  );
}

export default Loader;
