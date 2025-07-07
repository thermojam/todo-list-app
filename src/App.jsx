import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchTodos, addTodo, deleteTodo, toggleTodo, updateTodo, setFilter, setSort} from './actions';
import {TodoForm} from './components/TodoForm';
import {TodoItem} from './components/TodoItem';
import {Spinner} from './components/Spinner';

export const App = () => {
    const dispatch = useDispatch();
    const {todos, loading} = useSelector((state) => state.todosState);
    const {searchTerm, sortAlpha} = useSelector((state) => state.filtersState);

    useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch]);

    const filtered = todos
        .filter((todo) => todo.title.toLowerCase().includes(searchTerm))
        .sort((a, b) => (sortAlpha ? a.title.localeCompare(b.title) : 0));

    return (
        <div
            className="max-w-3xl  mx-auto mt-20 px-6 sm:px-4 py-10 bg-white/10 backdrop-blur-md rounded-2xl shadow-xl border border-white/10 text-white">
            <h1 className="text-5xl sm:text-6xl font-bold text-center mb-8 bg-gradient-to-r via-white to-purple-500 bg-clip-text text-transparent animate-gradient">Todos
                List Redux</h1>

            <TodoForm onAdd={(title) => dispatch(addTodo(title))}/>

            <div
                className="flex gap-2 mb-6 p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/10 shadow-md">
                <input
                    type="text"
                    placeholder="Search..."
                    onChange={(e) => dispatch(setFilter(e.target.value))}
                    className="flex-1 px-4 py-2 rounded-lg bg-white/10 text-white placeholder-white/60 outline-none border border-white/20 focus:ring-2 focus:ring-cyan-400 backdrop-blur"
                />
                <button
                    onClick={() => dispatch(setSort(!sortAlpha))}
                    className="px-4 py-2 rounded-lg bg-white/10 hover:bg-purple-300 text-white shadow transition cursor-pointer"
                    title="Сортировка по алфавиту"
                >
                    {sortAlpha ? '<' : '>'}
                </button>
            </div>

            {loading ? (
                <Spinner/>
            ) : (
                <ul className="space-y-3">
                    {filtered.map((todo) => (
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            onDelete={() => dispatch(deleteTodo(todo.id))}
                            onToggle={() => dispatch(toggleTodo(todo.id, !todo.completed))}
                            onUpdate={(newTitle) => dispatch(updateTodo(todo.id, newTitle))}
                        />
                    ))}
                </ul>
            )}
        </div>
    );
};
