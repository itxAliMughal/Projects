// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBk9EIXVq6bdcFE42CMEB4MMU6x0tmwduE",
//   authDomain: "pwagram-1410e.firebaseapp.com",
//   databaseURL: "https://pwagram-1410e.firebaseio.com",
//   projectId: "pwagram-1410e",
//   storageBucket: "pwagram-1410e.appspot.com",
//   messagingSenderId: "186092825798",
//   appId: "1:186092825798:web:e69b8900dfca462a6a3bc7",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// export const db = getFirestore(app);

//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::://
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::://
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::://
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::://
//::::::::::::::::::::::███████:::::::::::::::::::::::::::::::::::::::::::://
//::::::::::::::::::::::███░░░███:::::::::::::::::::::::::::::::::::::::::://
//::::::::::::::::::::::███░░░███:::::::::::::::::::::::::::::::::::::::::://
//::::::::::::::::::::::█████████:::::::::::::::::::::::::::::::::::::::::://
//::::::::::::::::::::::███░░░░░::::::::::::::::::::::::::::::::::::::::::://
//::::::::::::::::::::::███░░░░░::::::::::::::::::::::::::::::::::::::::::://
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::://
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::://
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::://
//::::::::::::::::::::███████::::███████::::███████:::::::::::::::::::::::://
//::::::::::::::::::::███::::█████:::::███:███:::::███::::::::::::::::::::://
//::::::::::::::::::::███::::█████:::::███:███:::::███::::::::::::::::::::://
//::::::::::::::::::::███:::::█████::::███:███:::::███::::::::::::::::::::://
//::::::::::::::::::::███:::::█████::::███:███:::::███::::::::::::::::::::://
//::::::::::::::::::::███::::::█████::███::███::::::███:::::::::::::::::::://
//::::::::::::::::::::███::::::█████::███::███::::::███:::::::::::::::::::://
//::::::::::::::::::::███████::::███████::::███████:::::::::::::::::::::::://
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::://
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::://

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBE9Yaa4aEFeX0qYvbeTpC9bAgIMnDD4fQ",
  authDomain: "notes-web-app-1221f.firebaseapp.com",
  // databaseURL: "https://notes-web-app-1221f.firebaseio.com",
  measurementId: "G-WBP7Y72T3C", // this line is change
  projectId: "notes-web-app-1221f",
  storageBucket: "notes-web-app-1221f.appspot.com",
  messagingSenderId: "48954988539",
  appId: "1:48954988539:web:5d327f5b680f74d1bddd5e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
