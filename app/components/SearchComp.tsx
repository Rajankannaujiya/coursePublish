"use client"

import React, { useState, useEffect } from 'react'
import { Input } from './Input'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'
import { Button } from './Button'
import SearchIcon from '@mui/icons-material/Search'
import ClearIcon from '@mui/icons-material/Clear'
import {ErrorComp} from './ErrorComp'
import Loading from './Loading'

interface GenericSearchProps<T> {
  /**
   * Function to fetch search results
   * @param query The search query
   * @returns Promise of search results
   */
  fetchResults: (query: string) => Promise<T[] | []>
  
  /**
   * Function to render each search result
   * @param item The result item
   * @param index Result index
   * @returns React node
   */
  renderResult: (item: T, index: number) => React.ReactNode
  
  placeholder?: string
  debounceTime?: number
  minChars?: number
  showClear?: boolean
  className?: string
}

function GenericSearch<T>({
  fetchResults,
  renderResult,
  placeholder = "Search...",
  debounceTime = 300,
  minChars = 1,
  showClear = true,
  className = ""
}: GenericSearchProps<T>) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  const initialQuery = searchParams.get('q') || ''
  const [query, setQuery] = useState(initialQuery)
  const [results, setResults] = useState<T[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const debouncedUpdateUrl = useDebouncedCallback((searchQuery: string) => {
    const params = new URLSearchParams(searchParams)
    
    if (searchQuery.trim()) {
      params.set('q', searchQuery)
    } else {
      params.delete('q')
    }
    replace(`${pathname}?${params.toString()}`)
  }, debounceTime)

  const fetchSearchResults = async (searchQuery: string) => {
    if (searchQuery.trim().length < minChars) {
      setResults([])
      return
    }

    setIsLoading(true)
    setError(null)
    
    try {
      const data = await fetchResults(searchQuery)
      console.log(data)
      setResults(data)
    } catch (err) {
      setError('Failed to fetch results')
      console.error('Search error:', err)
      setResults([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    debouncedUpdateUrl(value)
    
    // Trigger search only if meets min chars requirement
    if (value.trim().length >= minChars || value.trim() === '') {
      fetchSearchResults(value)
    }
  }

  const handleClear = () => {
    setQuery('')
    setResults([])
    setError(null)
    const params = new URLSearchParams(searchParams)
    params.delete('q')
    replace(`${pathname}?${params.toString()}`)
  }

  // Handle Enter key
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      debouncedUpdateUrl.flush()
      fetchSearchResults(query)
    }
  }

  useEffect(() => {
    if (initialQuery) {
      fetchSearchResults(initialQuery)
    }
  }, [])

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="relative flex items-center ">
        <Input
          className="flex-1 pl-10 pr-8 focus:outline-midnight-blue-600 "
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        
        <SearchIcon className="absolute left-3 h-5 w-5 text-midnight-blue-400" />
        
        {showClear && query && (
          <Button
            onClick={handleClear}
            className="absolute right-6 text-2xl text-midnight-blue-400 hover:text-midnight-blue-600"
            aria-label="Clear search"
          >
            <ClearIcon className="h-5 w-5" />
          </Button>
        )}
        
      </div>  

      {/* Status messages */}
      {isLoading && <Loading/>}
      {error && <ErrorComp error={error}/>}
      
      {/* Results */}
      {!isLoading && results.length > 0 && (
        <div className="space-y-2 bg-white border p-4 w-full rounded-md overflow-hidden overflow-y-auto no-scrollbar">
          <ul className="divide-y divide-midnight-blue-200 border-b-2">
            {results.map((item, index) => (
              <li key={index} className="py-2">
                {renderResult(item, index)}
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Empty state */}
      {!isLoading && query.trim().length >= minChars && results.length === 0 && (
        <div className="text-sm text-midnight-blue-500">No results found</div>
      )}
    </div>
  )
}

export default GenericSearch