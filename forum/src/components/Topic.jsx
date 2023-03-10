import { HashtagIcon } from '@heroicons/react/24/solid';
import React from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setTopicInfo } from "../features/topicSlice";

const Topic = ({id, topicName}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

  const setTopic = () => {
    dispatch(
      setTopicInfo({
        topicId: id,
        topicName: topicName,
     })
    );
    navigate(`/topics/${id}`);
  };
  return (
    <div className='font-medium flex items-center cursor-pointer hover:bg-blue-300 hover:text-white rounded-md' onClick={setTopic}>
      <HashtagIcon  className='h-3 mr-2'/> {topicName}
    </div>
  )
}

export default Topic;
