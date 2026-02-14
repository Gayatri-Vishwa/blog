import React from 'react'
import appwriteService from "../appwrite/config"    //if redx can use.. but it is for query


import { Link } from "react-router-dom";






function PostCard({$id,title,featuredImage,createdAt  }) {
    const formattedDate = createdAt
    ? new Date(createdAt).toLocaleString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    : new Date().toLocaleString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
  



  return (
    
      // <Link to={`/post/${$id}`}> 
      <Link to={`/post/${$id}`}> 
      {/* <div className='w-full bg-gray-100 rounded-xl  p-4 '> */}
      {/* <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 hover:-translate-y-1"> */}
<div className="rounded-xl overflow-hidden bg-white dark:bg-gray-800 
  shadow-lg dark:shadow-lg p-4 transition-all duration-300 hover:shadow-2xl dark:hover:shadow-2xl">
  

        <div className='w-full justify-center mb-4'>
          <div className="w-full h-48 overflow-hidden rounded-xl">
            <img src={appwriteService.getFilePreview(featuredImage)} alt={title}  className="w-full h-48 object-cover"
            //  className='rounded-xl ' 
             />
             
       </div>
       <div className="p-5">
  <h2 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2 dark:text-gray-100">
    {title}
  </h2>

  <p className="text-sm text-gray-500 mb-3">
    {/* {new Date($createdAt).toDateString()} 10:02:00, 12 Aug 2024 */}
    {formattedDate}
  </p>

  <span className="text-blue-600 font-medium hover:underline">
    Read More →
  </span>
</div>

        </div>
       
        {/* <h2 className='text-xl font-bold'>{title}</h2> */}
      </div>

      </Link>
 
  )
}

export default PostCard
