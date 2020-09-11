<template>
  <div v-if="clinic">
    <div class="card">
      <div class="card-body">
        <h3 class="title-18" style="color: #434343;">Clinic Information</h3>

        <div class="row">
          <div class="col-sm-3">
            <PhotoEdit :avatar_url="clinic.avatar"  :width="260" :height="170"
              @onChangeAvatar="onChangeAvatar" />

            <p class="desc-15 mb-1 mt-2">No more than 2MB max.</p>
            <p class="desc-15 mt-0">Format: JPG or PNG</p>
          </div>
          <div class="col-sm-9">
            <div class="row">
              <div class="col-sm-12">
                <div class="form-group">
                  <label>Name of practice or clinic</label>
                  <input class="form-control pink-text" readonly="true" type="text" v-model="clinic.name" />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-6 form-group">
                <label>Type of practice or clinic</label>
                <input
                    class="form-control pink-text"
                    readonly="true"
                    type="text"
                    v-model="clinic.profile.type_clinic"
                />
              </div>
              <div class="col-sm-6 form-group">
                <label>Speciality</label>
                <!-- <b-form-select v-model="clinic.specialty_id" class="form-control">
                  <b-form-select-option
                    v-for="(spec, id) in appt_specialty"
                    :key="id"
                    :value="id"
                  >{{spec}}</b-form-select-option>
                </b-form-select>-->
                <select class="form-control" v-model="clinic.profile.specialty_id">
                  <option hidden value="null">Select</option>
                  <option :key="id" :value="id" v-for="(spec, id) in appt_specialty">{{ spec }}</option>
                </select>
              </div>
            </div>

            <div class="row">
              <div class="col-sm-6 form-group">
                <label for>Email address</label>
                <input class="form-control pink-text" readonly type="email" v-model="clinic.email" />
              </div>

              <div class="col-sm-6 form-group">
                <label for>Phone number</label>
                <input class="form-control pink-text" readonly type="text" v-model="clinic.phone" />
              </div>
            </div>

            <div class="row">
              <div class="col-sm-6 form-group">
                <label for>Contact Person</label>
                <input class="form-control pink-text" readonly type="text" v-model="clinic.profile.contact_person" />
              </div>

              <div class="col-sm-6 form-group">
                <label for>Title</label>
                <input class="form-control pink-text" readonly type="text" v-model="clinic.profile.title" />
              </div>
            </div>
            <label for>Clinic address</label>
            <div class="row">
              <div class="col-sm-6 form-group">
                <input
                    class="form-control"
                    placeholder="Street line 1"
                    type="text"
                    v-model="clinic.address.street_line_1"
                />
              </div>

              <div class="col-sm-6 form-group">
                <input
                    class="form-control"
                    placeholder="Street line 2"
                    type="text"
                    v-model="clinic.address.street_line_2"
                />
              </div>
            </div>

            <div class="row">
              <div class="col-sm-4 form-group">
                <label for></label>
                <input
                    class="form-control"
                    placeholder="City"
                    type="text"
                    v-model="clinic.address.city"
                />
              </div>

              <div class="col-sm-4 form-group">
                <label for></label>
                <input
                    class="form-control"
                    placeholder="State/Province"
                    type="text"
                    v-model="clinic.address.state"
                />
              </div>

              <div class="col-sm-4 form-group">
                <label for></label>
                <select readonly disabled class="form-control pink-text" v-model="clinic.address.country">
                  <option disabled hidden value="null">Country</option>
                  <option :key="country.id" :value="country.name" v-for="country in countries">
                    {{ country.name }}</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-body">
        <h3 class="title-18">Clinic Profile</h3>
        <textarea class="form-control" cols="30" rows="10" v-model="clinic.profile.description"></textarea>
      </div>
    </div>

    <div class="card">
      <div class="card-body">
        <h3 class="title-18">Languages Spoken</h3>

        <div class="form-inline">
          <button
            :key="language.id"
            class="btn mr-4 language-btn"
            v-for="language in clinic.languages"
            @mouseenter="languageHovered = language"
            @mouseleave="languageHovered = null"
            :class="{'language-btn_hovered': languageHovered === language}"
        >
            <span>{{ language.language }}</span>
            <img :class="{'language-btn-img_hovered': languageHovered === language}"
                 @click="onClinicLanguageRemove(language.id)"
                 src="@/assets/trash-bin.svg"  />
          </button>

          <select
              @change="onClinicLanguageSave"
              class="form-control mr-2"
              v-if="toggle_country"
              v-model="country_selected"
          >
            <option value="null">Language</option>
            <option
                :key="country.id"
                :value="country.name"
                v-for="country in countries"
            >{{ country.name }}</option>
          </select>

          <button @click="toggle_country = true" class="btn btn-link" 
            style="color: #EB6271;height: 38px; margin-bottom: 10px;">
            <i class="fa fa-plus"></i>
          </button>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-body">
        <h3 class="title-18">Awards / Certifications</h3>
        <div
            :key="certificate.id"
            class="border--bottom mt-2 mb-2"
            v-for="(certificate, index) in clinic.certificates"
        >
          <label for>Title of certificate</label>
          <div class="row certificate-div">
            <div class="col-sm-8">
              <div class="row">
                <div class="col-sm-6">
                  <div class="form-group">
                    <input
                        class="form-control"
                        placeholder="Title"
                        type="text"
                        v-model="certificate.name"
                    />
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="form-group">
                    <b-form-group>
                      <b-form-file 
                        accept="image/*"
                        @change="takeCertificatePhoto($event, index)" 
                        placeholder="Upload certificate"
                      ></b-form-file>
                    </b-form-group>
                    <small>No more than 2MB max.</small><br/>
                    <small>Format: JPG or PNG</small>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-6">
                  <div class="form-group">
                    <label for>Issuer of certificate</label>
                    <input
                        class="form-control"
                        placeholder="Issuer"
                        type="text"
                        v-model="certificate.description"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="col-sm-4">
              <div class="certificate--thumb">
                <img :src="certificate.path" v-if="certificate.path" width="125" />
                <img src="https://via.placeholder.com/125x170" v-else />
                <img class="deleteIcon" src="@/assets/trash-bin-dark.svg" @click="removeAvatar(index)" />
              </div>

            </div>
          </div>
        </div>


        <div class="row">
          <div class="col-sm-12 text-right">
            <button @click="onAddCertificate" class="btn btn-link" style="color: #EB6271;">
              <i class="fa fa-plus"></i> Add Certificate
            </button>
          </div>
        </div>
      </div>
    </div>


    <div class="text-center mb-5">
      <button @click="onSave" class="btn btn-round btn-save">Save</button>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from "vuex";

  import Const from "./../utils/const";
  import PhotoEdit from "../components/PhotoEdit";

  export default {
    components: {
      PhotoEdit
    },
    props: ['clinic'],
    computed: {
      ...mapGetters(["countries", "appt_specialty"])
    },
    data() {
      return {
        Const,
        imgSrc: '',
        languageHovered: null,
        toggle_country: false,
      }
    },
    mounted() {
      let self = this

      self.$store.dispatch("getCountries");
      self.$store.dispatch("getAppointmentMetas");
    },
    methods: {
      onClinicLanguageRemove(id) {
        let self = this

        self.country_selected = null
        self.toggle_country = false

        self.$emit('onClinicLanguageRemove', id)
      },
      onClinicLanguageSave() {
        let self = this
        self.$emit('onClinicLanguageSave', self.country_selected)
      },
      onSave() {
        let self = this
        self.$emit('onSave', self.clinic)
      },
      onChangeAvatar(imgSrc) {
        this.imgSrc = imgSrc;
      },
      takeCertificatePhoto(e, index) {
        let self = this;
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = event => {
          self.clinic.certificates[index].path = event.target.result;
        };
        reader.readAsDataURL(file);
      },
      onAddCertificate() {
        let self = this;

        if (self.clinic) {
          self.clinic.certificates.push({
            name: "",
            description: "",
            clinic_id: self.clinic.id,
            path: ""
          });
        }
      },
      removeAvatar(index){
        this.clinic.certificates[index].path = null 
      }
    }
  }
</script>
<style scoped>
.certificate--thumb{
  position: relative;
}
.pink-text{
  color: #EB6271;
}
</style>
