import React, {useEffect, useState, useRef} from 'react';
import styles from './App.module.css';
import {TodoItem} from './components/TodoItem';
import {TodoForm} from './components/TodoForm';

const API_URL = 'http://localhost:3001/todos';

export const App = () => {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [sortAlpha, setSortAlpha] = useState(false);
    const searchTimeout = useRef(null);

    useEffect(() => {
        setLoading(true);

        fetch(API_URL)
            .then((res) => res.json())
            .then((data) => {
                setTodos(data);
            })
            .catch((error) => console.error('Ошибка загрузки:', error))
            .finally(() => setLoading(false));
    }, []);

    const addTodo = (title) => {
        const newTodo = {
            title,
            completed: false,
        };

        fetch(API_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newTodo),
        })
            .then((res) => res.json())
            .then((data) => {
                setTodos((prev) => [...prev, data]);
            })
            .catch((error) => console.error('Ошибка добавления:', error));
    };

    const updateTodo = (id, updatedTitle) => {
        const updated = {title: updatedTitle};

        fetch(`${API_URL}/${id}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(updated),
        })
            .then((res) => res.json())
            .then((data) => {
                setTodos((prev) =>
                    prev.map((todo) =>
                        todo.id === id ? {...todo, ...data} : todo
                    )
                );
            })
            .catch((error) => console.error('Ошибка обновления:', error));
    };

    const toggleTodoComplete = (id, newStatus) => {
        fetch(`http://localhost:3001/todos/${id}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({completed: newStatus}),
        })
            .then((res) => res.json())
            .then((updatedTodo) => {
                setTodos((prev) =>
                    prev.map((todo) =>
                        todo.id === id ? {...todo, completed: updatedTodo.completed} : todo
                    )
                );
            });
    };

    const deleteTodo = (id) => {
        fetch(`${API_URL}/${id}`, {method: 'DELETE'})
            .then(() => {
                setTodos((prev) => prev.filter((todo) => todo.id !== id));
            })
            .catch((error) => console.error('Ошибка удаления:', error));
    };

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        clearTimeout(searchTimeout.current);
        searchTimeout.current = setTimeout(() => {
            setSearch(value);
        }, 500);
    };

    const filteredTodos = todos
        .filter((todo) => todo.title.toLowerCase().includes(search))
        .sort((a, b) => (sortAlpha ? a.title.localeCompare(b.title) : 0));

    return (
        <div className={styles.app}>
            <h2 className={styles.title}>Todos list</h2>
            {loading ? (
                <div className={styles.loader}></div>
            ) : (
                <>
                    <TodoForm onAdd={addTodo}/>
                    <div className={styles.controls}>
                        <input
                            type="text"
                            placeholder="Search..."
                            onChange={handleSearch}
                            className={styles.search}
                        />
                        <button
                            className={styles.sortBtn}
                            onClick={() => setSortAlpha((prev) => !prev)}
                        >
                            {sortAlpha ? '🔘' : '🔍'}
                        </button>
                    </div>

                    <ul className={styles.items}>
                        {filteredTodos.map((todo) => (
                            <TodoItem
                                key={todo.id}
                                todo={todo}
                                onUpdate={updateTodo}
                                onToggleComplete={toggleTodoComplete}
                                onDelete={deleteTodo}
                            />
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
};
