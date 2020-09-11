<template>
  <div>
    <div class="card" id="consultationType" v-if="services.length">
      <div class="card-body">
        <div class="title-20 mb-4">
          Consultation type
        </div>
        <div :key="service.id" v-for="service in services">
          <div class="row mb-2" v-if="service.type == 1">
            <div class="col-sm-4 font-weight-500">
              Online consulation (audio/video)
            </div>
            <div class="col-sm-2">
              {{ service.duration }} min
            </div>
            <div class="col-sm-2">
              <span>$</span>{{ service.price }}<span> USD</span>
            </div>
          </div>

          <div class="row mb-2" v-if="service.type == 2">
            <div class="col-sm-4 font-weight-500">
              Site visit appointment
            </div>
            <div class="col-sm-2">
              {{ service.duration }} N/A
            </div>
            <div class="col-sm-2">
              <span>$</span>{{ service.price }}<span> USD</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="card" v-if="treatments.length">
      <div class="card-body">
        <div class="title-20 mb-4">
          Treatments
        </div>

        <div :key="treatment.id" class="block--treatment" v-for="treatment in treatments">
          <div class="row mb-3">
            <div class="col-sm-4 desc-18">
              {{ treatment.type }}
            </div>
            <div class="col-sm-8 desc-18">
              From $ {{ treatment.from }} USD
            </div>
          </div>
          <p class="desc-15" style="font-weight:normal;">{{ treatment.description }}</p>
          <hr class="my-3" style="border-top: 1px solid #979797" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Const from "./../utils/const"

  export default {
    props: ['services', 'treatments'],
    data() {
      return {
        Const,
      }
    }
  }
</script>
