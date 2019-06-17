// eslint-disable-next-line import/prefer-default-export
export function mapDispatchToProps(value, type, key) {
  switch (type) {
    case 'parcours':
      return {
        type: 'HANDLE_PARCOURS',
        payload: value,
      };
    case 'cours':
      return {
        type: 'HANDLE_COURS',
        payload: value,
      };
    case 'category':
      return {
        type: 'HANDLE_CATEGORY',
        payload: value,
        key,
      };

    default: return null;
  }
}
