// eslint-disable-next-line import/prefer-default-export
export function mapDispatchToProps(value, type, key) {
  switch (type) {
    case 'parcours':
      return {
        type: 'HANDLE_PARCOURS',
        payload: value,
      };
    case 'category':
      return {
        type: 'HANDLE_CATEGORY',
        payload: value,
        key,
      };
    case 'userLessons':
      return {
        type: 'HANDLE_USER_LESSONS',
        payload: value,
      };
    case 'bottomNav':
      return {
        type: 'HANDLE_BOTTOM_NAV',
        payload: value,
      };

    default: return null;
  }
}
