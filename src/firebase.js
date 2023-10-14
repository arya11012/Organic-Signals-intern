// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCwpYeWp3d7oWdhK8jDffm-DIt6vduQy_s",
  authDomain: "new-login-signup-app-bc5e7.firebaseapp.com",
  projectId: "new-login-signup-app-bc5e7",
  storageBucket: "new-login-signup-app-bc5e7.appspot.com",
  messagingSenderId: "766981451428",
  appId: "1:766981451428:web:a8f6d947cc4118353d4031"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
export const dealerAuth = getAuth(app);
export default app;