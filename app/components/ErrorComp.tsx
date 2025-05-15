import React from 'react'
import { cn } from '../lib/utils'

const ErrorComp = ({error, className}:{error:string, className?:string}) => {
  return (
    <div className={cn("text-sm text-red-800", className)}>{error}</div>
  )
}

export {ErrorComp}