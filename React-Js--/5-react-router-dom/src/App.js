import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Anonymous from "./Pages/Anonymous";
import CustomLayout from "./components/CustomLayout";
import ContactUs from "./Pages/ContactUs";
import Login from "./Pages/Login";
import { useState } from "react";
import Product from "./Pages/Product";
import CustomLayout2 from "./components/CustomLayout2";
import ProductDetails from "./Pages/ProductDetails";
import Back from "./Pages/Back";

function App() {
  const [isUserLogin, setIsUserLogin] = useState(false);
  return (
    <BrowserRouter>
      <Routes>
        {isUserLogin ? (
          <>
            <Route element={<CustomLayout setIsUserLogin={setIsUserLogin} />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/products" element={<Product />} />
            </Route>

            <Route element={<CustomLayout2 setIsUserLogin={setIsUserLogin} />}>
              <Route path="/products/:productId" element={<ProductDetails />} />
            </Route>
          </>
        ) : (
          <Route
            path="/"
            element={
              <Login
                isUserLogin={isUserLogin}
                setIsUserLogin={setIsUserLogin}
              />
            }
          />
        )}
        <Route path="*" element={<Back />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
