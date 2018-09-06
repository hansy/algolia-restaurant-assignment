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
    if (state.filters[filter.name]) {
      state.filters[filter.name].values.push(filter.value);
    } else {
      state.filters[filter.name] = {
        operator: filter.operator,
        values: [filter.value],
      };
    }
  },
  clearFilters(state) {
    state.filters = {};
  },
  clearFilter(state, filter) {
    // eslint-disable-next-line
    for (const stateFilterName in state.filters) {
      if (stateFilterName === filter.name) {
        const stateFilter = state.filters[stateFilterName];

        for (let i = 0; i < stateFilter.values.length; i += 1) {
          if (stateFilter.values[i] === filter.value) {
            stateFilter.values.splice(i, 1);
          }
        }

        if (stateFilter.values.length === 0) {
          delete state.filters[stateFilterName];
        }
      }
    }
  },
  populateFacets(state, payload) {
    let facets = state.facets[payload.name];
    const items = payload.items;

    facets = {};

    // eslint-disable-next-line
    for (const item in items) {
      facets[items[item].value] = items[item].count;
    }

    state.facets[payload.name] = facets;
  },
  clearFacet(state, facetName) {
    // eslint-disable-next-line
    for (const stateFilterName in state.filters) {
      if (stateFilterName === facetName) {
        delete state.filters[facetName];
      }
    }
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
