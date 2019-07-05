// eslint-disable-next-line import/prefer-default-export
export function mapDispatchToProps(value, type, key) {
  switch (type) {
    case 'category':
      return {
        type: 'HANDLE_CATEGORY',
        payload: value,
        key,
      };
    case 'bottomNav':
      return {
        type: 'HANDLE_BOTTOM_NAV',
        payload: value,
      };
    case 'profile':
      return {
        type: 'HANDLE_PROFILE',
        payload: value,
      };

    default: return null;
  }
}
