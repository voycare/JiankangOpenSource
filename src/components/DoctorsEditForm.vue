<template>
  <div>
    <div class="card">
      <div class="card-body">
        <div class="row doctor--item" v-for="(doctor, idx) in doctors" :key="doctor.id">
          <div>
            <PhotoEdit :avatar_url="doctor.avatar" :width="170" :height="170"
              @onChangeAvatar="onChangeAvatar($event, doctor)" />
            <p class="desc-13">No more than 2MB max. <br>Format: JPG or PNG</p>
          </div>
          <div class="col-sm-9">
            <div class="row">
              <div class="col-sm-6">
                <div class="form-group">
                  <label>Name of Doctor</label>
                  <input type="text" v-model="doctor.name" class="form-control" placeholder="Jane Doe">
                </div>
              </div>
              <div class="col-sm-6">
                <div class="form-group">
                  <label>Title</label>
                  <input type="text" v-model="doctor.title" class="form-control" placeholder="Title">
                </div>
              </div>
            </div>
            <div class="form-group">
              <textarea placeholder="Bio" class="form-control" v-model="doctor.bio" cols="30" rows="5"
                        style="height: auto!important;"></textarea>
            </div>
          </div>
          <div class="col-sm-1">
            <div class="btn btn-link remove--doctor" @click="onRemove(idx)"><i class="hera--trash"></i></div>
          </div>
        </div>
        <div class="text-right form-group">
          <button class="btn btn-link desc-15 text-primary" @click="onAddDoctor">
            <i class="fa fa-plus mr-2"></i>Add Doctor
          </button>
        </div>
      </div>
    </div>

    <div class="text-center">
      <button class="btn btn-round btn-pink save--doctor" @click="onSave">Save</button>
    </div>
  </div>
</template>

<script>
  import PhotoEdit from "./PhotoEdit"

  export default {
    props: ['doctors'],
    components: {
      PhotoEdit
    },
    methods: {
      onRemove(idx) {
        let self = this

        self.doctors.splice(idx, 1)
      },
      onChangeAvatar(img_src, doctor) {
        let self = this

        self.doctors.forEach((item, index) => {
          if (item.id == doctor.id) {
            self.doctors[index].avatar = img_src
          }
        })
      },
      onSave() {
        let self = this

        self.$emit('onSave', self.doctors)
      },
      onAddDoctor() {
        let self = this

        self.doctors.push({
          clinic_id: 0,
          avatar: '',
          name: '',
          title: '',
          bio: ''
        })
      },
    }
  }
</script>
