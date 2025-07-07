export const toggleTodo = (id, completed) => async (dispatch) => {
    const res = await fetch(`http://localhost:3001/todos/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed }),
    });
    const data = await res.json();
    dispatch({ type: 'TOGGLE_TODO', payload: data });
};
