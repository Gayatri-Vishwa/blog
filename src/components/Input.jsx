import { useId } from "react"
import React  from 'react'



// wrap with React.forwardRef()

const Input= React.forwardRef(function Input({
    label,
   
    className="",
    ...props
},ref){

      const id=useId()

  return (
    <div className="w-full">
        {label &&
        <label htmlFor={props.id}
         className="inline-block pl-1 mb-1"> {label}</label>
        }
        <input type="text" className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border-2 border-gray-200 w-full
         ${className}`}
             ref={ref}
             {...props} id={id} />
    </div>
  )
})

export default Input
