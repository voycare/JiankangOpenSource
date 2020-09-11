<template>
  <div class="card member-panel">
    <div class="card-header bg-white">
      <h4 class="card-title mb-0 title-20">{{ title }}</h4>
    </div>

    <div class="card-body p-0">
      <div class="table-responsive">
        <table class="table mb-0 top--widget b-0">
          <tr>
            <th class="p-0"></th>
            <th class="p-0" style="width:100px"></th>
          </tr>
          <tr :key="clinic.id" v-for="clinic in clinics">
            <td v-if="clinic.rate > 0">
              <div style="width: 70px;height:40px;background-color: #c4c4c4;float:left;margin-right:20px"></div>
              <h2 class="time-title title-15">
                {{ clinic.name }}
              </h2>
              <div class="text-desc desc-11">{{ clinic.address.full_address }}</div>
            </td>
            <td class="valign-middle" style="max-width: 100px" v-if="clinic.rate > 0">
              <i :key="'i' + i" class="fa fa-star text-warning" v-for="i in clinic.rate"></i>
              <i :key="'j' + i" class="fa fa-star text-muted" v-for="i in (5 - clinic.rate)"></i>
              <span class="ml-1 title-16">{{ clinic.rate }}</span>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div class="card-footer text-center bg-white border-top">
      <router-link class="text-muted" to="/doctors">View all Doctors</router-link>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['title', 'clinics']
  }
</script>

<style>
  .top--widget td {
    padding: 5px 10px;
    border-bottom: 0.5px solid #dee2e6;
  }

  .top--widget tr:last-child td {
    border-bottom: 0px !important;
  }

  .text-desc {
    color: #898989
  }
</style>
