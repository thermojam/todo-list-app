import React, {useState} from 'react';
import styles from './TodoForm.module.css';

export const TodoForm = ({onAdd}) => {
    const [title, setTitle] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) return;
        onAdd(title.trim());
        setTitle('');
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="New task"
                className={styles.input}
            />
            <button type="submit" className={styles.addBtn}>
                ☑️
            </button>
        </form>
    );
};
