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

      obj.query = params.query;
      obj.currentCount = params.offset || 0;
      obj.geo = params.aroundLatLng;
      obj.filters = [];

      if (params.filters !== '' || params.filters !== undefined) {
        obj.filters = params.filters.split(' AND ');
      }

      this.$store.commit('restaurants/initParams', obj);
    },
  },
};
</script>
