"use client"

import React, { useState } from 'react'
import GenericSearch from './SearchComp'
import { Input } from './Input'
import Label from './Label'
import { ErrorComp } from './ErrorComp'
import { Button } from './Button'
import { useRouter } from 'next/navigation'
import MakeCenter from './MakeCenter'

const MakeInstructor = () => {
  const [userId, setUserId] = useState('')
  const [userName, setUserName] = useState('')
  const [workExperience, setWorkExperience] = useState(0)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const router = useRouter();

  const fetchResultData = async (query: string) => {


    const res = await fetch(`/api/users/search?q=${query}`)
    if (!res.ok) {
      throw new Error('Failed to fetch users')
    }
    return await res.json()
  }

  const handleUserSelect = (user: any) => {
    setUserId(user.id)
    setUserName(user.name)
    setIsSearchOpen(false)
  }

  const handleSubmit = async () => {
    if (!userId || workExperience <0) {
      setError('Please select a user and enter work experience')
      return
    }

    setIsSubmitting(true)
    setError('')
    setSuccess('')

    try {
    
      const response = await fetch('/api/instructor',{
        method:'POST',
        body: JSON.stringify({
          userId,
          workExp: workExperience >0 ? workExperience : 0,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create instructor')
      }

      const data = await response.json();
      console.log("this is the user",data)
      setSuccess('Instructor created successfully!')
      setUserId('')
      setUserName('')
      setWorkExperience(0)
      router.push('/')
    } catch (err) {
      setError(err.message || 'Something went wrong')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
<MakeCenter>
        <h2 className="text-2xl font-bold text-midnight-blue-900 mb-6">Make User an Instructor</h2>
        
        {error && <ErrorComp error={error} />}
        
        {success && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
            {success}
          </div>
        )}

        <div className="mb-4 relative w-full">
          <Label>Select User</Label>
          <Input 
            type="text" 
            placeholder="Search users..." 
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value)
              if (e.target.value.length) {
                setIsSearchOpen(true)
              } else {
                setIsSearchOpen(false)
              }
            }}
            onClick={()=>setIsSearchOpen(false)}
            onFocus={() => userName.length >= 3 && setIsSearchOpen(true)}
          />
          
          {isSearchOpen && (
            <div className="absolute z-10 mt-1 w-full bg-midnight-blue-50 border border-midnight-blue-300 rounded-md shadow-lg scroll-auto overflow-y-auto">
              <GenericSearch
                fetchResults={fetchResultData}
                renderResult={(user, index) => (
                  <div 
                    key={index} 
                    className="p-3 hover:bg-midnight-blue-50 cursor-pointer"
                    onClick={() => handleUserSelect(user)}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium text-midnight-blue-900">{user?.name}</h4>
                        <p className="text-sm text-midnight-blue-700">{user?.email}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium px-2 py-1 rounded bg-midnight-blue-100 text-midnight-blue-800">
                          {user?.role}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                placeholder="Search users..."
                minChars={3}
                className="w-full"
              />
            </div>
          )}
        </div>

        <div className="mb-6 w-full">
          <Label>Work Experience (years)</Label>
          <Input 
            type="number" 
            placeholder="Enter years of experience" 
            value={workExperience} 
            onChange={(e) => setWorkExperience(parseInt(e.target.value))}
            min="0"
            className="w-full"
            onClick={()=>setIsSearchOpen(false)}
          />
        </div>

        <div className="flex justify-end gap-3">
          <Button 
            className="px-4 py-2 text-sm font-medium text-midnight-blue-700 bg-gray-100 rounded-md hover:bg-gray-200"
            onClick={() => {
              setUserId('')
              setUserName('')
              setWorkExperience(-1)
              setError('')
              setSuccess('');
              router.back();
            }}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button 
            className="px-4 py-2 text-sm font-medium text-white bg-midnight-blue-600 rounded-md hover:bg-midnight-blue-700 disabled:opacity-50"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Processing...' : 'Make Instructor'}
          </Button>
        </div>
  </MakeCenter>
  )
}

export default MakeInstructor