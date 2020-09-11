<template>
  <div class="paginate--wrapper">
    <div class="pull-right pagination" v-if="total_page>=1">
      <div class="pagination">
        <template v-if="total_page<=10">
          <li :class="{active:setActive(page,current_page)}" v-bind:key="pageIndex"
              v-for="(page, pageIndex) in total_page">
            <a v-on:click="getData(page)">{{page}}</a>
          </li>
        </template>
        <template v-else>
          <li v-if="current_page>1">
            <a v-on:click="getData(current_page-1)">Previous</a>
          </li>
          <template v-if="current_page<=6">
            <li :class="{active:setActive(page,current_page)}" v-bind:key="pageIndex"
                v-for="(page, pageIndex) in 10">
              <a v-on:click="getData(page)">{{page}}</a>
            </li>
          </template>
          <template v-else>
            <template v-if="current_page<total_page-5">
              <li :class="{active:setActive((page+current_page-6),current_page)}" v-bind:key="pageIndex"
                  v-for="(page, pageIndex) in 10">
                <a v-on:click="getData((page+current_page-6))">
                  {{page+current_page-6}}</a>
              </li>
            </template>
            <template v-else>
              <li :class="{active:setActive((page+total_page-10),current_page)}" v-bind:key="pageIndex"
                  v-for="(page, pageIndex) in 10">
                <a v-on:click="getData((page+total_page-10))">
                  {{page+total_page-10}}
                </a>
              </li>
            </template>
          </template>
          <li v-if="current_page<total_page">
            <a v-on:click="getData(current_page+1)">Next</a>
          </li>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      total_page: {
        type: Number,
        require: true
      },
      current_page: {
        type: Number,
        require: true
      }
    },
    methods: {
      setActive(page, current_page) {
        return page == current_page;
      },
      getData(page) {
        return this.$emit('pageData', page);
      }
    }
  }
</script>

<style scoped>
  .paginate--wrapper li {
    color: #020644;
    cursor: pointer;
  }
  .paginate--wrapper li a {
    background-color: lightgrey;
    margin-left: 5px;
    border-radius: 5px;
  }
  .paginate--wrapper li.active a {
    background-color: #EB6271;
    color: white;
  }
  .paginate--wrapper li.active a:hover {
    background-color: #FFAFAE;
    color: #020644 !important;
  }
</style>
