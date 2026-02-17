import React from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../appwrite/auth'
import {logout} from '../../store/authSlice'

function LogoutBtn() {
    const dispatch=useDispatch()

 

    const logoutHandler = async () => {
    await authService.logout();

    // localStorage.clear();
    // sessionStorage.clear();

    dispatch(logout());

    window.location.reload();   // ← ye magic line hai
};

  return (
  
      <button
      onClick={logoutHandler}
      className="
        inline-block px-6 py-2 rounded-full font-medium
        text-gray-800 bg-gray-200
        dark:text-gray-100 dark:bg-gray-700
        hover:bg-blue-100 dark:hover:bg-blue-600
        transition-colors duration-200
        shadow-sm dark:shadow-md
        focus:outline-none focus:ring-2 focus:ring-blue-400
      "
   
    >Logout</button>
  )
}

export default LogoutBtn
