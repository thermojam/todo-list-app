export const addTodo = (title) => async (dispatch) => {
    const res = await fetch('http://localhost:3001/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, completed: false }),
    });
    const data = await res.json();
    dispatch({ type: 'ADD_TODO', payload: data });
};
