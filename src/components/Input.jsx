import React from 'react'

const Input = React.forwardRef( function Input({
    label, 
    type = 'text', 
    className= "", 
    ...props}, 
    ref){
        const id = userId

        return(
            <div className = 'w-full'>
                {label && (
                    <label htmlFor={id}
                    className='inline-block mb-1 pl-1'>
                        {label}
                    </label>
                )}
            </div>
        )
    }) 

export default Input
