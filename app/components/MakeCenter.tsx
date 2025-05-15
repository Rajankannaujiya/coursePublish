import React from 'react'
type CenterCompProps = {
    children: React.ReactNode;
  };



const MakeCenter = ({children}:CenterCompProps) => {
  return (
    <div className='h-full bg-midnight-blue-900 bg-opacity-50 flex items-center justify-center p-4'>
    <div className='flex flex-col justify-center items-center bg-midnight-blue-50 rounded-lg shadow-xl p-6 w-full max-w-md'>

        {children}

    </div>
    </div>
  )
}

export default MakeCenter