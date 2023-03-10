import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import CategoryIcon from './CategoryIcon';
import { ChevronDownIcon, MicrophoneIcon, PlusIcon,PhoneIcon, CogIcon } from '@heroicons/react/24/solid';
import Topic from './Topic';
import { collection, addDoc } from "firebase/firestore";
import { useCollection } from 'react-firebase-hooks/firestore';
import { useNavigate } from 'react-router-dom';
import Chat from './Chat'
import { useEffect } from 'react';
import Category from './Category';



const Home = () => {
  const [user] = useAuthState(auth)
  const [topics] = useCollection(collection(db, "Topics"));
  const navigate = useNavigate();

  const HandleAddTopic = async () => {
    const topicName = prompt("Add a new Topic");

    if (topicName) {
      await addDoc(collection(db, "Topics"), {
        TopicName: topicName,
      });
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [navigate, user]);

  console.log('db', db);

  return <>
    <div className='flex h-screen overflow-x-hidden '>

      {/* Category Side Bar */}
      <div className='flex flex-col space-y-3 bg-slate-300 p-3 w-15'>
        
        <h2 className='font-bold'>Categories</h2>
        <Category />
      </div>
      
      {/* Topics From The categories */}
      <div className="bg-slate-200 flex flex-col w-25 " >
        <h2 className='flex font-bold text-sm items-center justify-between border-b border-slate-300 p-3 hover:bg-blue-300 cursor-pointer hover:text-white'>Computer Science...<ChevronDownIcon className='h-5 ml-2' /></h2>
        <div className='flex-grow overflow-y-scroll scrollbar-hide'>
          <div className='flex items-center p-2 mb-2 '>
            <ChevronDownIcon className='h-3 mr-2'/>
            <h4 className='font-semibold text-sm'>Topics</h4>
            <PlusIcon className='h-6 ml-auto cursor-pointer hover:bg-blue-300 hover:text-white rounded-md' onClick={HandleAddTopic}/>
          </div>
          <div className='flex flex-col space-y-2 mb-4'>
          {topics?.docs.map((doc) => (
                <Topic key={doc.id} id={doc.id} topicName={doc.data().TopicName} />
              ))}

          </div>
        </div>

      {/* <div className='flex justify-center items-center border-t border-gray-800'>
          <div className="hover:hover:bg-blue-300 p-2 rounded-md">
            <MicrophoneIcon className="h-5 cursor-pointer"/>
          </div>
          <div className="hover:hover:bg-blue-300 p-2 rounded-md ">
            <PhoneIcon className="h-5 cursor-pointer"/>
          </div>
          <div className="hover:hover:bg-blue-300 p-2 rounded-md cursor-pointer">
            <CogIcon className="h-5 icon"/>
          </div>
        </div> */}
      </div>
        <div className="bg-slate-100 flex-grow">
            <Chat />
        </div>
    </div>
  </>
   
}

export default Home;