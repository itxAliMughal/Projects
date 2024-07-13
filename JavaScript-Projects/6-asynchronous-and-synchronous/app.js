//Syncronous = execute code line by line
// console.log("html css");
// console.log("js");
// asdasdasdasd;
// console.log("react js");
// console.log("react native");

//asynchronous programming
//we have to wait some thing in code
// console.log("html css");
// console.log("js");
// setTimeout(function () {
//   asdasdasdasd;
// }, 0);
// console.log("react js");
// console.log("react native");

//is js is asyncronous by default ?
//answer is no

//thread
//javascript is single thread
//multi threading task is posible in javascript

//Event Loop

//chrome = v8 engine
//internet explorer = chakra engine
//firefox = spidermonkey

//v8 engine is compiler (translator)

//binary code = 0101010101010101

//how we can convert our normal syncrhronous code to asynchronous
//we have three methdos for that

// 1-Callback (Web Api Callback)
// 2-Promise
// 3-Async Await

//1- Callback example

// setTimeout(function () {        // is k apne jo builton functions jo hote hen native code wale
//   console.log("asdasdasd");
// }, 0);

//2-Promise

// const doSomething = new Promise(function (resolve, reject) {
//   const success = 1;
//   if (success == 0) {
//     resolve("your code is resolved!");
//   } else {
//     reject("your code is rejected!");
//   }
// });

// console.log(doSomething, "doSomething");

//resolve wali chiz then me ayegi
//reject wali chiz catch me ayegi

// doSomething
//   .then(function (firstParam) {
//     console.log(firstParam, "firstParam");
//   })
//   .catch(function (error) {
//     console.log(error, "error");
//   });

//fetch is builtin method in javascript and it is used for api
//and fetch is promise
//return karne bad ek or then lagasakte ho

fetch("https://jsonplaceholder.typicode.com/todos")
  .then(function (resolveParam) {
    // console.log(resolveParam, "resolveParam");
    return resolveParam.json();
  })
  .then(function (joReturnKarayaHaiWoData) {
    console.log(joReturnKarayaHaiWoData, "joReturnKarayaHaiWoData");
  })
  .catch(function (rejectParam) {
    console.log(rejectParam, "rejectParam");
  });

//3. Async Await

//you can handle multiple promises from async await method

const getTodosData = function () {
  //you are returning the promise
  return (
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then(function (resolve) {
        return resolve.json();
      })
      //chaining in promise
      .then(function (resolve) {
        return resolve;
      })
      .catch(function (reject) {
        console.log(reject);
      })
  );
};

const doSomethingAsyncMethod = async function () {
  const dataOne = await getTodosData(); // await ka matlab wait karo jab tak promise resolve nai hojata
  const dataTwo = await getTodosData();
  const dataThree = await getTodosData();
  console.log(dataOne, "dataOne async method");
  console.log(dataTwo, "dataTwo async method");
  console.log(dataThree, "dataThree async method");
};
doSomethingAsyncMethod();

//Another Topic
//Arrow Function

// Arrow function k andar .this work nhi karta main point

hello = function () {
  return "Hello World!";
};

hello = () => {
  return "Hello World!";
};

// Arrow Functions Return Value by Default:
hello = () => "Hello World!";

// Arrow Function Without Parentheses if you have only one param:
hello = (val) => "Hello " + val;
// hello = val => "Hello " + val;

// hello('asdadasd')
// arrow function

//Types of Promises

// Promise.all
// Promise.allSettled
// Promise.race
// Promise.any

//Promise all
//it will wait for all promises and if any one of promise is
//reject it will reject the whole promise
// () => {} = function (){}

Promise.all([
  new Promise(function (resolve) {
    setTimeout(() => resolve(1), 3000);
  }), // 1
  new Promise((resolve) => setTimeout(() => resolve(2), 2000)), // 2
  new Promise((resolve) => setTimeout(() => resolve(3), 1000)), // 3
])
  .then(function (resolve) {
    // alert(resolve);
  })
  .catch(function (error) {
    console.log(error, "error");
  }); // 1,2,3 when promises are ready: each promise
//contributes an array member

//Promise.allSettled
//it will not reject the whole promise if anyone promise is rejected
Promise.allSettled([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
  new Promise((resolve, reject) =>
    setTimeout(() => reject(new Error("Whoops!")), 2000)
  ),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000)),
])
  .then((resolve) => console.log(resolve))
  .catch(alert); // Error: Whoops!

//Promise.race
//phle aye phle payye

//jo phle resolve hua hai wuhi ayega

//it will not reject other promises

Promise.race([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
  new Promise((resolve, reject) =>
    setTimeout(() => reject(new Error("Whoops!")), 2000)
  ),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000)),
]).then(alert); // 1

//Promise.any
//it will resolve first promise and reject other promises (return promise resolve)

Promise.any([
  new Promise((resolve, reject) =>
    setTimeout(() => reject(new Error("Whoops!")), 1000)
  ),
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 2000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000)),
]).then(alert); // 1

// JSON VS XML
// Both are format and use send & recieve data asyncronusly

// JSON Example
// {
//   "employees":[
//       { "firstName":"John", "lastName":"Doe" },
//       { "firstName":"Anna", "lastName":"Smith" },
//       { "firstName":"Peter", "lastName":"Jones" }
//   ]
// }

// XML Example
{
  /* <employees>
  <employee>
   <lastName>Doe</lastName  <firstName>John</firstName>Name>
  </employee>
  <employee>
    <firstName>Anna</firstName> <lastName>Smith</lastName>
  </employee>
  <employee>
    <firstName>Peter</firstName> <lastName>Jones</lastName>
  </employee>
</employees> */
}

// AJAX STANDS FOR Asynchronous Javascript AND Xml
// Set of Web Technologies
// Send & Receive Data asynchronously
// Does not interfere with the current
// Json has replaced XML for the most part

//Ajax Features

// make async requests in the background
// no page reload/refersh
// fetch Data
// Very Intractive
// Display The Data or Append the Data

//API
// Application programming interface

//get data from url & send data from url

// Popular tools for ajax

// Fetch Api
// Axios
// Superaragent
// JQuery
// Node Http

/*
REQUEST METHODS

GET = get data
POST = store/create data   
PUT = update data
PATCH = partially update date
DELETE = delete data

*/
