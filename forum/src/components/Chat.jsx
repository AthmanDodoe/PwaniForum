import { BellIcon, ChatBubbleLeftEllipsisIcon, HashtagIcon,InboxIcon,PlusCircleIcon,QuestionMarkCircleIcon,UsersIcon} from '@heroicons/react/24/solid';
import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectTopicName, selectTopicId } from '../features/topicSlice';
import { auth } from "../firebase";
import { useAuthState} from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore';
import  { db }from '../firebase';
import { collection, doc, serverTimestamp, addDoc, query, orderBy } from 'firebase/firestore';
import Message from './Message';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import SendRoundedIcon from '@material-ui/icons/SendRounded';



const Chat = () => {
  const topicId = useSelector(selectTopicId);
  const topicName = useSelector(selectTopicName);
  const [user] = useAuthState(auth);
  const inputRef = useRef();
  const chatRef = useRef(null);
  // 
  const messagesQuery = topicId
  ? query(collection(db, "Topics", topicId, "messages"), orderBy("timestamp", "asc"))
  : null;
const [messages, loading, error] = useCollection(messagesQuery);

  

  const scrollToBottom = () => {
    chatRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const sendMessage = (e) => {
    e.preventDefault();

    if (inputRef.current.value !== "") {
      addDoc(collection(db, `Topics/${topicId}/messages`), {
        timestamp: serverTimestamp(),
        message: inputRef.current.value,
        name: user?.displayName ? user.displayName : "Anonymous",


      });
    }
    inputRef.current.value = "";
    scrollToBottom();
  }
  return (

    <div className='flex flex-col h-screen'>

      {/* hat Header */}
      <header className='flex items-center justify-between space-x-5 border-b p-3 -mt-1'>
        <div className='flex items-center space-x-1'>
          <HashtagIcon className='h-5'/>
          <h4>{topicName}</h4>  
        </div>
        <div className='flex items-center'>
          <BellIcon className='h-5 hover:bg-blue-300 hover:text-white cursor-pointer'/>
          <ChatBubbleLeftEllipsisIcon className='h-5  hover:bg-blue-300 hover:text-white cursor-pointer'/>
          <UsersIcon className='h-5  hover:bg-blue-300 hover:text-white cursor-pointer'/>

          {/* Search Button */}
          <div className='flex text-xs m-2 rounded-md items-center p-1 bg-white hover:outline cursor-pointer hover:outline-blue-300 hover:outline-2' >
            <input type="text" placeholder='Search'  className='focus:outline-none pl-1 p-1 placeholder:text-gray-900 bg-transparent cursor-pointer'/>
            <SearchRoundedIcon className=''/>
          </div>
          <InboxIcon  className='h-5 hover:bg-blue-300 hover:text-white cursor-pointer'/>
          <QuestionMarkCircleIcon  className='h-5  hover:bg-blue-300 hover:text-white cursor-pointer'/>
        </div>
      </header>

      <main className='flex-grow overflow-y-scroll scrollbar-hide'>
        {loading && <p>Loading messages...</p>}
          {error && <p>Error loading messages.</p>}
          {messages && messages.docs.map((doc) => {
            const { message, timestamp, name, user } = doc.data();

            return (
              <Message key={doc.id} id={doc.id} message={message} timestamp={timestamp} name={name} photoURL={user} />
            );
          })}

        <div ref={chatRef} className="pb-16" />
      </main> 
      <div className='flex items-center p-2.5 bg-slate-200 mx-5 mb-7 rounded-lg'>
        <PlusCircleIcon className='h-5 mr-4'/>
        <form className="w-full flex">
          {/* <input type="textarea"
           disabled={!topicId} 
           placeholder={topicId ? `Post in  #${topicName}`: "Select a Topic"} 
           className="w-full focus:outline-none bg-transparent placeholder:text-gray-900 resize-y h-10 max-h-32"
           ref={inputRef}/> */}
           <textarea disabled={!topicId} placeholder={topicId ? `Post in  #${topicName}`: "Select a Topic"} className="w-full resize-none focus:outline-none bg-transparent h-8 placeholder:items-center scrollbar-hide" ref={inputRef}>

           </textarea>
          <button type='submit' onClick={sendMessage}>
            <SendRoundedIcon  className='hover:bg-blue-300 hover:text-white'/>
          </button>
          
        </form>
      </div>
    </div>
  )
}

export default Chat;