export default {
  populateResults(state, payload) {
    state.hits = payload.hits;
    state.processingTimeMS = payload.processingTimeMS;
    state.totalCount = payload.nbHits;
    state.currentCount = payload.hits.length;

    if (state.facets === undefined) {
      state.facets = payload.facets;
    }
  },
  addResults(state, payload) {
    state.hits = state.hits.concat(payload.hits);
    state.processingTimeMS = payload.processingTimeMS;
    state.totalCount = payload.nbHits;
    state.currentCount += payload.hits.length;
  },
  newSearch(state, query) {
    state.query = query;
    state.offset = 0;
    state.currentCount = 0;
    state.totalCount = 0;
    state.processingTimeMS = 0;
    state.hits = [];
  },
  addFilter(state, filter) {
    state.filters.push(filter);
  },
  clearFilters(state) {
    state.filters = [];
  },
  clearFilter(state, filter) {
    const index = state.filters.indexOf(filter);

    if (index !== -1) {
      state.filters.splice(index, 1);
    }
  },
  populateFacets(state, payload) {
    let facets = state.facets[payload.name];
    const items = payload.items;

    facets = {};

    for (const item in items) {
      facets[items[item].value] = items[item].count;
    }

    state.facets[payload.name] = facets;
  },
  clearFacet(state, facetName) {
    const regex = new RegExp(`${facetName}:`, 'g');

    for (let i = 0; i < state.filters.length; i++) {
      if (state.filters[i].match(regex)) {
        state.filters.splice(i, 1);
      }
    }

    state.facets = undefined;
  },
  addGeo(state, coords) {
    state.geo = coords;
  },
  initParams(state, payload) {
    state.query = payload.query;
    state.currentCount = payload.offset;
    state.geo = payload.coords;
    state.filters = payload.filters;
  },
};
