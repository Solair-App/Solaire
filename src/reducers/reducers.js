

const reducers = (state, action) => {
  switch (action.type) {
    case 'HANDLE_CATEGORY':
      return {
        ...state,
        [action.key]: action.payload,
      };

    case 'HANDLE_BOTTOM_NAV':
      return {
        ...state,
        bottomNav: action.payload,
      };
    case 'HANDLE_PROFILE':
      return {
        ...state,
        profile: action.payload,
      };

    default:
      return state;
  }
};

export default reducers;
