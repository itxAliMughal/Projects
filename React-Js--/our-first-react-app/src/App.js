import { useState } from "react";
import "./App.css"; 
import DisplayCount from "./components/DisplayCount";
import ContactUs from "./components/ContactUs";


const tasks = [
  {
    name: "task one",
  },
  {
      name: "task one",
  },
  {
    name: "task one",
  },
  {
    name: "task one",
  },
  {
    name: "task one",
  },
  {
    name: "task one",
  },
];

function App() {

// Make variables

//  let count = 0;
 const [count, setCount] = useState(0);
 const [showThisElement, setShowThisElement] = useState(true);
 const [nameShow, setNameShow] = useState(true);

// Counting Add work

const incrementBtnHandler = () => {
 setCount(count + 1)
}

// Counting Remove work

const decrementBtnHandler = () => {
  setCount(count - 1)
}

// Counting minus me na jaye

if (count === -1) {
  // setCount(1)
  return <h1 style={{textAlign:"center"}}>Abay kia chah rha he<br/>Ab refresh kar</h1>
}

// Show heading work

const showBtnHandler = () => {
  setShowThisElement(true)
} 

// Hide heading work
 
const hideBtnHandler = () => {
  setShowThisElement(false)
} 

 return(
  <div className="App"> 
     <DisplayCount count={count} />
     <button className="button" onClick={incrementBtnHandler}>Increment</button> &nbsp;
     <button className="button2" onClick={decrementBtnHandler}>Decrement</button>
     <br />
    {showThisElement && <h1>Show Hide Element</h1>}
    <button className="button" onClick={showBtnHandler}>Show</button> &nbsp;
    <button className="button2" onClick={hideBtnHandler}>Hide</button> &nbsp;
    <button className="button" onClick={ () => {
      setShowThisElement(!showThisElement)
    }}>Toogle Button</button>

    {/* LISTING or LOOP */}
    {nameShow && tasks.map((singleTask,index) => {
      return <h2 key={index}>{singleTask.name}</h2>
    })} &nbsp;
    <button className="button" onClick={() => {
      setNameShow(!nameShow)
    }}>Show / Hide</button>

    <ContactUs  />

  </div>
 )
};

export default App;
