<template>
  <tr :class="['facet__item', { active:isActive }]" @click="toggleFacet" @hover="toggleActive">
    <td class="facet__item__name">{{name}}</td>
    <td class="facet__item__value">{{value}}</td>
  </tr>
</template>

<script>
export default {
  name: 'facet-item',
  props: ['facetName', 'name', 'value'],
  data() {
    return {
      isActive: false,
    };
  },
  methods: {
    toggleFacet() {
      this.toggleActive();

      const filter = {
        name: this.facetName,
        operator: 'OR',
        value: `"${this.name}"`,
      };

      if (this.isActive) {
        this.$store.commit('restaurants/addFilter', filter);
      } else {
        this.$store.commit('restaurants/clearFilter', filter);
      }

      this.$store.dispatch('restaurants/search');
    },
    toggleActive() {
      this.isActive = !this.isActive;
    },
    removeActive() {
      this.isActive = false;
    },
  },
};
</script>
