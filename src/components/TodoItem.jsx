import React, {useState} from 'react';
import styles from './TodoItem.module.css';

export const TodoItem = ({todo, onDelete, onUpdate, onToggleComplete}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(todo.title);

    const handleCheckboxChange = () => {
        onToggleComplete(todo.id, !todo.completed);
    };

    const startEdit = () => {
        setIsEditing(true);
    };

    const handleChange = (e) => {
        setEditText(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            if (editText.trim()) {
                onUpdate(todo.id, editText.trim());
                setIsEditing(false);
            }
        } else if (e.key === 'Escape') {
            setEditText(todo.title);
            setIsEditing(false);
        }
    };

    return (
        <li className={styles.item}>
            <label className={styles.checkboxWrapper}>
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={handleCheckboxChange}
                />
                <span className={styles.customCheckbox}></span>
            </label>
            {isEditing ? (
                <input
                    className={styles.input}
                    value={editText}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    autoFocus
                />
            ) : (
                <div className={styles.display} onDoubleClick={startEdit}>
                    <span className={styles.text}>{todo.title}</span>
                    <button className={styles.editBtn} onClick={startEdit} title="Редактировать">
                        🖋️
                    </button>
                </div>
            )}

            <button className={styles.deleteBtn} onClick={() => onDelete(todo.id)} title="Удалить">
                🗑️
            </button>
        </li>
    );
};
