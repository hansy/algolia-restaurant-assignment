<template>
  <div class="search">
    <search-bar :geoEnabled="geoEnabled"></search-bar>
    <search-filters></search-filters><search-results></search-results>
  </div>
</template>

<script>
import SearchBar from '@/components/Search/Bar';
import SearchFilters from '@/components/Search/Filters';
import SearchResults from '@/components/Search/Results';

export default {
  components: { SearchBar, SearchFilters, SearchResults },
  data() {
    return {
      geoEnabled: false,
    };
  },
  created() {
    this.parseParams();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.getLocation);
    }

    this.$store.dispatch('restaurants/search');
  },
  methods: {
    getLocation(location) {
      this.geoEnabled = true;
      const coords = `${location.coords.latitude}, ${location.coords.longitude}`;
      this.$store.commit('restaurants/addGeo', coords);
      this.$store.dispatch('restaurants/search');
    },
    parseParams() {
      const params = this.$route.query;
      const obj = {};

      obj.query = params.query || '';
      obj.currentCount = params.offset || 0;
      obj.geo = params.aroundLatLng || '';
      obj.filters = this.createFilterObject();

      this.$store.commit('restaurants/initParams', obj);
    },
    createFilterObject() {
      const obj = {};
      const filterStr = this.$route.query.filters;
      const regex = /([\w_]+):("[\w\s]+")/;

      if (filterStr) {
        const filterArr = this.findAllMatches(regex, filterStr);

        for (let i = 0; i < filterArr.length; i += 1) {
          const match = filterArr[i];
          const filterName = match[1];
          const filterValue = match[2];

          if (obj[filterName]) {
            obj[filterName].values.push(filterValue);
          } else {
            obj[filterName] = {
              operator: 'OR',
              values: [filterValue],
            };
          }
        }
      }
      return obj;
    },
    findAllMatches(regex, sourceString, aggregator = []) {
      const arr = regex.exec(sourceString);

      if (arr === null) return aggregator;

      const newString = sourceString.slice(arr.index + arr[0].length);
      return this.findAllMatches(regex, newString, aggregator.concat([arr]));
    },
  },
};
</script>
