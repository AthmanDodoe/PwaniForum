import { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Home from './components/Home';
import { AuthContextProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import { useDispatch } from 'react-redux';
import { auth } from './firebase';
import { selectUser, login, logout } from "./features/userSlice";


function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log("user is", authUser)
      if (authUser) {
        // The user is logged in
        dispatch(
          login({
            uid:authUser.uid,
            photo: authUser.photoURL,
            email:authUser.email,
            displayName:authUser.displayName,
          })
        );
      } else {

        // The user is Loggedout
        dispatch(
          logout(
            
          )
        );

      }
    });
  }, [dispatch])
  
  return (
    <Routes>
      <Route exact path='/' element={<><SignIn /></>} />
      <Route exact path='/signup' element={<SignUp />} />
      <Route exact path='/topics' element={<><Navbar /><Home /></>} />
      <Route exact path='/topics/:id' element={<><Navbar /><Home /></>} />
    </Routes>
  );
};

export default App;