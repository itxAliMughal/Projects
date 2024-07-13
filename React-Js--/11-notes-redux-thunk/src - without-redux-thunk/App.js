import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import CustomLayout from "./components/CustomLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<CustomLayout />}>
          <Route path="/" element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
