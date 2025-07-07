const initialState = {
    searchTerm: '',
    sortAlpha: false,
};

export const filtersReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_FILTER':
            return { ...state, searchTerm: action.payload };
        case 'SET_SORT':
            return { ...state, sortAlpha: action.payload };
        default:
            return state;
    }
};
