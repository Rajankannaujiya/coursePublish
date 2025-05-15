import React from 'react'
import { cn } from '../lib/utils';

type CenterCompProps = {
    children: React.ReactNode;
    className:string
  };

function CenterComp({children, className}:CenterCompProps) {
  return (
    <div className=' w-full h-full  flex justify-center overflow-hidden bg-midnight-blue-50'>
    <div className={cn('max-w-screen', className)}>
    {children}
  </div>
  </div>
  )
}

export default CenterComp