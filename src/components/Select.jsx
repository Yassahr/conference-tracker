import React , {useId} from 'react'

function Select({
    options,
    label,
    className="",
    ...props
}, ref) {
    const id = useId
  return (
    <div 
    className='w-full max-w-7xl mx-auto px-4'>
        {label && (
                    <label htmlFor={id}
                     className='inline-block mb-1 pl-1'>
                        {label}
                    </label>
        )}
        <select
        {...props}
        id={id}
        ref={ref}
        className={`px-3 py-2 rounded-lg
         bg-white texr-black outline-none
         focus:bg-gray-50 duration-200 border 
        border-gray-2-- w-full ${className}`}
        >
            {    
                    options.map(option=>{
                        <options 
                        key={option}
                        values={option}>
                            {option}
                        </options>
                     })
            }                
           
        </select>
      </div>
  )
}

export default React.forwardRef(Select)