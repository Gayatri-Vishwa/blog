
import React from 'react'
import thinknest from "../assets/last.png"

function Logo() {
  return (
     <div className='flex items-center space-x-2'>
    <div className="w-12 h-12 rounded-full overflow-hidden">
      <img 
        src={thinknest} 
        alt="ThinkNest Logo" 
        className="w-full h-12 object-cover"
      />

    </div>
      <span className='text-2xl text-black font-bold dark:text-white'>ThinkNest</span>
      </div>
  )
}

export default Logo
