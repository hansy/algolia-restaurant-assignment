const algoliasearch = require('algoliasearch');

const joinArray = (arr, operator) => arr.join(operator);

const prependStr = (arr, str) => arr.map(i => str + i);

const filtersToString = (filters) => {
  const filterArr = [];

  // eslint-disable-next-line
  for (const filterName in filters) {
    let str = '';
    const filter = filters[filterName];

    switch (filter.operator) {
      case 'OR':
        if (filter.values.length > 1) {
          const prePended = prependStr(filter.values, `${filterName}:`);
          const values = joinArray(prePended, ` ${filter.operator} `);

          str += '(';
          str += values;
          str += ')';
        } else {
          str += `${filterName}:${filter.values[0]}`;
        }

        break;
      default:
        break;
    }

    filterArr.push(str);
  }

  return joinArray(filterArr, ' AND ');
};

export default class {
  constructor() {
    this.client = algoliasearch(process.env.ALGOLIA_APPLICATION_ID, process.env.ALGOLIA_KEY);
    this.index = this.client.initIndex(process.env.ALGOLIA_INDEX);
  }

  search(query, filters, offset, geo, callback) {
    const options = {
      query,
      filters: filtersToString(filters),
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
