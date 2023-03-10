import React from 'react';
import Logo  from '../assets/logo.png';
import { auth } from '../firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import { Avatar } from "@material-ui/core";
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';

const Navbar = () => {
   const [user] = useAuthState(auth);
  //  const user = useSelector(selectUser)
  

  return (
    <div className="flex py-4 items-center justify-between px-6 bg-blue-300  max-h-11 sticky top-0 z-50">
        <a href="/">
            <img src={Logo} alt="" 
            className="w-75 h-9 mr-4"
            />
        </a>
        <div className="hidden md:flex items- space-x-6 text-black">
          <a className='link'>Home</a>
          <a className='link'>About</a>
          <a className='link'>Forums</a>
          
          {/* <a className='link'>Topic Categories</a> */}
          {/* <a className='link'>My Posts</a> */}
          {/* <a className='link'>Add Post</a> */}
          
        </div>
        
        <div className="space-x-4 ml-auto hidden sm:flex">
          <div>
            <div className="flex items-center my-0">
              <img src={user?.photoURL} alt="user" className='h-10 rounded-full cursor-pointer'/>
              <h4 className=" text-xs font-medium mx-1 text-black">
                {user?.displayName}
              </h4>
              {/* <Avatar src='user.photo'/>
              <div className='mx-1'>
                <h3>{user.displayName}</h3>
                <h3>@Ajid</h3>
              </div> */}

            </div>
          </div>

          <button className="bg-blue-400 p-1.5 rounded-md text-sm px-3 focus:outline-none hover:shadow-2xl hover:text-white transition duration-200 ease-out whitespace-nowrap font-medium" onClick={() => auth.signOut()}
>
                Logout
                </button>
            </div>
            <span className="h-9 text-white cursor-pointer md:hidden px-1.5">
                <ion-icon name="menu-outline" size="large"></ion-icon>
            </span>
    </div>
  )
}

export default Navbar
