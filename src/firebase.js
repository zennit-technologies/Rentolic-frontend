// import firebase from "firebase/compat/app";
// import "firebase/compat/auth";

// // Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyD-ccTZX1D8bvzE9KdamTR3wougMDV2C8w",
//     authDomain: "reactfirebasewebsite-93208.firebaseapp.com",
//     databaseURL: "https://reactfirebasewebsite-93208-default-rtdb.firebaseio.com",
//     projectId: "reactfirebasewebsite-93208",
//     storageBucket: "reactfirebasewebsite-93208.appspot.com",
//     messagingSenderId: "601144810337",
//     appId: "1:601144810337:web:38a7d2a2e92278b939c320"
//   };
//   firebase.initializeApp(firebaseConfig);
//   const auth = firebase.auth();
//   export { auth, firebase };


import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyAqV7a74rIZfiSkoKZe_Kvk-rma8dIJZac",
//   authDomain: "otp-app-demo-7c1da.firebaseapp.com",
//   databaseURL: "https://otp-app-demo-7c1da-default-rtdb.firebaseio.com",
//   projectId: "otp-app-demo-7c1da",
//   storageBucket: "otp-app-demo-7c1da.appspot.com",
//   messagingSenderId: "130925204569",
//   appId: "1:130925204569:web:174f2b416ad0d080a78d48"
// };

// const firebaseConfig = {
//   apiKey: "AIzaSyCpX6osHGYDkKTd26L3EGCqbQ6v9A3_bfk",
//   authDomain: "rentolic.firebaseapp.com",
//   projectId: "rentolic",
//   storageBucket: "rentolic.appspot.com",
//   messagingSenderId: "916627980843",
//   appId: "1:916627980843:web:f35ff57a420285e734a06e",
//   measurementId: "G-ET67PZL8C7"
// };
const firebaseConfig = {
  apiKey: "AIzaSyA1kfv4vSDwYdwUZTCnrn_mvpf8B9v7KDI",
  authDomain: "iceberg-f0406.firebaseapp.com",
  databaseURL: "https://iceberg-f0406-default-rtdb.firebaseio.com",
  projectId: "iceberg-f0406",
  storageBucket: "iceberg-f0406.appspot.com",
  messagingSenderId: "114977992190",
  appId: "1:114977992190:web:33f88ffc36abb7af2d24af",
  measurementId: "G-FT38CXPHZG"
};

// const firebaseConfig = {
//   apiKey: "AIzaSyCpX6osHGYDkKTd26L3EGCqbQ6v9A3_bfk",
//   authDomain: "rentolic.firebaseapp.com",
//   projectId: "rentolic",
//   storageBucket: "rentolic.appspot.com",
//   messagingSenderId: "916627980843",
//   appId: "1:916627980843:web:f35ff57a420285e734a06e",
//   measurementId: "G-ET67PZL8C7"
// };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;



