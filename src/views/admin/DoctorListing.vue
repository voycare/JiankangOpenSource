<template>
  <div>
    <div class="row">
      <div class="col-sm-6">
        <p class="title title-22">Doctors</p>
      </div>
    </div>

    <DoctorListingTable :doctors="doctors" :total_page="total_page" :current_page="current_page" @onRemove="onRemove" @getListing="getListing"></DoctorListingTable>
  </div>
</template>
<script>
  import rf from "../../api/RequestFactory"
  import DoctorListingTable from "../../components/DoctorListingTable"

  export default {
    components: {
      DoctorListingTable,
    },
    data() {
      return {
        doctors: [],
        total_page: 0,
        current_page: 0
      }
    },
    mounted() {
      let self = this
      self.getListing(self.current_page)
    },
    methods: {
      getListing(page) {
        let self = this
        let params = {
          page: page,
          sort_created: this.sort_created
        };

        rf.getRequest('AdminRequest').getDoctors(params).then(res => {
          self.doctors = res.data.datas
          self.total_page = res.data.total_page
          self.current_page = page
        })
      },
      onRemove(id) {
        let self = this
        var r = confirm("Are you want to remove this clinic?");
        if (!r)
          return

        rf.getRequest('AdminRequest').postDoctorRemove(id).then(res => {
          self.getListing(1)
        })
      },
    }
  }
</script>
<style>
  .form-control {
    display: block;
    width: 100%;
    height: calc(2.25rem + 2px) !important;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    min-height: 0px;
    margin-bottom: 10px;
  }

  .form-control-sm {
    height: calc(1.8125rem + 2px) !important;
    padding: 0.25rem 0.5rem;
    font-size: 0.875rem;
    line-height: 1.5;
    border-radius: 0.2rem;
  }

  select.form-control {
    border-radius: 0px;
    border-width: 1px;
    border-style: solid;
    border-color: -internal-light-dark-color(
        rgb(118, 118, 118),
        rgb(195, 195, 195)
    );
    border-image: initial;

  }

  select.form-control:hover,
  select.form-control:focus {
    border-top: 1px solid rgb(118, 118, 118);
    border-bottom: 1px solid rgb(118, 118, 118);
    border-right: 1px solid rgb(118, 118, 118);
    border-left: 1px solid rgb(118, 118, 118);
  }

</style>
