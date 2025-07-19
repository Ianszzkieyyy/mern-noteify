import React from 'react'
import { TriangleAlert } from 'lucide-react'

const RateLimitedUI = () => {
  return (
    <div className='max-w-6xl mx-auto bg-base-200 p-8 rounded-lg border-warning border-2 border-opacity-10 mt-4'>
        <div className='flex items-center gap-8'>
            <div className='text-warning bg-warning bg-opacity-30 rounded-full p-4'>
                <TriangleAlert className='size-6' />
            </div>
            <div>
                <h2 className='text-2xl font-bold text-warning'>Rate Limit Reached</h2>
                <p className='text-base-content/70'>You've made too many requests in a short period. Please try again later.</p>
                <span className='text-xs text-base-content/50'>Try again in a few seconds for the best experience.</span>
            </div>
        </div>
    </div>
  )
}

export default RateLimitedUI