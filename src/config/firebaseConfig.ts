import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyCgtiVYn4p6NNWa6zbx_kqssqO_JSej4rY",
    authDomain: "everything-book.firebaseapp.com",
    databaseURL: "https://everything-book.firebaseio.com",
    projectId: "everything-book",
    storageBucket: "everything-book.appspot.com",
    messagingSenderId: "989959307648",
    appId: "1:989959307648:web:cf89e0a32895149c08c165",
    measurementId: "G-D12E1WY9Z1"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();
