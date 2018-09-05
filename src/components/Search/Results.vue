<template>
  <div class="results">
    <div class="results__meta">
      <p>{{count}} results found <span>in {{timeMS}} seconds</span></p>
    </div>
    <restaurant-snack v-for="restaurant in restaurants"
                      :key="restaurant.objectID"
                      :attributes="restaurant">
    </restaurant-snack>
    <button v-if="canPaginate"
            class="button button--paginate"
            @click="fetchMore">Show More
    </button>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import RestaurantSnack from '@/components/Restaurant/Snack';

export default {
  name: 'search-results',
  components: { RestaurantSnack },
  computed: {
    ...mapState({
      restaurants: state => state.restaurants.hits,
      count: state => state.restaurants.totalCount,
      timeMS: state => (state.restaurants.processingTimeMS / 1000),
    }),
    ...mapGetters({
      canPaginate: 'restaurants/canPaginate',
    }),
  },
  methods: {
    fetchMore() {
      this.$store.dispatch('restaurants/paginate');
    },
  },
};
</script>
