import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import { useNavigate } from "react-router-dom";


const firebaseConfig = {
    apiKey: "AIzaSyCThXyiKK_bNN7QVnyNX5c3bBsO41nNfNs",
    authDomain: "forum-4a369.firebaseapp.com",
    projectId: "forum-4a369",
    storageBucket: "forum-4a369.appspot.com",
    messagingSenderId: "650609801385",
    appId: "1:650609801385:web:85e9264ae804b092b811b8"
  };

  
  const app = initializeApp(firebaseConfig);
  export const db = getFirestore(app);
  export const auth = getAuth(app);
 
  export const provider = new GoogleAuthProvider();

  export default app;
  