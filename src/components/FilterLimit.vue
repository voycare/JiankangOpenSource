<template>
  <b-form-select
      size="sm"
      class="mr-4 page-limit-select"
      v-model="limit"
      :options="page_limits"
      @change="onChangeLimit"
  ></b-form-select>
</template>

<script>
  import Const from '../utils/const'

  export default {
    data() {
      return {
        limit: 10,
        page_limits: Const.PAGE_LIMIT_OPTIONS,
      }
    },
    methods: {
      onChangeLimit() {
        let self = this

        self.$emit('onChangeLimit', self.limit)
      }
    }
  }
</script>
