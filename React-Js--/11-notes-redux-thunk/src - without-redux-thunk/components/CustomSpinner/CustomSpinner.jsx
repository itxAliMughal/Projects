import React from "react";
import "./CustomSpinner.css";

function CustomSpinner(props) {
  const { loading = false } = props;
  if (!loading) {
    return null;
  }
  return (
    <div className="loader-container">
      <div className="spinner"></div>
    </div>
  );
}
export default CustomSpinner;
