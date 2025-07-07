export const deleteTodo = (id) => async (dispatch) => {
    await fetch(`http://localhost:3001/todos/${id}`, {
        method: 'DELETE',
    });
    dispatch({ type: 'DELETE_TODO', payload: id });
};
