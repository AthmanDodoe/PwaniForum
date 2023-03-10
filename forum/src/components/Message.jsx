import React from 'react';
import moment from "moment";
import { TrashIcon } from '@heroicons/react/24/solid';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "../firebase";
import { Avatar } from "@material-ui/core";

const Message = ({id, message, timestamp, name, photoURL, email}) => {
  const [user] = useAuthState(auth)

  return (
    <div className='flex items-center p-1 my-2 mr-2'>
      <img src={user?.photoURL} alt="user" className='h-10 rounded-full cursor-pointer'/>
      {/* <Avatar /> */}
      <div className='flex flex-col'>
        <h4 className='flex items-center space-x-2 font-medium'>
          <span className='text-xs cursor-pointer'>{name}</span>
          <span className='text-xs'>{moment(timestamp?.toDate().getTime()).format("lll")}</span>
        </h4>
        <p>{message}</p>
      </div>
      {user?.email === email && (
        <div>
          <TrashIcon className='h-5'/>

        </div>
      )}
    </div>
  )
}

export default Message;
