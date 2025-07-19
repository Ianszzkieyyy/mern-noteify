import React from 'react'
import { Link } from 'react-router'
import { SquarePen, Trash2 } from 'lucide-react';
import { formatDate } from '../lib/utils.js'
import api from '../lib/axios.js';
import toast from 'react-hot-toast';

const NoteCard = ({note, setNotes}) => {
    const handleDelete = async(e, id) => {
        e.preventDefault(); // prevent default link behavior

        if (!window.confirm('Are you sure you want to delete this note?')) return;
        try {
            await api.delete(`/notes/${id}`);
            toast.success('Note deleted successfully!');
            setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id)); // get rid of deleted note 
        } catch (error) {
            console.error(error);
            toast.error('Failed to delete note. Please try again later.');
            if (error.response && error.response.status === 429) {
                toast.error('Too many attempts. Please try again later.', {
                    duration: 5000,
                    icon: "✋",
                });
            }
        }

    } 

    return <Link to={`/note/${note._id}`} className='card bg-base-200 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-primary'>
        <div className='card-body'>
            <h3 className='card-title text-base-content'>{note.title}</h3>
            <p className='text-base-content/70 text-sm'>{note.content.length > 100 ? note.content.substring(0, 100) + '...' : note.content}</p>
            <div className='card-actions justify-between items-center mt-4'>
                <p className='text-base-content/70 text-xs'>{formatDate(new Date(note.createdAt))}</p>
                <div className='flex gap-2'>
                    <Link to={`/note/${note._id}`} className='btn btn-ghost text-accent'>
                        <SquarePen className='size-4' />
                    </Link>
                    <button className='btn btn-ghost text-error' onClick={(e) => handleDelete(e, note._id)}>
                        <Trash2 className='size-4'/>
                    </button>
                </div>
            </div>
        </div>
    </Link>
}

export default NoteCard