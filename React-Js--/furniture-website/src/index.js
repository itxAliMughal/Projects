import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Spin } from "antd";

function RootComponent() {
  const [furnitureLoader, setFurnitureLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFurnitureLoader(false);
    }, 2000);
    return () => clearTimeout(timer); // Clean up the timer on unmount
  }, []);

  return (
    <Spin spinning={furnitureLoader}>
      <App />
    </Spin>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RootComponent />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
