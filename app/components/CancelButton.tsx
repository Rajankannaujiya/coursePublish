"use client"

import React from 'react'
import { Button } from './Button'
import { useRouter } from 'next/navigation'

const CancelButton = ({disabled}:{disabled:boolean}) => {
    const router = useRouter();
  return (
    <Button 
            className="px-6 py-2 text-sm font-medium text-midnight-blue-700 bg-gray-100 rounded-md hover:bg-gray-200"
            onClick={() => {
              router.back()
            }}
            disabled={disabled}
          >
            Cancel
    </Button>
  )
}

export default CancelButton