import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import FrontnedLayout from "./Pages/Layout/FrontnedLayout";
import { QueryClient, QueryClientProvider } from "react-query";
import Home from "./Pages/Home";
import { AUTHENTICATED_ROUTES } from "./uttils/constant";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import ShopStore from "./Pages/ShopStore";
import { useState } from "react";
import ProductDetail from "./Pages/ProductDetail";
import Cart from "./Pages/Cart";
import CheckOut from "./Pages/CheckOut";
import SearchDetail from "./Pages/SearchDetail";
import AddProduct from "./Pages/AddProduct";
import MyStore from "./Pages/MyStore";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnmount: false,
      refetchOnReconnect: false,
      retry: 0,
      staleTime: 5 * 1000, //cache expiry time
    },
  },
});

function App() {
  const products = [
    {
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZnVybml0dXJlfGVufDB8fDB8fHww",
      name: "ComfortCove",
      discription:
        "Unwind in style with our ComfortCove sofa, featuring plush cushions, sturdy legs, and a sleek design perfect for lounging.",
      price: 1299,
      discountedPrice: "-$2,139",
    },
    {
      image:
        "data:image/jpeg;base64,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",
      name: "RelaxationStation",
      discription:
        "Find your happy place on our RelaxationStation sofa, featuring extra-soft cushions, a sturdy wooden frame, and a comfortable design for ultimate relaxation.",
      price: 2099,
      discountedPrice: "-$2,179",
    },
    {
      image:
        "data:image/jpeg;base64,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",
      name: "DreamHaven",
      discription:
        "Indulge in the ultimate sleeping experience with our luxurious DreamHaven bed, featuring a sturdy wooden frame and plush mattress.",
      price: 1799,
      discountedPrice: "-$2,229",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQR_4gULrUanzN4ayaMgxdNCMMdcD7y4g0XZg&usqp=CAU",
      name: "LaunchLounge",
      discription:
        "Blast off into comfort with our LaunchLounge sofa, featuring out-of-this-world cushioning, a sturdy metal frame, and a sleek design perfect for lounging.",
      price: 1499,
      discountedPrice: "-$1,799",
    },
    {
      image:
        "https://png.pngtree.com/thumb_back/fh260/background/20231001/pngtree-a-3d-rendering-of-the-luxurious-hotel-bedroom-interior-image_13572681.png",
      name: "MajestyMattress",
      discription:
        "Sleep like royalty on our majestic MajestyMattress, featuring a luxurious king-size frame, extra-plush mattress, and sturdy wooden legs for ultimate comfort.",
      price: 2499,
      discountedPrice: "-$2,839",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOvW0JnZKDBTSOkeMmMVoRekLlPadil5JlSTRjoirzst7H0131Z9c3yEvbKY5-6khdVV0&usqp=CAU",
      name: "SerenitySleep",
      discription:
        "Drift off to dreamland in peace with our SerenitySleep bed, featuring a sturdy wooden frame, ultra-comfortable mattress, and a soothing design for a restful night's sleep.",
      price: 1799,
      discountedPrice: "-$2,279",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpIyH0tlBhKJuoTbh3XzEqIOA0ZyIG1OhScw&usqp=CAU",
      name: "CornerComfort",
      discription:
        "Relax in style with our CornerComfort L-sofa, featuring plush cushions, a sturdy metal frame, and a sleek design perfect for cozying up in the corner of your living room.",
      price: 1699,
      discountedPrice: "-$2,139",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzQefCqPfi1pXbS-P4mvigOBPMUqIqYq2fmw&usqp=CAU",
      name: "SoloSerenade",
      discription:
        "Unwind in comfort with our SoloSerenade single sofa, featuring a sturdy wooden frame, plush cushioning, and a sleek design perfect for relaxing alone.",
      price: 899,
      discountedPrice: "-$1199",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwnjqdbXIpTMtENrCuac8budU20o7n0ZoVOg&usqp=CAU",
      name: "DuoDelight",
      discription:
        "Share the comfort with our DuoDelight double sofa, featuring a sturdy metal frame, extra-plush cushions, and a sleek design perfect for lounging with a friend or loved one.",
      price: 1399,
      discountedPrice: "-$1,669",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIebRmDAhMKng58SQNKBZtEAD2-YYa_AMzcQ&usqp=CAU",
      name: "CozyCorner",
      discription:
        "Create a warm and inviting atmosphere with our CozyCorner chair and table set, featuring a comfortable armchair, a sturdy wooden table, and a charming design perfect for reading, relaxing, or enjoying a cup of coffee.",
      price: 499,
      discountedPrice: "-$699",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCDzqDsC4clZIfihezuUSoYK0G402XQwQwVw&usqp=CAU",
      name: "MiniMate",
      discription:
        "Snuggle up in our MiniMate half sofa, featuring a compact design, plush cushioning, and a sturdy metal frame perfect for small spaces or cozy nooks.",
      price: 599,
      discountedPrice: "-$897",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB3dQzmj9k04sBdLEcOHtHzbhP0cCVG0E3_w&usqp=CAU",
      name: "CozyCouple",
      discription:
        "Share the comfort with our CozyCouple half-full sofa, featuring a sturdy wooden frame, extra-plush cushions, and a sleek design perfect for snuggling up with a loved one.",
      price: 999,
      discountedPrice: "-$1085",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShK6CAeWL-W7IF-RDd3PmyqBxidpnZvyScIw&usqp=CAU",
      name: "ProductivityPro",
      discription:
        "Boost your productivity with our ProductivityPro office table and chair set, featuring a sturdy wooden desk, a comfortable ergonomic chair, and a sleek design perfect for focusing on your work.",
      price: 899,
      discountedPrice: "-$1299",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqhSVj2b2V4azIN1-CeHoPKAqaYZTLwtWq7pNvLA752CgHVTJPiKKcptnOIFsZQmuF-2s&usqp=CAU",
      name: "SnowflakeSofa",
      discription:
        "Make a statement with our SnowflakeSofa, a luxurious white sofa featuring extra-plush cushioning, a sturdy metal frame, and a sleek design perfect for a modern living room.",
      price: 2299,
      discountedPrice: "-$3000",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQE6M-l7i35nd1y-XeFhvFL1Y7iY3QI6R8pfg&usqp=CAU",
      name: "RoyalRepose",
      discription:
        "Indulge in the ultimate comfort experience with our RoyalRepose single luxury sofa, featuring premium leather upholstery, a sturdy wooden frame, and plush cushioning for the epitome of relaxation.",
      price: 1999,
      discountedPrice: "-$2,295",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKdbEAUz80PPJb2S0o2kdTC1GUQePGQYtrPQ&usqp=CAU",
      name: "SlumberSingle",
      discription:
        "Get a restful night's sleep with our SlumberSingle bed, featuring a sturdy metal frame, a comfortable mattress, and a sleek design perfect for a cozy bedroom.",
      price: 499,
      discountedPrice: "-$692",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQqO3q1HQKAfGR8aWCG1TbtDSVR0nr92MQzw&usqp=CAU",
      name: "FeastAndLounge",
      discription:
        "Elevate your dining experience with our FeastAndLounge sofa set, featuring a plush sofa, two accent chairs, and a sturdy wooden table perfect for comfortable dining and conversation.",
      price: 1499,
      discountedPrice: "-$ 1,819",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdoHPA19hFqI078sude2iy29YgwSI4g4BY6A&usqp=CAU",
      name: "OpulenceOasis",
      discription:
        " Indulge in the ultimate luxury experience with our OpulenceOasis sofa set, featuring a plush sectional sofa, two accent chairs, and a sleek coffee table perfect for a sophisticated living room.",
      price: 3999,
      discountedPrice: "-$ 4,899",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcYYtVA3-52_IHYw4Q82aNdMg5pwXTOY7wDQ&usqp=CAU",
      name: "CozyCorner",
      discription:
        "Create a warm and inviting atmosphere with our CozyCorner sofa set, featuring a comfortable two-seater sofa, a matching armchair, and a compact coffee table perfect for a cozy living room.",
      price: 999,
      discountedPrice: "-$1299",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjEeaUzocTKDM6R0v_e0LgpH7f8Eghhn0VSA&usqp=CAU",
      name: "MajesticOak",
      discription:
        "Make a statement with our MajesticOak luxury table, featuring a stunning solid oak wood top, sleek metal legs, and a rich finish perfect for a sophisticated dining room or executive office.",
      price: 2499,
      discountedPrice: "-$2,999",
    },
    {
      image:
        "data:image/jpeg;base64,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",
      name: "RegalRelax",
      discription:
        " Indulge in the ultimate comfort experience with our RegalRelax single luxury sofa, featuring premium leather upholstery, a sturdy wooden frame, and plush cushioning perfect for relaxation and rejuvenation.",
      price: 1699,
      discountedPrice: "-$1,851",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRceL19PyoH-HYfV7VqV44YmsheRJQdJV5j1Q&usqp=CAU",
      name: "DiningDelight",
      discription:
        "Create a warm and inviting dining space with our DiningDelight table and chair set, featuring a sturdy wooden table, four comfortable chairs, and a sleek design perfect for family meals and social gatherings.",
      price: 1299,
      discountedPrice: "-$1,569",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpsYpRxrXvvUpKgj5m3FjEgFgn3akO3oGUSA&usqp=CAU",
      name: "ComfortCube",
      discription:
        "Relax in style with our ComfortCube simple sofa, featuring a sturdy metal frame, comfortable cushioning, and a sleek design perfect for a cozy living room or apartment.",
      price: 699,
      discountedPrice: "-$1699",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwm8lKMfieI-s456ku2vGo6vOaLb7BPi2aeQ&usqp=CAU",
      name: "CircleOfComfort",
      discription:
        "Create a cozy and inviting atmosphere with our CircleOfComfort circle sofas, featuring a sturdy metal frame, comfortable cushioning, and a unique circular design perfect for a modern living room or lounge.",
      price: 1299,
      discountedPrice: "-$2,299",
    },
    {
      image:
        "data:image/jpeg;base64,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",
      name: "FeastFusion",
      discription:
        "Elevate your dining experience with our FeastFusion dinner set, featuring a stylish table, four comfortable chairs, and a modern design perfect for family meals and social gatherings.",
      price: 1199,
      discountedPrice: "-$2,234",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5yKaChokXJ9Qtwpy5ScS-MsdqNNet94_B-Q&usqp=CAU",
      name: "DuoDelight",
      discription:
        "Add a touch of comfort and style to your home with our DuoDelight two-chair set, featuring two plush armchairs with sturdy metal frames and high-quality PU leather upholstery.",
      price: 499,
      discountedPrice: "-$899",
    },
    {
      image:
        "data:image/jpeg;base64,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",
      name: "CoffeeCube",
      discription:
        "Add a touch of modern simplicity to your living room with our CoffeeCube simple coffee table, featuring a sturdy metal frame, a compact design, and a sleek glass top.",
      price: 299,
      discountedPrice: "-$479",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRP0Qb0L4nDc5p6dnYjQLbzNJmNwPGxxF9aA&usqp=CAU",
      name: "SquareStyle",
      discription:
        "Add a touch of modern elegance to your home with our SquareStyle square table, featuring a sturdy metal frame, a spacious square top, and a sleek design perfect for dining, working, or socializing.",
      price: 399,
      discountedPrice: "-$568",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTccxOEHiopzifwb2gMQFAn6wBZuHIKBI8a0g&usqp=CAU",
      name: "SimpleSpace",
      discription:
        "Add a touch of minimalism to your home with our SimpleSpace simple table, featuring a sturdy metal frame, a compact design, and a sleek wood or glass top.",
      price: 149,
      discountedPrice: "-$228",
    },
    {
      image:
        "data:image/jpeg;base64,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",
      name: "Almirah luxury",
      discription:
        "Almirah is known for its elegant, classic, and high-quality products ¹.",
      price: 2640,
      discountedPrice: "-$3,110",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIoi-liErS4Fi557g16UIsPo0yN1pK8-HYhw&usqp=CAU",
      name: "ExecutiveDesk",
      discription:
        "A large and impressive table perfect for meetings, conferences, and social gatherings, featuring a sturdy metal frame, a spacious work surface, and a sleek design.",
      price: 999,
      discountedPrice: "-$1,131",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKTiVhVAOkitTot7nJW3jV6idKuS53aomJNQ&usqp=CAU",
      name: "RoyaleChair",
      discription:
        "Indulge in the ultimate comfort and style with our RoyaleChair, featuring",
      price: 799,
      discountedPrice: "-$929",
    },
    {
      image:
        "data:image/jpeg;base64,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",
      name: "FeastFusion",
      discription:
        "Elevate your dining experience with our FeastFusion dining set, featuring.",
      price: 1299,
      discountedPrice: "-$ 2,199",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIFAgoLRlVJyL-QW_06458g2O2XExSeYiMww&usqp=CAU",
      name: "BistroSet",
      discription:
        "Create a cozy and inviting atmosphere with our BistroSet, featuring.",
      price: 499,
      discountedPrice: "-$714",
    },
  ];

  const [pickData, setPickData] = useState(null);
  const [cart, setCart] = useState([]);
  const [storeProducts, setStoreProducts] = useState([]);

  const pickDataHandler = (data) => {
    setPickData(data);
    setCart([...cart, { ...data, quantity: 1 }]);
  };

  const pickDataCustomHandler = (data) => {
    setPickData(data);
  };

  const setCartHandler = (cartLength) => {
    setCart(cartLength);
  };

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route element={<FrontnedLayout count={cart.length} cart={cart} />}>
              <Route
                path={AUTHENTICATED_ROUTES.HOME}
                element={
                  <Home
                    products={products}
                    pickDataHandler={pickDataHandler}
                    pickDataCustomHandler={pickDataCustomHandler}
                  />
                }
              />
              <Route path={AUTHENTICATED_ROUTES.ABOUT} element={<About />} />
              <Route
                path={AUTHENTICATED_ROUTES.SHOP_STORE}
                element={
                  <ShopStore
                    products={products}
                    pickDataHandler={pickDataHandler}
                    pickDataCustomHandler={pickDataCustomHandler}
                  />
                }
              />
              <Route
                path={AUTHENTICATED_ROUTES.CONTACT}
                element={<Contact />}
              />
              <Route
                path={AUTHENTICATED_ROUTES.PRODUCT_DETAIL}
                element={
                  <ProductDetail
                    pickData={pickData}
                    pickDataHandler={pickDataHandler}
                  />
                }
              />
              <Route
                path={AUTHENTICATED_ROUTES.CART}
                element={<Cart cart={cart} setCartHandler={setCartHandler} />}
              />
              <Route
                path={AUTHENTICATED_ROUTES.CHECK_OUT}
                element={<CheckOut />}
              />
              <Route
                path={AUTHENTICATED_ROUTES.SEARCH}
                element={
                  <SearchDetail
                    products={products}
                    pickData={pickData}
                    pickDataHandler={pickDataHandler}
                  />
                }
              />
              <Route
                path={AUTHENTICATED_ROUTES.ADD_PRODUCT}
                element={
                  <AddProduct
                    storeProducts={storeProducts}
                    setStoreProducts={setStoreProducts}
                  />
                }
              />
              <Route
                path={AUTHENTICATED_ROUTES.MY_STORE}
                element={
                  <MyStore
                    storeProducts={storeProducts}
                    pickDataCustomHandler={pickDataCustomHandler}
                    setStoreProducts={setStoreProducts}
                  />
                }
              />
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default App;
