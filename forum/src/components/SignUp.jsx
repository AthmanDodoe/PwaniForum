import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Logo from "../assets/logo.png";
import { UserAuth } from '../context/AuthContext';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate()

  // const { createUser } = UserAuth();
  const SignUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password).then((usercredentials) => {
      console.log(usercredentials);
      navigate('/')
    }).catch((error) => {
      setError(error.message);
    })
   }
  return (
    <div className=" flex  justify-center mx-auto my-10 p-2 bg-gray-200 h-85 w-96 rounded-md items-center">
      <div className="p-1  gap-1 items-center justify-center">
        <span className="items-center justify-center mx-auto my-auto">
          <img src={Logo} alt="" className="w-40 items-center mx-auto my-auto" />
        </span>
        <h1 className="text-1xl font-bold py-1 my-1 text-center">Student Discussion Forum Registration</h1>
        
        <form onSubmit={SignUp}>
          <div className='flex flex-col py-1'>
            <label className="py-1 font-medium">Email</label>
            <input type = "email" onChange={(e) => setEmail(e.target.value)}/>
            {error && <p className="text-red-400 text-xs">{error}</p>}
          </div>
          
          <div className='flex flex-col py-1'>
            <label className="py-2 font-medium">Password</label>
            <input onChange={(e) => setPassword(e.target.value)} type='password'/>
            {error && <p className="text-red-400 text-xs">{error}</p>}
          </div>

          <button className="border border-blue-300 bg-blue-500 w-full p-1 my-2 hover:bg-blue-600">Create Account</button>
        </form>
        <p className='py-2'>Already Have an account ? <Link to='/' className='underline'>login</Link></p>
      </div>
    </div>
  )
}

export default SignUp;
