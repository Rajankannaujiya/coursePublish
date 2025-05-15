'use client'
import { useState, useEffect } from 'react'
import { Button } from './Button'
import { Input } from './Input'
import { useAppDispatch, useAppSelector } from '../store/hook'
import { hidePopup, showPopup } from '../store/features/popup'


export default function Popup() {
  const [formData, setFormData] = useState({
    name: '',
    profession: '',
    yearOfGraduation: '',
    course: '',
    email: '',
  })

  const show = useAppSelector(state =>state.popup.show)
  const dispatch = useAppDispatch();

  useEffect(() => {
    const hasShown = sessionStorage.getItem('userPopupShown')
    if (!hasShown) {
      dispatch(showPopup())
      sessionStorage.setItem('userPopupShown', 'true')
    }
  }, [dispatch])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault()
    if (Object.values(formData).some(v => v.trim() === '')) {
      alert('Please fill in all fields')
      return
    }

    console.log('Form Data Submitted:', formData)

    const response = await fetch('/api/notification', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      })


      if (!response.ok) {
        throw new Error('Failed to send notification')
      }

      const data = await response.json()

      console.log('Notification sent:', data)

      alert('Details submitted successfully')
      dispatch(hidePopup())
  }

  if (!show) return null

  return (
    <div className="fixed inset-0 bg-opacity-50 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg w-[400px] shadow-lg relative">
        <Button
          className="absolute top-2 right-2 text-gray-700 hover:text-gray-900 font-bold text-4xl"
          onClick={()=>dispatch(hidePopup())}
        >
          ×
        </Button>

        <h2 className="text-xl font-bold mb-4">Tell us about yourself</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <Input
            name="profession"
            placeholder="Profession"
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <Input
            name="yearOfGraduation"
            placeholder="Year of Graduation"
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <Input
            name="course"
            placeholder="Graduated Course"
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <Input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <Button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded cursor-pointer"
          >
            Submit
          </Button>
          <Button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded cursor-pointer"
            onClick={()=>dispatch(hidePopup())}
          >
            Cancel
          </Button>
        </form>
      </div>
    </div>
  )
}
