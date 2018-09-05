<template>
  <div class="facet">
    <p class="facet__name">{{capitalizeName()}}</p>
    <input type="text"
           :placeholder="'Filter '+capitalizeName()"
           @input="searchFacetValues"
           v-model="facetQuery"
           class="facet__filter"
           v-if="isSearchable()"/>
    <table class="facet__items">
      <facet-item v-for="(value, itemName) in items"
                  :name="itemName"
                  :value="value"
                  :key="itemName"
                  :facetName="name"
                  :ref="itemName">
      </facet-item>
    </table>
    <a class="facet__clear" @click.prevent="clearFacet">Clear</a>
  </div>
</template>

<script>
import FacetItem from './Facet/Item';

export default {
  props: ['name', 'items'],
  components: { FacetItem },
  data() {
    return {
      facetQuery: '',
    };
  },
  methods: {
    // https://stackoverflow.com/questions/4878756/how-to-capitalize-first-letter-of-each-word-like-a-2-word-city/4878797
    capitalizeName() {
      return this.name.toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
    },
    searchFacetValues() {
      this.$store.dispatch('restaurants/searchFacetValues', {
        facetName: this.name,
        facetQuery: this.facetQuery,
      });
    },
    clearFacet() {
      this.$store.commit('restaurants/clearFacet', this.name);
      this.$store.dispatch('restaurants/search');
      this.clearAllActives();
    },
    clearAllActives() {
      const items = this.$refs;

      // eslint-disable-next-line
      for (const item in items) {
        const facetItem = this.$refs[item][0];

        if (facetItem) {
          facetItem.removeActive();
        }
      }
    },
    isSearchable() {
      return this.name === 'cuisine';
    },
  },
};
</script>
