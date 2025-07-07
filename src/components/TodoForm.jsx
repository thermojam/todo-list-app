import { useState } from 'react';

export const TodoForm = ({ onAdd }) => {
    const [title, setTitle] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) return;
        onAdd(title.trim());
        setTitle('');
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-2 mb-6 p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/10 shadow-md">
            <input
                type="text"
                className="flex-1 px-4 py-2 rounded-lg bg-white/10 text-white placeholder-white/50 outline-none border border-white/10 focus:ring-2 focus:ring-cyan-400 backdrop-blur"
                placeholder="Enter todo..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <button
                type="submit"
                className="px-4 py-2 rounded-lg  bg-white/10 hover:bg-green-300 text-white transition shadow cursor-pointer"
            >
                +
            </button>
        </form>

    );
};
