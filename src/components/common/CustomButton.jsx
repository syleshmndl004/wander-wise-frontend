import React from 'react'
import { useNavigate } from 'react-router-dom'

const CustomButton = ({ text, className ,link ,}) => {
    const navigate = useNavigate();
  return (
     <button onClick={()=>{navigate(link)}} className={`bg-primary text-white py-2 px-6 rounded-md hover:bg-purple-700 cursor-pointer ${className}`}>{text}</button>
  )
}

export default CustomButton
