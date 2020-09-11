<template>
  <div class="main-wrapper  account-wrapper">
    <div class="account-page">
      <div class="account-center">
        <div class="account-box">
          <form action="index.html" class="form-signin">
            <div class="account-logo">
              <a href="index.html"><img alt="" src="assets/img/Hera_LOGO.png"></a>
            </div>
            <div class="form-group">
              <label>Email Address</label>
              <small class="text-danger" style="display: block">{{error.email}}</small>
              <input class="form-control" type="email" v-model="input.email">
            </div>
            <div class="form-group">
              <label>Password</label>
              <small class="text-danger" style="display: block">{{error.password}}</small>
              <input class="form-control" type="password" v-model="input.password">
            </div>
            <div class="form-group">
              <label>Mobile Number</label>
              <small class="text-danger" style="display: block">{{error.phone}}</small>
              <input class="form-control" type="text" v-model="input.phone">
            </div>
            <div class="form-group">
              <label>First Name</label>
              <small class="text-danger" style="display: block">{{error.first_name}}</small>
              <input class="form-control" type="text" v-model="input.first_name">
            </div>
            <div class="form-group">
              <label>Last Name</label>
              <small class="text-danger" style="display: block">{{error.last_name}}</small>
              <input class="form-control" type="text" v-model="input.last_name">
            </div>

            <div class="form-group">
              <label>Gender</label>
              <small class="text-danger" style="display: block">{{error.gender}}</small>
              <select class="form-control" required v-model="input.gender">
                <option value="">Select One</option>
                <option :value="API.CONST.GENDER.MALE">Male</option>
                <option :value="API.CONST.GENDER.FEMALE">Female</option>
                <option :value="API.CONST.GENDER.OTHER">Other</option>
              </select>
            </div>
            <div class="form-group checkbox">
              <small class="text-danger" style="display: block">{{error.agreement}}</small>
              <label>
                <input type="checkbox" v-model="agreement"> I have read and agree the Terms & Conditions
              </label>
            </div>
            <div class="form-group text-center">
              <button @click.prevent="register" class="btn btn-primary account-btn btn-pink" type="submit">Signup
              </button>
            </div>
            <div class="text-center login-link">
              Already have an account? <a href="/login">Login</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import API from "./../utils/api"

  export default {
    name: "RegisterLayout",
    data() {
      return {
        agreement: false,
        input: {
          email: "",
          password: "",
          phone: "",
          gender: "",
          first_name: "",
          last_name: "",
        },
        error: {
          email: "",
          password: "",
          phone: "",
          gender: "",
          first_name: "",
          last_name: "",
          agreement: ""
        },
        API: API
      }
    },
    mounted() {

    },
    methods: {
      validateInput: function () {
        let result = true;
        if (!this.input.email) {
          this.error.email = "email cannot be empty";
          result = false;
        } else {
          this.error.email = "";
        }
        if (this.input.email && !/\S+@\S+\.\S+/.test(this.input.email)) {
          this.error.email = "email invalid";
          result = false;
        }
        if (!this.input.password || this.input.length < 6 || this.input.length > 128) {
          this.error.password = "password cannot be empty. and length must between 6 - 128 character";
          result = false;
        } else {
          this.error.password = "";
        }
        if (!this.input.phone) {
          this.error.phone = "phone cannot be empty.";
          result = false;
        } else {
          this.error.phone = "";
        }
        if (this.input.gender === "") {
          this.error.gender = "gender must be chose.";
          result = false;
        } else {
          this.error.gender = "";
        }
        if (!this.input.first_name) {
          this.error.first_name = "name cannot be empty.";
          result = false;
        } else {
          this.error.first_name = "";
        }
        if (!this.input.last_name) {
          this.error.last_name = "last name cannot be empty.";
          result = false;
        } else {
          this.error.last_name = "";
        }
        if (!this.agreement) {
          this.error.agreement = "please read and confirm our agreement";
          result = false;
        } else {
          this.error.agreement = "";
        }
        return result;
      },
      register: function () {
        let self = this

        console.log(API.getApi(API.AUTH.REGISTER));
        if (!this.validateInput()) {
          return null;
        }
        fetch(API.getApi(API.AUTH.REGISTER), {
          method: 'post',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(Object.assign(this.input, {
            "role": API.CONST.ROLE.CLIENT,
            "provide_id": ""
          }))
        }).then(res => res.json()).then(res => {
          switch (res.status) {
            case 200: {
              alert("please login to your email to active account.\nIt may take several minutes to be deliver email to your account");
              self.$router.push({path: '/'})
              return;
            }
            case 414: {
              this.error.email = "this email has been register";
              return;
            }
            default: {
              console.log(res);
              return;
            }
          }
        }).catch(e => {
          console.log(e)
        });
      }
    }
  }
</script>

<style scoped>

</style>
