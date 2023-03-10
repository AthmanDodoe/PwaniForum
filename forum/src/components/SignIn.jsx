import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from "../assets/logo.png";
import Google from "../assets/google.png";
import { auth , provider} from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';



const SignIn = () => {
  const [user] = useAuthState(auth)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();


  const signInWithGoogle = (e) => {
    e.preventDefault();
    signInWithPopup(auth, provider).then((result) => {
      navigate('topics');
    }).catch((error) => {
      alert(error.message);
    });
  };

  const SignIn = (e) => {
    e.preventDefault();
    setEmailError('');
    setPasswordError('');
    signInWithEmailAndPassword(auth, email, password).then((usercredentials) => {
      console.log(usercredentials);
      navigate('/topics');
    }).catch((error) => {
      if (error.code === 'auth/invalid-email') {
        setEmailError('Invalid email address');
      } else if (error.code === 'auth/user-not-found') {
        setEmailError('User not found');
      } else if (error.code === 'auth/wrong-password') {
        setPasswordError('Incorrect password');
      } else {
        alert(error.message);
      }
    })
   }

  return (
    <div className=" flex  justify-center mx-auto my-8 p-2 bg-gray-200 h-85 w-96 rounded-md items-center">
    <div className="p-1  gap-1 items-center justify-center">
      <span className="items-center justify-center mx-auto my-auto">
        <img src={Logo} alt="" className="w-40 items-center mx-auto" />
      </span>
      <h1 className="text-1xl font-bold py-1 text-center">Student Discussion Forum Login</h1>

      <form onSubmit={SignIn}>
      <div className='flex flex-col py-1'>
          <label className="py-1 font-medium">Email</label>
          <input type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} className="focus:outline-none cursor-pointer" />
          {emailError && <span className="text-red-400 text-xs">{emailError}</span>}
        </div>

        <div className='flex flex-col py-2 '>
          <label className="py-1 font-medium">Password</label>
          <input type="password" 
          value = {password} 
          onChange={(e) => setPassword(e.target.value)} className="focus:outline-none cursor-pointer"/>
          {passwordError && <span className="text-red-400 text-xs">{passwordError}</span>}
        </div>

        <button className="border bg-blue-300 w-full p-1 my-2 hover:bg-blue-500">Login</button>
      </form>
      <div className="flex items-center my-1">
        <hr className="flex-grow border-black" />
        <span className="mx-3 text-black font-bold">or</span>
        <hr className="flex-grow border-black" />
      </div>
      <div className='flex className="border bg-blue-300 w-full p-1 my-2 hover:bg-blue-500'>
        <img src={Google} alt='' className="w-75 h-7 " />
        <button onClick={signInWithGoogle}>Continue With Google</button>
      </div>
      <p className='py-2'>Don't Have an account ? <Link to='/signup' className='underline hover:bg-blue-500'>SignUp</Link></p>
    </div>
  </div>
  );
};

export default SignIn;