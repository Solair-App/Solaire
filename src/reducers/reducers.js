

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
    case 'HANDLE_USER_LESSONS':
      return {
        ...state,
        userLessons: action.payload,
      };
    case 'HANDLE_BOTTOM_NAV':
      return {
        ...state,
        bottomNav: action.payload,
      };

    default:
      return state;
  }
};

export default reducers;
