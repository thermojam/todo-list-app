export const fetchTodos = () => async (dispatch) => {
    dispatch({ type: 'FETCH_TODOS_REQUEST' });
    try {
        const res = await fetch('http://localhost:3001/todos');
        const data = await res.json();
        dispatch({ type: 'FETCH_TODOS_SUCCESS', payload: data });
    } catch (err) {
        console.error('Ошибка загрузки:', err);
    }
};
