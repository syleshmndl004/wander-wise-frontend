import React from 'react'
import { useNavigate } from 'react-router-dom'

const CustomButton = ({ text, className ,link ,}) => {
    const navigate = useNavigate();
  return (
     <button onClick={()=>{navigate(link)}} className={`font-semibold border-2 rounded-xl px-3 py-1 bg-purple-400 border-purple-500 text-white hover:bg-purple-500 cursor-pointer ${className}`}>{text}</button>
  )
}

export default CustomButton
