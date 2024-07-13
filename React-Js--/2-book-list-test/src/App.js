import './App.css';
import BookFoam from './components/BookFoam/BookFoam';
import BookHeading from './components/BookHeading/BookHeading';
import BookList from './components/BookList/BookList';
import { useEffect, useState } from 'react';

const localStorageOneKey = "fieldOne";

export const setLocalStorageOneValues = (ArrayOne, Two) => {
  localStorage.setItem(localStorageOneKey, JSON.stringify(ArrayOne, Two));
};

export const getLocalStorageOneValues = () => {
  return JSON.parse(localStorage.getItem(localStorageOneKey));
};

const localStorageTwoKey = "fieldTwo";

export const setLocalStorageTwoValues = (ArrayOne, Two) => {
  localStorage.setItem(localStorageTwoKey, JSON.stringify(ArrayOne, Two));
};

export const getLocalStorageTwoValues = () => {
  return JSON.parse(localStorage.getItem(localStorageTwoKey));
};

const localStorageThreeKey = "fieldThree";

export const setLocalStorageThreeValues = (ArrayOne, Two) => {
  localStorage.setItem(localStorageThreeKey, JSON.stringify(ArrayOne, Two));
};

export const getLocalStorageThreeValues = () => {
  return JSON.parse(localStorage.getItem(localStorageThreeKey));
};

function App() {
  const [inputOne, setInputOne] = useState("");
  const [inputTwo, setInputTwo] = useState("");
  const [inputThree, setInputThree] = useState("");
  const [inputOneList, setInputOneList] = useState([]);
  const [inputTwoList, setInputTwoList] = useState([]);
  const [inputThreeList, setInputThreeList] = useState([]);

  useEffect(() => {
    setInputOneList(getLocalStorageOneValues);
    setInputTwoList(getLocalStorageTwoValues);
    setInputThreeList(getLocalStorageThreeValues);
  },[]);

  const handleDelete = (index) => {

    if (window.confirm("Are You Sure")) {
    const updatedInputOneList = [...inputOneList];
    const updatedInputTwoList = [...inputTwoList];
    const updatedInputThreeList = [...inputThreeList];

    updatedInputOneList.splice(index, 1);
    updatedInputTwoList.splice(index, 1);
    updatedInputThreeList.splice(index, 1);

    setInputOneList(updatedInputOneList);
    setInputTwoList(updatedInputTwoList);
    setInputThreeList(updatedInputThreeList);

    setLocalStorageOneValues(updatedInputOneList);
    setLocalStorageTwoValues(updatedInputTwoList);
    setLocalStorageThreeValues(updatedInputThreeList);
    };
  };

  return (
    <div className="container">
     {/* <div className="alert success">success alert</div>  */}
     {/* <div className="alert error">error alert</div>  */}

    <BookHeading />
    <BookFoam 
    inputOne={inputOne}
    setInputOne={setInputOne}
    inputTwo={inputTwo}
    setInputTwo={setInputTwo}
    inputThree={inputThree}
    setInputThree={setInputThree}
    inputOneList={inputOneList}
    setInputOneList={setInputOneList}
    inputTwoList={inputTwoList}
    setInputTwoList={setInputTwoList}
    inputThreeList={inputThreeList}
    setInputThreeList={setInputThreeList} />
    <BookList 
    inputOneList={inputOneList} 
    inputTwoList={inputTwoList} 
    inputThreeList={inputThreeList}
    handleDelete={handleDelete} 
    />
  </div>
  );
};

export default App;
