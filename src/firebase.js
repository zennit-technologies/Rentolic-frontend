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

const firebaseConfig = {
  apiKey: "AIzaSyAqV7a74rIZfiSkoKZe_Kvk-rma8dIJZac",
  authDomain: "otp-app-demo-7c1da.firebaseapp.com",
  databaseURL: "https://otp-app-demo-7c1da-default-rtdb.firebaseio.com",
  projectId: "otp-app-demo-7c1da",
  storageBucket: "otp-app-demo-7c1da.appspot.com",
  messagingSenderId: "130925204569",
  appId: "1:130925204569:web:174f2b416ad0d080a78d48"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
