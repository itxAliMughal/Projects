import React from "react";
import { setLocalStorageOneValues, setLocalStorageThreeValues, setLocalStorageTwoValues } from "../../App";

const BookFoam = (props) => {
  const {
    inputOne,
    setInputOne,
    inputTwo, 
    setInputTwo, 
    inputThree, 
    setInputThree, 
    inputOneList, 
    setInputOneList, 
    inputTwoList, 
    setInputTwoList, 
    inputThreeList, 
    setInputThreeList 
  } = props;

    const bookInputOneHandler = (event) => {
        event.preventDefault();
        setInputOne(event.target.value)
        // console.log(inputOne);
    };
    
    const bookInputTwoHandler = (event) => {
        event.preventDefault();
        setInputTwo(event.target.value)
        // console.log(inputTwo);
    };

    const bookInputThreeHandler = (event) => {
        event.preventDefault();
        setInputThree(event.target.value)
        // console.log(inputThree);
    };

    const bookSubmitHandler = (event) => {
        event.preventDefault();
        if (!inputOne || !inputTwo || !inputThree) {
            alert("please fill input fields");
            return;
        };

        const bookListOneTemp = [...inputOneList];
        bookListOneTemp.push(inputOne);
        setInputOneList(bookListOneTemp);       
        console.log(bookListOneTemp, "bookListOneTemp");
        setLocalStorageOneValues(bookListOneTemp);  

        const bookListTwoTemp = [...inputTwoList];
        bookListTwoTemp.push(inputTwo);
        setInputTwoList(bookListTwoTemp);
        console.log(bookListTwoTemp, "bookListTwoTemp");
        setLocalStorageTwoValues(bookListTwoTemp);

        const bookListThreeTemp = [...inputThreeList];
        bookListThreeTemp.push(inputThree);
        setInputThreeList(bookListThreeTemp);
        console.log(bookListThreeTemp, "bookListThreeTemp");
        setLocalStorageThreeValues(bookListThreeTemp);

        setInputOne("");
        setInputTwo("");
        setInputThree("");

    };

    return (
        <form id="book-form" onSubmit={bookSubmitHandler} >
      <div>
        <label>Title</label>
        <input type="text" id="title" className="u-full-width" onChange={bookInputOneHandler} value={inputOne} />
      </div>
      <div>
        <label>Author</label>
        <input type="text" id="author" className="u-full-width" onChange={bookInputTwoHandler} value={inputTwo} />
      </div>
      <div>
        <label>ISBN#</label>
        <input type="number" id="isbn" className="u-full-width" onChange={bookInputThreeHandler} value={inputThree} />
      </div>
      <div>
        <input type="submit" value="Submit" className="u-full-width" />
      </div>
    </form>
    );
};

export default BookFoam;