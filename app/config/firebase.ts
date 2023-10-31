// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9GgBjtmBSeABXPqy-T-SHmQdzKi0cv8s",
  authDomain: "xiaohuangshu-f51be.firebaseapp.com",
  projectId: "xiaohuangshu-f51be",
  storageBucket: "xiaohuangshu-f51be.appspot.com",
  messagingSenderId: "191841855764",
  appId: "1:191841855764:web:2f1f3bbb07638189d87a01",
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export default firebase
