'use client'

import { useState, useEffect } from 'react'
import { Button } from '../components/Button' // adjust path if needed
import { useAppDispatch } from '../store/hook'
import { showPopup } from '../store/features/popup'

export default function Banner() {
  const [visible, setVisible] = useState(true)

  const dispatch = useAppDispatch();

  useEffect(() => {
    const dismissed = sessionStorage.getItem('bannerDismissed')
    if (dismissed === 'true') {
      setVisible(false)
    }
  }, [])

  const handleClose = () => {
    sessionStorage.setItem('bannerDismissed', 'true')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="relative bg-yellow-200 p-2 text-center">
      <div className="flex gap-3 justify-center items-center">
        <p className="font-bold text-midnight-blue-600 mt-2">Not submitted the details yet?</p>
        <Button className="bg-midnight-blue-900 text-midnight-blue-50 cursor-pointer" onClick={()=>dispatch(showPopup())}>Submit Details</Button>
      </div>
      <Button
        className="absolute right-2 top-1 font-extrabold text-2xl text-gray-900"
        onClick={handleClose}
      >
        X
      </Button>
    </div>
  )
}
