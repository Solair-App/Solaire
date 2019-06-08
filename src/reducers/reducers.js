

const reducers = (state, action) => {
  switch (action.type) {
    case 'HANDLE_PARCOURS':
      return [...action.payload];
    default:
      return state;
  }
};

export default reducers;
