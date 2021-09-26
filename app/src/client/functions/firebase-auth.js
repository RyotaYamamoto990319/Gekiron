// firebase
import { initializeApp  } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBpDtRD9cwM-MPbK5zFr6saM5W_6g_KsLY",
    authDomain: "untakatan-f5e71.firebaseapp.com",
    projectId: "untakatan-f5e71",
    storageBucket: "untakatan-f5e71.appspot.com",
    messagingSenderId: "157421626615",
    appId: "1:157421626615:web:26e44f7a63320c6ce41ff2",
    measurementId: "G-H2RPHBQY7Q"
};

let firebaseApp;
try {
    firebaseApp = initializeApp(firebaseConfig);
} catch(error) {
    console.log("既にfirebaseAppは存在しています");
}
const auth = getAuth();

const userSignUp = (email, password, callback) => {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        callback(user);
        alert("サインアップ成功");
    })
    .catch(error => {
    console.log("signup error");
    let errorCode = error.code;
    let errorMessage = error.message;
    // TODO: アラートじゃなくてエラーメッセージにする
    if (
        errorMessage ===
        "The email address is already in use by another account."
    ) {
        alert("サインアップ失敗:このメールアドレスはすでに使用されています");
    } else {
        console.log(errorMessage);
        alert("サインアップ失敗: " + errorCode + ", " + errorMessage);
    }
    });
  };

const userSignIn = (email, password, callback) => {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        callback(user);
        // alert("ログイン成功");
    })
    .catch(error => {
        let errorCode = error.code;
        let errorMessage = error.message;
        alert("ログイン失敗: " + errorCode + ", " + errorMessage);
    });
};

const userSignOut = (callback) => {
    signOut(auth).then(function() {
        // alert("サインアウト成功");
        callback();
    })
    .catch(function(error) {
        console.log(error);
        // alert("サインアウト失敗");
    });
  };

const getUser = (callback) => {
    onAuthStateChanged(auth, (user) => {
        console.log(user);
        callback(user);
    });
}

export {userSignUp, userSignIn, userSignOut, getUser};