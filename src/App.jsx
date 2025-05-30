import React, {useEffect, useState} from 'react';
import styles from './App.module.css'

export const App = () => {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        fetch('https://jsonplaceholder.typicode.com/todos')
            .then((response) => response.json())
            .then((data) => {
                setTodos(data);
                console.log('Ответ сераера - список задач получен', data);

            })
    .finally(() => setLoading(false));

    }, [])

    return (
        <div className={styles.app}>
            <h2 className={styles.title}>Todos list</h2>
            {loading ? (
                <div className={styles.loader}></div>
            ) : (
                <ul className={styles.items}>
                    {todos.map((todo) => (
                        <li key={todo.id} className={styles.item}>
                            {todo.title}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
