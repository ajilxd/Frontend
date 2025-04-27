// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC7q4MOMa2KI1ux8iKdt1baNCM_OPjVEvs",
  authDomain: "fluentawork-317cc.firebaseapp.com",
  projectId: "fluentawork-317cc",
  storageBucket: "fluentawork-317cc.appspot.com",
  messagingSenderId: "48869030166",
  appId: "1:48869030166:web:b9a0462d4185490d74b837",
  measurementId: "G-HKF4LNGCK5",
};

// Initialize Firebase
const Firebase = initializeApp(firebaseConfig);
export const analytics = getAnalytics(Firebase);

export default Firebase;
