import React, { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button, Input, Logo } from "./index";
import { login as authLogin } from "../store/authSlice";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form"; // form library

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState("")

    const login = async(data) => {
        setError("")
        try {
            const session = await authService.login(data)
            // if (session) {
            //     const userData = await authService.getCurrentUser()
            //     if(userData) dispatch(authLogin(userData));
            //     navigate("/")
            // }
            
if(session) {
  // optional tiny delay to ensure cookie is set
  await new Promise(resolve => setTimeout(resolve, 100));
  const userData = await authService.getCurrentUser();
         if(userData) dispatch(authLogin(userData));
                navigate("/")
}

        } catch (error) {
            setError(error.message)
        }
    }

    // App.jsx or wherever you fetch user
// useEffect(() => {
//     const fetchUser = async () => {
//         const user = await authService.getCurrentUser();
//         if (!user) {
//             // user is logged out, do not call private APIs
//             setUser(null);
//             return;
//         }
//         setUser(user);
//     };

//     fetchUser();
// }, []);


  return (
    <div
    className='flex my-8 items-center justify-center w-full'
    >
        <div className={`mx-auto w-full max-w-lg bg-gray-200 dark:bg-gray-800 rounded-xl p-10 border border-black/10`}>
        <div className="mb-2 flex justify-center">
                   {/* <span className="inline-block w-full max-w-[100px] text-black/90  dark:text-white  text-2xl font-semibold">
                      ThinkNest
                    </span> */}
                    <Logo width="40px" height="40px"/>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight text-black/90  dark:text-white ">Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-black/90  dark:text-white ">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline text-blue-500"
                    >
                        Sign Up
                    </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className='mt-8'>
            <div className='space-y-5'>
                <Input
                label="Email: "
                placeholder="Enter your email"
                type="email"
                {...register("email", {
                    required: true,
                    validate: {
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    }
                })}
                />
                <Input
                label="Password: "
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                    required: true,
                })}
                />
                <Button
                type="submit"
                className="w-full"
                >Sign in</Button>
            </div>
        </form>
        </div>
    </div>
  )
}

export default Login