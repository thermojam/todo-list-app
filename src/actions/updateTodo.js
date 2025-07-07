export const updateTodo = (id, title) => async (dispatch) => {
    const res = await fetch(`http://localhost:3001/todos/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
    });
    const data = await res.json();
    dispatch({ type: 'UPDATE_TODO', payload: data });
};
