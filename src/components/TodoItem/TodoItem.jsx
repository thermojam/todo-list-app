import React, {useState} from 'react';
import styles from './TodoItem.module.css';

export const TodoItem = ({todo, onToggle, onDelete, onUpdate}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(todo.title);

    const handleUpdate = () => {
        if (editedTitle.trim()) {
            onUpdate(todo.id, editedTitle.trim());
            setIsEditing(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleUpdate();
        }
    };

    return (
        <li className={styles.item}>
            <label className={styles.checkboxWrapper}>
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={(e) => onToggle(todo.id, e.target.checked)}
                />
                <span className={styles.customCheckbox}></span>
            </label>

            {isEditing ? (
                <input
                    className={styles.input}
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    onKeyDown={handleKeyDown}
                    autoFocus
                />
            ) : (
                <span
                    className={styles.text}
                    onDoubleClick={() => setIsEditing(true)}
                >
                    {todo.title}
                </span>
            )}

            <button
                className={styles.editBtn}
                onClick={() => setIsEditing((prev) => !prev)}
            >
                🖋️
            </button>
            <button
                className={styles.deleteBtn}
                onClick={() => onDelete(todo.id)}
            >
                🗑️
            </button>
        </li>
    );
};
