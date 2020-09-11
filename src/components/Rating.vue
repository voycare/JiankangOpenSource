<template>
  <div class="rating">
    <ul class="list">
      <li :class="{ 'active': star <= stars }" :key="star.stars" @click="rate(star)" class="star"
          v-for="star in maxStars">
        <i :class="star <= stars ? 'icon-Subtract' : 'icon-Subtract'"></i>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    name: 'Rating',
    props: ['rating', 'maxStars', 'readOnly'],
    model: {
      prop: 'rating'
    },
    data() {
      return {
        stars: this.rating
      }
    },
    methods: {
      rate(star) {
        let self = this
        if (self.readOnly === true) {
          return
        }
        if (typeof star === 'number' && star <= self.maxStars && star >= 0) {
          self.stars = self.stars === star ? 0 : star
        }
        self.$emit('input', star)
      }
    },
  }
</script>
<style>
  .rating {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    color: #b7b7b7;
    background: #fff;
  }

  .rating .list {
    padding: 0;
    margin: 0 20px 0 0;
  }

  .rating .list .star {
    display: inline-block;
    font-size: 42px;
    transition: all .2s ease-in-out;
    cursor: pointer;
  }

  .rating .list .star:hover ~ .star:not(.active) {
    color: inherit;
  }

  .rating .list .star:first-child {
    margin-left: 0;
  }

  .rating .list .star.active i:before {
    color: #ffe100;
  }

  .rating .info {
    margin-top: 15px;
    font-size: 40px;
    text-align: center;
    display: table;
  }

  .rating .info .divider {
    margin: 0 5px;
    font-size: 30px;
  }

  .rating .info .score-max {
    font-size: 30px;
    vertical-align: sub;
  }

  .rating li {
    font-size: 30px !important;
  }
</style>
