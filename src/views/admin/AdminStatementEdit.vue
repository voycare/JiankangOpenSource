<template>
  <div  v-if="statement">
    <div class="row mb-3">
      <div class="col-sm-6">
        <BackTo :to="'/statements'" :text="'Back to Clinic Statement'" />
      </div>
    </div>

    <div class="card">
      <div class="card-body">
        <div class="row mb-3">
          <div class="col-sm-3">
            <label>Statement NO.</label>
            <input type="text" class="form-control" v-model="statement.statement_no">
          </div>
          <div class="col-sm-3">
            <label>Sales Period</label>
            <date-picker
              style="width: 100%;"
              v-model="statement.sale_period"
              value-type="timestamp"
            ></date-picker>
          </div>
          <div class="col-sm-3">
            <label>Payment Date</label>
            <date-picker
              style="width: 100%;"
              v-model="statement.payment_date"
              value-type="timestamp"
            ></date-picker>
          </div>
        </div>

        <div class="row mb-3">
          <div class="col-sm-3">
            <label>From</label>
            <input type="text" class="form-control" v-model="statement.from_id">
          </div>
          <div class="col-sm-3">
            <label>To</label>
            <multiselect v-model="selected_to_id"
              deselect-label="Can't remove this value"
              label="name"
              track-by="id"
              placeholder="Select one"
              :options="clinics"
              :loading="is_loading"
              @search-change="onSearchTo"
              :allow-empty="false">
              <template slot="singleLabel" slot-scope="{ option }">
                <div>{{ option.name }}</div>
                <small class="text-muted">ID {{ option.id }}</small> - <small>{{ option.email }}</small>
              </template>
            </multiselect>
          </div>
        </div>

        <table class="table table--appt">
          <thead>
          <tr>
            <th>Date</th>
            <th>Item</th>
            <th>Appointment NO.</th>
            <th style="width: 120px; text-align: center">Amount</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item, index) in statement.items" :key="item.id">
            <td>
              <date-picker
                style="width: 100%;"
                v-model="item.item_date"
                value-type="timestamp"
              ></date-picker>
            </td>
            <td>
              <input type="text" class="form-control" v-model="item.name">
            </td>
            <td>
              <input type="text" class="form-control" v-model="item.appointment_no">
            </td>
            <td>
              <input type="text" class="form-control" v-model="item.amount">
            </td>
            <td>
              <button class="btn btn-link" @click="onRemoveItem(item.id, index)"><i class="fa fa-trash"></i></button>
            </td>
          </tr>
          <tr>
            <td colspan="3" class="text-right">Gross Sales</td>
            <td><input type="number" class="form-control" v-model="statement.gross"></td>
            <td>
              <button class="btn btn-link" @click="onAddItem"><i class="fa fa-plus mr-2"></i></button>
            </td>
          </tr>
          <tr>
            <td colspan="3" class="text-right">Refund Sales</td>
            <td><input type="number" class="form-control" v-model="statement.refund"></td>
            <td></td>
          </tr>
          <tr>
            <td colspan="3" class="text-right">Voycare Sales</td>
            <td><input type="number" class="form-control" v-model="statement.fee"></td>
            <td></td>
          </tr>
          <tr>
            <td colspan="3" class="text-right">Net</td>
            <td><input type="number" class="form-control" v-model="statement.net" readonly></td>
          </tr>
          </tbody>
        </table>

        <div class="d-flex justify-content-center">
          <button
            style="width: 200px;"
            class="btn btn-success mr-5 btn-rounded"
            @click="onSend"
          >Send</button>
          <button
            style="width: 200px;"
            class="btn btn-dark btn-rounded"
            @click="onSaveDraft"
          >Save as Draft</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import rf from "../../api/RequestFactory";
  import DatePicker from "vue2-datepicker";
  import Multiselect from "vue-multiselect";
  import BackTo from "../../components/BackTo";

  export default {
    components: {DatePicker, Multiselect, BackTo},
    data() {
      return {
        id: null,
        statement: {
          id: null,
          statement_no: '',
          sale_period: '',
          payment_date: '',
          status: '',
          gross: '',
          refund: '',
          fee: '',
          net: '',
          items: []
        },
        clinics: [],
        selected_to_id: '',
        is_loading: false
      }
    },
    mounted() {
      let self = this

      self.id = self.$route.params.id
      if (self.id) {
        self.getDetail()
      }
    },
    methods: {
      onSearchTo(query) {
        let self = this

        self.is_loading = true

        rf.getRequest('AdminRequest').getClinicApproved({search: query}).then(res => {
          self.is_loading = false
          self.clinics = res.data.datas
        })
      },
      getTotal() {
        let self = this

        let total = 0
        self.statement.items.forEach((item) => {
          total += item.total
        })

        return total
      },
      getDetail() {
        let self = this

        rf.getRequest('AdminRequest').getStatementDetail(self.id).then(res => {
          self.statement = res.data
          self.clinics = [self.statement.to]
          self.selected_to_id = self.statement.to
        })
      },
      onAddItem() {
        let self = this

        self.statement.items.push({
          id: null,
          name: '',
          price: '',
          quantity: '',
          total: ''
        })
      },
      onRemoveItem(item_id, index) {
        let self = this

        var r = confirm("Are you want to remove this clinic?");
        if (r == true) {
          for (let i = 0; i < self.statement.items.length; i++) {
            if (i == index) {
              self.statement.items.splice(i, 1)
            }
          }
        }
      },
      onSaveDraft() {
        let self = this

        let params = self.statement
        params.id = self.id
        params.status = 1 // Draft.
        if (self.selected_to_id) {
          params.to_id = self.selected_to_id.id
        }

        rf.getRequest('AdminRequest').postStatements(params).then(res => {
          self.statement = res.data
        })
      },
      onSend() {
        let self = this
        let params = self.statement
        params.id = self.id
        params.status = 2 // Publish.
        if (self.selected_to_id) {
          params.to_id = self.selected_to_id.id
        }

        rf.getRequest('AdminRequest').postStatements(params).then(res => {
          self.statement = res.data
        })
      }
    }
  }
</script>

<style></style>
