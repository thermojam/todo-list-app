import React, {useEffect, useState} from 'react';
import {ref, onValue, push, set, remove, update} from 'firebase/database';
import {db} from './firebase';
import {TodoForm} from './components/TodoForm/TodoForm';
import {TodoList} from './components/TodoList/TodoList';
import {SearchSortBar} from './components/SearchSortBar/SearchSortBar';
import styles from './App.module.css';

export const App = () => {
    const [todos, setTodos] = useState([]);
    const [search, setSearch] = useState('');
    const [sortAsc, setSortAsc] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const todosRef = ref(db, 'todos');
        onValue(todosRef, (snapshot) => {
            const data = [];
            snapshot.forEach((child) => {
                data.push({id: child.key, ...child.val()});
            });
            setTodos(data);
            setLoading(false);
        });
    }, []);

    const addTodo = (title) => {
        const newRef = push(ref(db, 'todos'));
        set(newRef, {title, completed: false})
            .then(() => console.log('aAdded task'))
            .catch((e) => console.error('error', e));
    };

    const deleteTodo = (id) => remove(ref(db, `todos/${id}`));

    const toggleComplete = (id, completed) => update(ref(db, `todos/${id}`), {completed});

    const updateTodoTitle = (id, newTitle) => update(ref(db, `todos/${id}`), {title: newTitle});

    const filtered = todos
        .filter(todo => todo.title?.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => (sortAsc ? a.title.localeCompare(b.title) : 0));

    return (
        <div className={styles.app}>
            {loading ? (
                <div className={styles.loader}></div>
            ) : (
                <>
                    <h2 className={styles.title}>Firebase Todos List</h2>
                    <TodoForm onAdd={addTodo}/>
                    <SearchSortBar search={search} setSearch={setSearch} sortAsc={sortAsc}
                                   toggleSort={() => setSortAsc(!sortAsc)}/>
                    <TodoList todos={filtered} onDelete={deleteTodo} onToggle={toggleComplete}
                              onUpdate={updateTodoTitle}/>
                </>
            )}
        </div>
    );
};
