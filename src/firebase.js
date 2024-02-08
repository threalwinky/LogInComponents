// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAJFIJpE3A1045vLhz9ReHqkGBXjjof9uY",
  authDomain: "backend-b7ba1.firebaseapp.com",
  projectId: "backend-b7ba1",
  storageBucket: "backend-b7ba1.appspot.com",
  messagingSenderId: "57174053210",
  appId: "1:57174053210:web:23acc3e671d4dfdcb52363",
  measurementId: "G-L19W5NM07H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default getFirestore()