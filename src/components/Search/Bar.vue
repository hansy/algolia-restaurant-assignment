<template>
  <div class="search__bar">
    <input v-model="query"
           type="text"
           placeholder="Search for Restaurants by Name, Cuisine, Location"
           @input="search"/>
    <div class="search__geo">
      <template v-if="geoEnabled">
        <span class="pulse"></span>
        <span class="search__geo__label">Currently using your location</span>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'search-bar',
  props: ['geoEnabled'],
  data() {
    return {
      query: '',
    };
  },
  methods: {
    search() {
      this.$store.commit('restaurants/newSearch', this.query);
      this.$store.dispatch('restaurants/search');
    },
  },
};
</script>
