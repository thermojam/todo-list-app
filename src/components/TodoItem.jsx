import { useState } from 'react';

export const TodoItem = ({ todo, onDelete, onToggle, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(todo.title);

    const handleDoubleClick = () => {
        setIsEditing(true);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            onUpdate(editTitle);
            setIsEditing(false);
        } else if (e.key === 'Escape') {
            setEditTitle(todo.title);
            setIsEditing(false);
        }
    };

    return (
        <li className="flex gap-2 mb-6 p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/10 shadow-md">
            <div className="flex items-center gap-3 flex-1 min-w-0 cursor-pointer">
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={onToggle}
                    className="cursor-pointer"
                />
                {isEditing ? (
                    <input
                        type="text"
                        className="w-full px-4 py-2  rounded-lg bg-white/10 border border-white/20 text-white outline-none focus:ring-2 focus:ring-cyan-500 placeholder-white/50 backdrop-blur flex-1 min-w-0"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        onKeyDown={handleKeyDown}
                        autoFocus
                    />
                ) : (
                    <span
                        className={`truncate ${todo.completed ? 'line-through text-gray-500' : ''}`}
                        onDoubleClick={handleDoubleClick}
                    >
        {todo.title}
      </span>
                )}
            </div>
            <button
                onClick={onDelete}
                className="px-4 py-2 bg-white/10  hover:bg-red-300 text-white rounded-lg transition shadow cursor-pointer"
                title="Удалить"
            >
                x
            </button>
        </li>
    );
};
