import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import authService from "./appwrite/auth"
import { login, logout } from "./store/authSlice"
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'
import { Toaster } from "react-hot-toast";

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    // run in background (non-blocking)
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData))
        } else {
          dispatch(logout())
        }
      })
      .catch(() => dispatch(logout()))
  }, [dispatch])

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Toaster position="top-right" reverseOrder={false} />
      <div className='w-full block'>
        <Header />
        <main className='mx-auto max-w-7xl px-4'>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default App














// import React, { useState, useEffect } from 'react'
// import { useDispatch } from 'react-redux'

// import authService from "./appwrite/auth"
// import {login, logout } from "./store/authSlice"
// import { Footer, Header } from './components'
// import { Outlet } from 'react-router-dom'
// import { Toaster } from "react-hot-toast";


// function App() {
//   const [loading, setLoading] = useState(true)
//   const dispatch = useDispatch()

//   useEffect(() => {
//     authService.getCurrentUser()
//     .then((userData) => {
//       if (userData) {
//         dispatch(login((userData)))
//       } else {
//         dispatch(logout())
//       }
//     })
//     .finally(() => setLoading(false))
//   }, [dispatch])
  
//   return !loading ? (
//     // <div className='min-h-screen flex flex-wrap content-between bg-gray-100 '>
//     <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
//  <Toaster position="top-right" reverseOrder={false} />
//       <div className='w-full block'>
//         <Header />
//         <main className='mx-auto max-w-7xl px-4 '>
//         {/* TODO:  */}
//          <Outlet />
//         </main>
//         <Footer />
//       </div>
//     </div>
//   ) : null
// }

// export default App