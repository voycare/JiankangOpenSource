<template>
  <div class="card" v-if="clinic">
    <div class="card-body">
      <div class="row">
        <div class="col-6 col-sm-4 col-md-3">
          <img :src="clinic.avatar ? VUE_APP_BASE_URL + clinic.avatar : ''" alt="" class="img-fluid" id="avatar_clinic">
        </div>
        <div class="col-6 col-sm-8 col-md-9">
          <div class="row">
            <div class="col-12 col-sm-12 col-md-5">
              <div class="title-25">{{ clinic.name }}</div>
            </div>
            <div class="col-12 col-sm-12 col-md-7 row">
              <div class="basic-info col-sm-12 col-md-8 pr-0">{{ clinic.address.country }}</div>
              <div class="basic-info col-sm-12 col-md-4 pr-0 clinic--id">ID: {{ clinic.id }}</div>
            </div>
          </div>
          <div class="">
            <p class="basic-info">{{ clinic.profile.type_clinic }}</p>
            <p class="basic-info pt-4">{{ appt_specialty[clinic.profile.specialty_id] }}</p>
          </div>
        </div>
      </div>
      <div class="bottom-dash "></div>
      <div id="information">
        <div class="title-22">Clinic Information</div>
        <div class="row">
          <div class="col-12 col-md-6">
            <ul class="list-unstyled">
              <li class="mb-3">
                <span class="text-label">Email address:</span>
                <span class="text-color-infor">{{ clinic.email }}</span>
              </li>
              <li class="mb-3">
                <span class="text-label">Phone number:</span>
                <span class="text-color-infor">{{ clinic.phone }}</span>
              </li>
              <li>
                    <span class="text-label">Clinic address:
                    </span> {{ clinic.address.full_address }}</li>
            </ul>
          </div>
          <div class="col-12 col-md-6">
            <ul class="list-unstyled">
              <li class="mb-3">
                <span class="text-label">Contact person:</span>
                <span class="text-color-infor">{{ clinic.profile.contact_person }}</span>
              </li>
              <li><span class="text-label">Title:</span>
                <span class="text-color-infor">{{ clinic.profile.title }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="bottom-dash "></div>
      <div class="" id="profile">
        <div class="row">
          <div class="col-md-12">
            <div class="title-22">Clinic Profile</div>
            <p>{{ clinic.profile.description }}</p>
          </div>
        </div>
      </div>
      <div class="bottom-dash "></div>
      <div class="" id="languages">
        <div class="row">
          <div class="col-md-12">
            <div class="title-22">Languages Spoken</div>
            <ul class="nav">
              <li :key="language.id" class="nav-item text-color-infor"
                  v-for="language in clinic.languages">{{ language.language }}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="bottom-dash "></div>
      <div class="row">
        <div class="col-md-12">
          <div class="title-22">Awards / Certifications</div>
          <div class="awards-content">
            <div :key="certificate.id" class="border--all" v-for="certificate in clinic.certificates">
              <div class="">
                <img :src="VUE_APP_BASE_URL + certificate.path" alt="" id="img-award">
                <div class="desc-15">{{ certificate.name }}</div>
                <div class="desc-15 description">{{ certificate.description }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="border--bottom"></div>
    </div>
  </div>

</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    props: ['clinic'],
    computed: {
      ...mapGetters(['countries', 'appt_types', 'appt_status','appt_specialty'])
    },
    mounted() {
      let self = this
      self.$store.dispatch('getCountries')
      self.$store.dispatch('getAppointmentMetas')
    }
  }
</script>

<style media="screen">
  #clinic_profile .card-body {
    padding: 34px 46px 42px 32px;
  }

  #clinic_profile .title {
    padding-bottom: 50px;
  }

  #clinic_profile #avatar_clinic {
    position: absolute;
    background: #C4C4C4;
    margin-right: 10px;
    max-width: 234px;
    height: 137px;
    width: -webkit-fill-available;
  }

  #clinic_profile #img-award {
    position: absolute;
    width: 125px;
    height: 170px;
    background: #C4C4C4;
  }

  #clinic_profile .title-22 {
    padding-bottom: 32px;
  }

  #clinic_profile .basic-info {
    font-size: 20px;
    font-weight: normal;
    line-height: 37px;
    color: #434343;
  }

  #clinic_profile .card-body > .row {
    min-height: 137px;
  }

  #information li {
    display: flex;
  }

  .clinic--id {
    text-align: right;
  }

  .awards-content {
    min-height: 212px;
    padding: 20px;
    border: 1px solid #CBCBCB;
    box-sizing: border-box;
    background: #FFFFFF;
    border-radius: 5px;
  }

  .awards-content .desc-15 {
    margin-left: 140px;
  }

  span.text-color-infor,
  li.text-color-infor {
    color: #EB6271;
  }

  li.text-color-infor {
    padding-right: 20px;
  }

  span.text-label {
    min-width: 130px;
    color: #434343;
    font-weight: 500;
  }

  .awards-content .description {
    overflow: overlay;
    height: 134px;
  }

  .awards-content .description::-webkit-scrollbar {
    display: none;
  }
  #editProfileBtn{
    color: white;
    background-color: #EB6271;
  }

  @media (max-width: 768px) {
    .clinic--id {
      text-align: left;
    }
  }
</style>
