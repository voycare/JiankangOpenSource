<template>
  <div>
    <div class="title title-22 mb-3">Edit Services</div>
    <div class="card" v-if="services.length">
      <div class="card-body">
        <p class="desc-18">Consulation Type</p>
        <div :key="service.id" v-for="service in services">
          <div class="row mb-3" v-if="service.type == 1">
            <div class="col-sm-4 consultation-type-label">
              Online consulation (audio/video)
            </div>
            <div class="col-sm-4 d-flex justify-content-around align-items-center">
              <span>Duration</span>
              <select class="form-control" v-model="service.duration" style="width: 120px;">
                <option value="5">5 min</option>
                <option value="10">10 min</option>
                <option value="20">20 min</option>
                <option value="30">30 min</option>
                <option value="50">50 min</option>
              </select>
            </div>
            <div class="col-sm-4 d-flex justify-content-around align-items-center">
              <span>Price $</span>
              <input class="form-control" type="number" v-model="service.price" style="width: 120px;">
              <span>USD</span>
            </div>
          </div>

          <div class="row mb-3" v-if="service.type == 2">
            <div class="col-sm-4 consultation-type-label">
              Site visit appointment
            </div>
            <div class="col-sm-4 d-flex justify-content-around align-items-center">
              <span>Duration</span>
              <input class="form-control" disabled placeholder="N/A" type="text" style="width: 120px;">
            </div>
            <div class="col-sm-4 d-flex justify-content-around align-items-center">
              <span>Price $</span>
              <input class="form-control" type="number" v-model="service.price" style="width: 120px;">
              <span>USD</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="card mb-5">
      <div class="card-body">
        <div class="block--treatment">
          <p class="desc-18">Treatments</p>
          <p>Please list all available on site treatments you currently offer along with
            minimum pricing information and treatment description.</p>

          <div :key="treatment.id" class="" v-for="(treatment, index) in treatments">
            <div class="row d-flex align-items-center">
              <div class="col-sm-10">
                <div class="row">
                  <div class="col-sm-5">
                    <div class="form-group">
                      <label>Type of treatment</label>
                      <input class="form-control" placeholder="Type" type="text"
                             v-model="treatment.type">
                    </div>
                  </div>
                  <div class="offset-sm-2 col-sm-5">
                    <div class="form-group">
                      <label class="d-block ml-3">From</label>
                      <div class="d-flex align-items-center">
                        <span class="d-block mr-1 font-weight-500">$</span>
                        <input class="form-control mb-0" placeholder="000" type="number"
                               v-model="treatment.from">
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-12">
                    <div class="form-group">
                    <textarea class="form-control" cols="30"
                              placeholder="Simple explanation of the treatment" rows="4"
                              v-model="treatment.description"></textarea>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-sm-2 text-right">
                <button @click="onRemoveTreatment(index)" class="btn btn-link"><i class="fa fa-trash"></i>
                </button>
              </div>
            </div>
            <hr class="my-3" style="border-top: 0.5px solid #979797"/>
          </div>

        </div>

        <button @click="onAddTreatment" class="btn btn-text" id="addTreatmentBtn">
          <i class="fa fa-plus mr-2"></i>Add treatment
        </button>
      </div>
    </div>

    <div class="text-center">
      <button id="saveBtn" @click="onSaveServices" class="btn btn-pink btn-round btn-lg">Save</button>
    </div>
  </div>
</template>

<script>
  import Const from "./../utils/const"

  export default {
    props: ['services', 'treatments'],
    data() {
      return {
        Const
      }
    },
    methods: {
      onAddTreatment() {
        let self = this

        self.treatments.push({
          clinic_id: 0,
          type: '',
          from: '',
          description: ''
        })
      },
      onRemoveTreatment(index) {
        let self = this

        self.treatments.splice(index, 1)
      },
      onSaveServices() {
        let self = this

        self.$emit('onSaveServices', self.services, self.treatments)
      }
    }
  }
</script>

<style scoped>
  .consultation-type-label{
    font-weight: 500;
    line-height: 40px;
  }
  #addTreatmentBtn{
    color: #EB6271;
    float: right;
  }
  #saveBtn{
    width: 250px;
  }
</style>
