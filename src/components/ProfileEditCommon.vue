<template>
  <div v-if="user">
    <div class="basic-infor">
      <p class="title-basic">Basic Information</p>
      <div class="content-basic-infor">
        <div>
          <PhotoEdit :avatar_url="user.avatar" :width="170" :height="170" @onChangeAvatar="onChangeAvatar"></PhotoEdit>
          <span class="desc-13">No more than 2MB max. <br>Format: JPG or PNG</span>
        </div>
        <div class="content-infor">
          <div class="content-1">
            <span>First Name</span><br>
            <input type="text" class="form-control" v-model="user.first_name"><br>
            <span>Date of Birth</span><br>
            <date-picker style="width: 100%;" v-model="birthdayUser" value-type="timestamp"></date-picker>
          </div>
          <div class="content-2">
            <span>Last Name</span><br>
            <input type="text" class="form-control" v-model="user.last_name"><br>
            <span>Gender</span>
            <select class="form-control" v-model="user.gender">
              <option value="1">Male</option>
              <option value="2">Female</option>
              <option value="3">Other</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <div class="contact-infor">
      <p class="title-contact">Contact Information</p>
      <div class="mail-phone">
        <div class="mail">
          <span>Email</span><br>
          <input class="form-control" type="text" v-model="user.email">
        </div>
        <div class="phone">
          <span>Phone</span><br>
          <input type="text" class="form-control" v-model="user.phone">
        </div>
      </div>
      <div class="row">
        <div class="col-sm-4">
          <span>City</span>
          <input type="text" class="form-control" v-model="user.address.city">
        </div>
        <div class="col-sm-4">
          <span>State/Province</span>
          <input type="text" class="form-control" v-model="user.address.state">
        </div>
        <div class="col-sm-4">
          <span>Country</span>
          <select class="form-control" v-model="user.address.country">
            <option disabled hidden value="">Select Country</option>
            <option :key="item.id" :value="item.name" v-for="item in countries">{{item.name}}</option>
          </select>
        </div>

      </div>
    </div>
    <div class="save">
      <button @click="saveEditProfile">SAVE</button>
    </div>
  </div>
</template>

<script>
  import DatePicker from 'vue2-datepicker'
  import moment from 'moment'
  import utils from "../utils/utils"
  import rf from "../api/RequestFactory"
  import PhotoEdit from '../components/PhotoEdit'
  import {mapGetters} from 'vuex'

  export default {
    props: ['user'],
    components: {
      PhotoEdit,
      DatePicker
    },
    computed: {
      ...mapGetters(['countries'])
    },
    data() {
      return {
        imgSrc: '',
        birthdayUser: null,
      }
    },
    mounted() {
      let self = this

      self.$store.dispatch('getCountries')
      self.birthdayUser = self.user.birthday * 1000//self.$options.filters.convertTimeSecondToDate()
    },
    methods: {
      onChangeAvatar(imgSrc) {
        this.imgSrc = imgSrc
      },
      formatDate(date) {
        return date ? moment(date).format('YYYY-MM-DD') : ''
      },
      saveEditProfile() {
        if (!this.user.first_name) {
          window.$store.dispatch('app/showModal', {message: 'First Name is required'})
          return;
        }
        let params = {
          first_name: this.user.first_name,
          last_name: this.user.last_name,
          avatar: this.imgSrc,
          gender: this.user.gender,
          phone: this.user.phone,
          country: this.user.address.country,
          state: this.user.address.state,
          city: this.user.address.city,
          birthday: new Date(this.birthdayUser).getTime() / 1000
        }

        rf.getRequest('UserRequest').editProfile(params).then(res => {
          let userEdit = res.data;
          userEdit.token = this.user.token;
          this.user = userEdit;
          utils.setLocalUser(userEdit)
        });
      }
    }
  }
</script>
<style>
  .content {
    padding: 0px 30px;
  }

  .content .edit-profile {
    padding-top: 10px;
  }

  .content .edit-profile .back {
    font-family: Poppins;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 27px;
    color: #020544;
    margin-left: 4px;
  }

  .content .edit-profile .title-edit {
    font-family: Poppins;
    font-style: normal;
    font-weight: 500;
    font-size: 22px;
    line-height: 33px;
    margin-top: 30px;
    margin-left: 15px;
    margin-bottom: 15px;
    color: #020644;
  }

  .content .edit-profile .basic-infor {
    margin-left: 15px;
    background-color: white;
    border-radius: 5px;
    padding: 20px 20px;
  }

  .content .edit-profile .basic-infor .title-basic {
    font-family: Poppins;
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 27px;
    color: #434343;
  }

  .content .edit-profile .basic-infor .content-basic-infor {
    display: flex;
    padding-top: 15px;
  }

  .content .edit-profile .basic-infor .content-basic-infor .no-avatar {
    background: #C4C4C4;
  }

  .content .edit-profile .basic-infor .content-basic-infor .content-infor {
    width: 85.5%;
    display: flex;
  }

  /* .content .edit-profile .basic-infor .content-basic-infor .content-infor input {
    width: 100%;
    height: 40px;
    background: #FFFFFF;
    border: 1px solid #CBCBCB;
    box-sizing: border-box;
    font-family: Poppins;
    font-style: normal;
    font-weight: normal;
    font-size: 15px;
    line-height: 22px;
    padding-left: 15px;
    color: #EB6271;
    margin-top: 10px;
    margin-bottom: 25px;
  } */

  .content .edit-profile .basic-infor .content-basic-infor .content-infor span {
    font-family: Poppins;
    font-style: normal;
    font-weight: 500;
    font-size: 15px;
    line-height: 22px;
    color: #434343;
  }

  .content .edit-profile .basic-infor .content-basic-infor .content-infor .content-1 {
    margin-left: 40px;
    margin-right: 20px;
    width: 50%;
  }

  .content .edit-profile .basic-infor .content-basic-infor .content-infor .content-1 .date-picker {
    width: 100%;
    margin-top: 10px;
  }

  .content .edit-profile .basic-infor .content-basic-infor .content-infor .content-1 .date-picker input.mx-input {
    border: 1px solid #CBCBCB;
    box-sizing: border-box;
    font-family: Poppins;
    font-style: normal;
    font-weight: normal;
    font-size: 15px;
    line-height: 22px;
    padding-left: 15px;
    color: #EB6271;
  }

  .content .edit-profile .basic-infor .content-basic-infor .content-infor .content-2 {
    width: 50%;
  }

  /* .content .edit-profile .basic-infor .content-basic-infor .content-infor .content-2 select {
    width: 100%;
    height: 40px;
    background: #FFFFFF;
    border: 1px solid #CBCBCB;
    box-sizing: border-box;
    font-family: Poppins;
    font-style: normal;
    font-weight: normal;
    font-size: 15px;
    line-height: 22px;
    color: #EB6271;
    margin-top: 10px;
    padding-left: 15px;
  } */

  .content .edit-profile .contact-infor {
    margin-left: 15px;
    margin-top: 25px;
    margin-bottom: 1rem;
    background-color: white;
    border-radius: 5px;
    padding: 20px 20px;
  }

  .content .edit-profile .contact-infor .title-contact {
    font-family: Poppins;
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 27px;
    color: #434343;
  }

  .content .edit-profile .contact-infor .mail-phone {
    padding-top: 5px;
    display: flex;
  }

  /* .content .edit-profile .contact-infor .mail-phone input {
    width: 100%;
    height: 40px;
    background: #FFFFFF;
    border: 1px solid #CBCBCB;
    box-sizing: border-box;
    font-family: Poppins;
    font-style: normal;
    font-weight: normal;
    font-size: 15px;
    line-height: 22px;
    padding-left: 15px;
    color: #EB6271;
    margin-top: 10px;
    margin-bottom: 25px;
  } */

  .content .edit-profile .contact-infor .mail-phone span {
    font-family: Poppins;
    font-style: normal;
    font-weight: 500;
    font-size: 15px;
    line-height: 22px;
    color: #434343;
  }

  .content .edit-profile .contact-infor .mail-phone .mail {
    width: 50%;
    margin-right: 40px;
  }

  .content .edit-profile .contact-infor .mail-phone .phone {
    width: 50%;
  }

  .content .edit-profile .contact-infor .address-infor {
    display: flex;
  }

  .content .edit-profile .contact-infor .address-infor span {
    font-family: Poppins;
    font-style: normal;
    font-weight: 500;
    font-size: 15px;
    line-height: 22px;
    color: #434343;
  }

  .content .edit-profile .contact-infor .address-infor input {
    width: 100%;
    height: 40px;
    background: #FFFFFF;
    border: 1px solid #CBCBCB;
    box-sizing: border-box;
    font-family: Poppins;
    font-style: normal;
    font-weight: normal;
    font-size: 15px;
    line-height: 22px;
    padding-left: 15px;
    color: #EB6271;
    margin-top: 10px;
  }

  .content .edit-profile .contact-infor .address-infor .country-infor {
    width: 50%;
    margin-right: 40px;
  }

  .content .edit-profile .contact-infor .address-infor .country-infor select {
    width: 100%;
    height: 40px;
    background: #FFFFFF;
    border: 1px solid #CBCBCB;
    box-sizing: border-box;
    font-family: Poppins;
    font-style: normal;
    font-weight: normal;
    font-size: 15px;
    line-height: 22px;
    color: #EB6271;
    margin-top: 10px;
    padding-left: 15px;
  }

  .content .edit-profile .contact-infor .address-infor .city-infor {
    width: 50%;
  }

  .content .edit-profile .save {
    text-align: center;
    margin-bottom: 100px;
  }

  .content .edit-profile .save button {
    width: 253px;
    height: 45px;
    border: none;
    cursor: pointer;
    background: #EB6271;
    border-radius: 50px;
    font-family: Poppins;
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    color: #FFFFFF;
  }

  .content .profile {
    padding: 30px 0px;
  }

  .content .profile .content-profile {
    width: 100%;
    height: 100%;
    margin-top: 35px;
    display: flex;
  }

  .content .profile .content-profile .content-1 {
    width: 33.3%;
    margin-right: 20px;
  }

  .content .profile .content-profile .content-1 .name-content {
    min-height: 210px;
    background-color: white;
    padding-left: 20px;
    padding-top: 30px;
    display: flex;
    border-radius: 5px;
  }

  .content .profile .content-profile .content-1 .name-content img {
    width: 140px;
    height: 140px;
    border-radius: 70px;
  }

  .content .profile .content-profile .content-1 .name-content .no-avatar {
    background: #C4C4C4;
  }

  .content .profile .content-profile .content-1 .name-content .name-user {
    margin-top: 40px;
    margin-left: 20px;
  }

  .content .profile .content-profile .content-1 .name-content .name-user .id-user {
    font-family: Poppins;
    font-style: normal;
    font-weight: normal;
    font-size: 13px;
    line-height: 19px;
    color: #434343;
    margin-top: 6px;
  }

  .content .profile .content-profile .content-1 .name-content .name-user .full-name {
    font-family: Poppins;
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 27px;
    color: #434343;
  }

  .content .profile .content-profile .content-1 .name-content .name-user img {
    width: 25px;
    height: 25px;
    margin-left: 15px;
  }

  .content .profile .content-profile .content-2 {
    border-radius: 5px;
    min-height: 420px;
    background-color: white;
    width: 66.6%;
    display: flex;
  }

  .content .profile .content-profile .content-2 .infor-user {
    width: 80%;
    padding-top: 30px;
    padding-left: 30px;
  }

  .content .profile .content-profile .content-2 .infor-user p {
    font-family: Poppins;
    font-style: normal;
    font-weight: 500;
    font-size: 15px;
    line-height: 22px;
    color: #434343;
    margin-block-start: 0 !important;
  }

  .content .profile .content-profile .content-2 .infor-user .infor {
    display: flex;
  }

  .content .profile .content-profile .content-2 .infor-user .infor .title {
    width: 25%;
  }

  .content .profile .header-profile {
    position: relative;
  }

  .content .profile .header-profile .title {
    font-family: Poppins;
    font-style: normal;
    font-weight: 500;
    font-size: 22px;
    line-height: 33px;
    color: #020644;
  }

  .content .profile .header-profile .btn-edit {
    padding: 7px 15px;
    background: #EB6271;
    border-radius: 100px;
    font-family: Poppins;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 18px;
    color: #FFFFFF;
    cursor: pointer;
    right: 0;
    position: absolute;
  }

  .content .profile .header-profile .btn-edit img {
    margin-right: 6px;
  }
</style>
