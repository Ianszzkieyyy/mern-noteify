import React from 'react'
import { Link } from 'react-router'
import { PlusIcon } from 'lucide-react'

const Navbar = () => {
  return (
    <header className='bg-base-300 border-b border-base-content/10'>
        <div className='mx-auto max-w-6xl p-4 flex justify-between items-center'>
            <h1 className='text-3xl font-mono font-bold tracking-tight text-primary'>Noteify</h1>
            <Link to={"/create"} className='btn btn-primary rounded-full'>
                <PlusIcon className='size-4' />
                Create Note
            </Link>
        </div>
    </header>
  )
}

export default Navbar