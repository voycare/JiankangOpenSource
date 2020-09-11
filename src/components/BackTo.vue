<template>
  <router-link :to="to">
    <span class="title-18">
      <img src="/assets/img/icon_back.png" class="mr-2">{{text}}
    </span>
  </router-link>
</template>
<script>
export default {
  props:{
    to: {
      required: true,
      type: String,
    },
    text: {
      required: true,
      type: String
    }
  }
  
}
</script>