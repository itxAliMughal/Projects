import React from "react";

const BookList = (props) => {
  const {
    inputOneList, 
    inputTwoList,  
    inputThreeList,
    setInputOneList,
    setInputTwoList,
    setInputThreeList,
    handleDelete
  } = props;

  return (
    <table className="u-full-width">
      <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>ISBN</th>
          <th></th>
        </tr>
      </thead>
      <tbody id="book-list">
        {inputOneList.map((inputOneVal, index) => (
          <tr key={index}>
            <td>{inputOneVal}</td>
            <td>{inputTwoList[index]}</td>
            <td>{inputThreeList[index]}</td>
            <td><a href="#" className="delete" onClick={() => handleDelete(index)}>X</a></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BookList;
