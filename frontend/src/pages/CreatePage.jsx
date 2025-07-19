import { ArrowLeftIcon } from 'lucide-react'
import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router'
import toast from 'react-hot-toast'
import api from '../lib/axios.js'

const CreatePage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      toast.error('Title and content are required.');
      return;
    }

    try {
      await api.post('notes', {
        title,
        content
      })
      toast.success('Note created successfully!');
      navigate('/');
    } catch (error) {
      if (error.response && error.response.status === 429) {
        toast.error('Too many attempts. Please try again later.', {
          duration: 5000,
          icon: "✋",
          }
        );
      } else {
        toast.error('Failed to create note. Please try again later.');
        console.error(error);
      }
    }
  }

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <div className='max-w-2xl mx-auto bg-base-100 h-screen'>
      <Link to="/" className='btn btn-ghost text-primary mt-4 mb-16'>
        <ArrowLeftIcon className='size-4' /> Back to Notes
      </Link>

      <div className='card bg-base-200 shadow-lg p-4'>
        <div className='card-body'>
          <h2 className='card-title mb-4'>Create a New Note</h2>
          <form onSubmit={handleSubmit}>
            <div className='form-control'>
              <label className='label'>
                <span className='label-text'>Title</span>
              </label>
              <input type='text' 
              placeholder='Enter note title'
              value={title} 
              onChange={(e) => setTitle(e.target.value)}
              className='input input-bordered rounded-full px-6' 
              />
            </div>
            <div className='form-control mt-8'>
              <label className='label'>
                <span className='label-text'>Content</span>
              </label>
              <textarea placeholder='Enter note content'
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className='textarea textarea-bordered h-24 rounded-3xl'>
              </textarea>
            </div>
            <div className='flex justify-end items-center mt-4'>
              <button type='submit' className='btn btn-primary mt-4 rounded-full' disabled={loading}>
                {loading ? 'Creating...' : 'Create Note'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreatePage