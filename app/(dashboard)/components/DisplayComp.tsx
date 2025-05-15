import React from 'react'

const DisplayComp = ({name,role}:{name:string,role:string}) => {
  return (
    
    <div className='flex m-2 hover:bg-midnight-blue-100 justify-between font-bold cursor-pointer text-midnight-blue-800 p-2 rounded-md mx-4'>
    <h1 className='text-xl'>{name}</h1>
    <p className='text-lg'>{role}</p>
</div>
  )
}

export default DisplayComp