<template>
  <div class="filters">
    <facet v-for="(items, name) in facets"
           :name="name"
           :items="items"
           :key="name">
    </facet>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Facet from './Facet';

export default {
  name: 'search-filters',
  components: { Facet },
  computed: {
    ...mapState({
      facets: state => state.restaurants.facets,
    }),
  },
};
</script>
