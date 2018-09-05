const algoliasearch = require('algoliasearch');

const joinArray = arr => arr.join(' AND ');

export default class {
  constructor() {
    this.client = algoliasearch(process.env.ALGOLIA_APPLICATION_ID, process.env.ALGOLIA_KEY);
    this.index = this.client.initIndex(process.env.ALGOLIA_INDEX);
  }

  search(query, filters, offset, geo, callback) {
    const options = {
      query,
      filters: joinArray(filters),
      facets: ['cuisine', 'payment_options'],
    };

    if (offset) {
      options.offset = offset;
      options.length = 20;
    }

    if (geo !== undefined) {
      options.aroundLatLng = geo;
    }

    this.index.search(options).then((res) => {
      callback(res);
    });
  }

  searchFacets(facetName, facetQuery, callback) {
    this.index.searchForFacetValues({
      facetName,
      facetQuery,
    }, (err, content) => {
      if (err) throw err;

      callback(content.facetHits);
    });
  }
}
