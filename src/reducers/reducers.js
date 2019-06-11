

const reducers = (state, action) => {
  switch (action.type) {
    case 'HANDLE_PARCOURS':
      return {
        ...state,
        parcours: action.payload,
      };
    case 'HANDLE_CATEGORY':
      return {
        ...state,
        [action.key]: action.payload,
      };
    default:
      return state;
  }
};

export default reducers;
