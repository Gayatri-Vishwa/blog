
import React from 'react'
import thinknest from "../assets/last.png"

function Logo({width="70px", height="70px"}) {
  return (
     <div className='flex items-center space-x-2'>

    <div className="w-${width} h-${height} rounded-full overflow-hidden"
    style={{ width: width, height: height }}>

      <img 
        src={thinknest} 
        alt="ThinkNest Logo" 
        className={`w-full h-full object-cover`}
      />

    </div>
      <span className='text-2xl text-black font-bold dark:text-white'>ThinkNest</span>
      </div>
  )
}

export default Logo
