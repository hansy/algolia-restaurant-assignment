<template>
  <div class="restaurant__snack">
    <div class="restaurant__snack__img"
         :style="'background-image:url('+attributes.image_url+');'">
    </div>
    <div class="restaurant__snack__content">
      <p class="restaurant__snack__name">{{attributes.name}}</p>
      <div class="restaurant__snack__ratings">
        <span class="restaurant__snack__rating">{{attributes.rating}}</span>
        <div class="stars">
          <span class="stars__rating"
                :style="'width:'+ratingPercentage()+'%;'">
          </span>
        </div>
        <span class="restaurant__snack__reviews">({{attributes.num_reviews}} reviews)</span>
      </div>
      <div class="restaurant__snack__meta">
        <span>{{attributes.cuisine}}</span> |
        <span>{{attributes.area}}</span> |
        <span>{{attributes.price_range}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'restaurant-snack',
  props: ['attributes'],
  methods: {
    ratingPercentage() {
      return (this.attributes.rating / 5) * 100;
    },
  },
};
</script>
