// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyCXy6_GwVogqPwZyJj-KPXIb-JfQaW-MTY",
  authDomain: "llej-2e851.firebaseapp.com",
  databaseURL: "https://llej-2e851.firebaseio.com",
  projectId: "llej-2e851",
  storageBucket: "llej-2e851.appspot.com",
  messagingSenderId: "419799122852",
  appId: "1:419799122852:web:36ddb23180314a8b987731",
  measurementId: "G-SN42ESZX78",
});

export const fireStore = firebase.firestore();

/** 监听用户状态改变 */
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    console.log("[登录成功]", user.email);
  }
});

firebase
  .auth()
  .signInWithEmailAndPassword("admin@shenzilong.cn", "987456321")
  .catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });
