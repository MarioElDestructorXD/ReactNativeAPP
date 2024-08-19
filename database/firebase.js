import firebase from "firebase/compat/app";
import "firebase/compat/firestore"; // Importa la versión de compatibilidad de Firestore

const firebaseConfig = {
  apiKey: "AIzaSyBjubsb2nIG4Y8XJ3bEfLE18uVJynapDu4",
  authDomain: "react-native-firebase-c5610.firebaseapp.com",
  projectId: "react-native-firebase-c5610",
  storageBucket: "react-native-firebase-c5610.appspot.com",
  messagingSenderId: "737770018339",
  appId: "1:737770018339:web:43111f6a97655bc5318396",
};

// Inicializa Firebase solo si no está inicializado
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Obtén la instancia de Firestore
const db = firebase.firestore();

export { firebase, db };
