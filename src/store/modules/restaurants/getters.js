export default {
  canPaginate: state => state.currentCount < state.totalCount,
};
