import router from '../../../router';
import Algolia from '../../../lib/algolia';

const queryString = require('query-string');

const algolia = new Algolia();

const pushURL = (params) => {
  const obj = queryString.parse(params);
  router.push({ name: 'home', query: obj });
};

export const search = ({ commit, state }) => {
  const query = state.query;
  const filters = state.filters;
  const offset = 0;
  const geo = state.geo;

  algolia.search(query, filters, offset, geo, (results) => {
    console.log(results);
    commit('populateResults', results);
    pushURL(results.params);
  });
};

export const paginate = ({ commit, state }) => {
  const query = state.query;
  const filters = state.filters;
  const offset = state.currentCount;
  const geo = state.geo;

  algolia.search(query, filters, offset, geo, (results) => {
    commit('addResults', results);
    pushURL(results.params);
  });
};

export const searchFacetValues = ({ commit }, payload) => {
  algolia.searchFacets(payload.facetName, payload.facetQuery, (hits) => {
    const obj = {
      name: payload.facetName,
      items: hits,
    };
    commit('populateFacets', obj);
  });
};

export default {
  search,
  paginate,
  searchFacetValues,
};
