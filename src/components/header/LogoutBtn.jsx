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
      flex items-center justify-center
      bg-red-500 hover:bg-red-600
      text-white rounded-lg
      transition duration-200

      px-2 py-1 text-xs   /* 📱 mobile */
      md:px-4 md:py-2 md:text-sm  /* 💻 desktop */
      "
    >
      Logout</button>
  )
}

export default LogoutBtn
