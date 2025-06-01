import React from 'react';
import {TodoItem} from '../TodoItem/TodoItem';
import styles from './TodoList.module.css';

export const TodoList = ({todos, onDelete, onToggle, onUpdate}) => {
    return (
        <ul className={styles.list}>
            {todos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} onDelete={onDelete} onToggle={onToggle} onUpdate={onUpdate}/>
            ))}
        </ul>
    );
};
