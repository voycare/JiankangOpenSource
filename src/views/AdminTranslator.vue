<template>
  <div>
    <div class="row">
      <div class="col-sm-8">
        <h4 class="page-title bold">Translators</h4>
      </div>
      <div class="col-sm-4 text-right">
        <button class="btn btn-pink btn-rounded">Add translator</button>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12">
        <span class="fa fa-filter"></span>
        <select style="margin-left: 10px">
          <option>10</option>
        </select>
      </div>
      <div class="col-sm-12">
        <div class="table-responsive table table-bordered table-striped">
          <table class="table mb-0">
            <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th></th>
            </tr>
            </thead>
            <tbody>
            <tr :key="index" v-for="(translator, index) in translators">
              <td>{{Utils.getName( translator)}}</td>
              <td>{{translator.phone}}</td>
              <td>{{translator.email}}</td>
              <td>
                <a href="#">
                  <svg class="bi bi-three-dots-vertical" fill="currentColor" height="1em"
                       viewBox="0 0 16 16"
                       width="1em" xmlns="http://www.w3.org/2000/svg">
                    <path clip-rule="evenodd"
                          d="M9.5 13a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm0-5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm0-5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
                          fill-rule="evenodd"/>
                  </svg>
                </a>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import API from "../utils/api";
  import Utils from "../utils/utils";
  import ClientUtils from "../utils/clientUtils";
  import Const from "../utils/const"


  export default {
    name: "Admintranslator",
    data() {
      return {
        Utils: ClientUtils,
        Const: Const,
        translator: {
          id: 0,
          first_name: "",
          last_name: "",
          email: "",
          address: {
            full_address: ''
          },
          avatar: "",
          phone: "",
          birthday: 0
        },
        translators: [],
      }
    },
    mounted() {
      this.gettranslator()
    },
    methods: {
      gettranslator() {
        fetch(API.getApi(API.ADMIN.CLIENT.LIST), {
          method: 'post',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            authorization: Utils.getLocalAdmin().token
          },
          body: JSON.stringify({
            type: 1,
            sort_created: "asc"
          })
        }).then(res => res.json()).then(res => {
          this.translators = res.data.datas;
        }).catch(e => {
          console.log(e)
        });
      }
    }
  }
</script>

<style scoped>

</style>
