const initialState = {
    todos: [],
    loading: false,
};

export const todosReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_TODOS_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_TODOS_SUCCESS':
            return { ...state, loading: false, todos: action.payload };
        case 'ADD_TODO':
            return { ...state, todos: [...state.todos, action.payload] };
        case 'DELETE_TODO':
            return { ...state, todos: state.todos.filter(t => t.id !== action.payload) };
        case 'TOGGLE_TODO':
            return {
                ...state,
                todos: state.todos.map(t =>
                    t.id === action.payload.id ? { ...t, completed: action.payload.completed } : t
                ),
            };
        case 'UPDATE_TODO':
            return {
                ...state,
                todos: state.todos.map(t =>
                    t.id === action.payload.id ? { ...t, title: action.payload.title } : t
                ),
            };
        default:
            return state;
    }
};
