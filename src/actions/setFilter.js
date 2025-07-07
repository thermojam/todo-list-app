export const setFilter = (term) => ({
    type: 'SET_FILTER',
    payload: term.toLowerCase(),
});
