import React from 'react'

const CategoryIcon = ({ image }) => {
  return (
    <img src= { image }
      alt=""
      className="h-12 cursor-pointer rounded-full transition-all duration-100 ease-out hover:rounded-2x1"
    />
  );
}

export default CategoryIcon;
