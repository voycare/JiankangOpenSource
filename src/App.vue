<template>
  <component :is="layout">
    <router-view></router-view>
    <div aria-hidden="true" class="modal fade" id="modal__app" role="dialog" tabindex="-1">
      <div class="modal-dialog modal-sm">
        <div class="modal-content">
          <div class="modal-body" v-html="alert_message"></div>
          <div class="modal-footer">
            <button class="btn btn-secondary" data-dismiss="modal" type="button">Ok</button>
          </div>
        </div>
      </div>
    </div>
    <div aria-atomic="true" aria-live="polite" class="toast" data-delay="1000" id="toast__app" role="alert" style="position: absolute;
    bottom: 70px;
    right: 20px;
    z-index: 1040;">
      <div aria-atomic="true" aria-live="assertive" role="alert">
        <div class="toast-header">
          <strong class="mr-auto">Message</strong>
          <button aria-label="Close" class="ml-2 mb-1 close" data-dismiss="toast" type="button">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="toast-body" v-html="alert_message"></div>
      </div>
    </div>
  </component>
</template>

<script>
  import {mapState} from 'vuex'

  const defaultLayout = "empty";
  export default {
    computed: {
      ...mapState({
        alert_message: state => state.app.alert_message
      }),
      layout() {
        return (this.$route.meta.layout || defaultLayout) + "-layout";
      }
    },
    mounted() {
      console.log(this.$route.meta)
      window.$store = this.$store
    }
  }
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #nav {
    padding: 30px;
  }

  #nav a {
    font-weight: bold;
    color: #2c3e50;
  }

  #nav a.router-link-exact-active {
    color: #42b983;
  }
</style>
