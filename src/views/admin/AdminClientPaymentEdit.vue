<template>
  <div v-if="payment">
    <div class="row mb-3">
      <div class="col-sm-6">
        <BackTo :to="'/payments'" :text="'Back to Client Invoice'" />
      </div>
    </div>
    <div class="card">
      <div class="card-body">
        <div class="d-flex justify-content-between">
          <span class="title-18">Create Invoice</span>
          <div class="text-right">
            <div class="form-inline">
              <div class="form-group mb-2">
                <label style="line-height: 38px; margin-bottom: 10px;">Invoice NO. </label>
                <input type="text" class="form-control" v-model="payment.id" />
              </div>
            </div>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col-sm-3">
            <label>Hera ID</label>
            <input type="text" class="form-control" v-model="payment.id" />
          </div>
          <div class="col-sm-3">
            <label>Name</label>
            <input type="text" class="form-control" v-model="payment.name" />
          </div>
          <div class="col-sm-3">
            <label>Email</label>
            <input type="email" class="form-control" v-model="payment.email" />
          </div>
          <div class="col-sm-3">
            <label>Order Date</label>
            <date-picker
              style="width: 100%;"
              v-model="payment.created_at"
              :default-value="new Date()"
              value-type="timestamp"
            ></date-picker>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col-sm-3">
            <label>Total Paid</label>
            <input type="text" class="form-control" v-model="payment.total" />
          </div>
          <div class="col-sm-3">
            <label>Payment Method</label>
            <select class="form-control" v-model="payment.payment_type">
              <option
                :value="payment_method.id"
                v-for="payment_method in payment_methods"
                :key="payment_method.id"
              >{{ payment_method.name }}</option>
            </select>
          </div>
          <div class="col-sm-3">
            <label>Payment Transaction ID</label>
            <input type="text" class="form-control" v-model="payment.transaction_id" />
          </div>
        </div>
        <div class="card">
          <div class="card-body">
            <table class="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Item</th>
                  <th>Clinic</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in payment.items" :key="item.id">
                  <td class="align-middle">
                    <span class="d-block" style="margin-bottom: 10px;">{{ item.id }}</span>
                    </td>
                  <td>
                    <input type="text" class="form-control" v-model="item.name" />
                  </td>
                  <td>
                    <input type="text" class="form-control" v-model="item.clinic_id" />
                  </td>
                  <td>
                    <input type="text" class="form-control" v-model="item.price" />
                  </td>
                  <td>
                    <input type="text" class="form-control" v-model="item.quantity" />
                  </td>
                  <td>
                    <input type="text" class="form-control" v-model="item.total" />
                  </td>
                  <td>
                    <button class="btn btn-link" @click="onRemoveItem(item.id, index)">
                      <i class="fa fa-trash"></i>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td colspan="5" class="text-right" style="vertical-align: middle;">
                    <strong>Total Paid</strong>
                  </td>
                  <td style="vertical-align: middle;">
                    <input
                      type="text"
                      class="form-control"
                      readonly
                      :value="getTotal()"
                      style="margin-bottom: 0;"
                    />
                  </td>
                  <td>
                    <button class="btn btn-link" @click="onAddItem">
                      <i class="fa fa-plus mr-2"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
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
import BackTo from "../../components/BackTo";
import DatePicker from "vue2-datepicker";

export default {
  components: { BackTo, DatePicker },
  data() {
    return {
      id: null,
      payment_methods: [
        { id: 1, name: "Visa" },
        { id: 2, name: "Alipay" },
        { id: 3, name: "Wechat" },
      ],
      payment: {
        id: null,
        name: "",
        email: "",
        created_at: null,
        payment_type: "",
        transaction_id: "",
        items: [],
      },
    };
  },
  mounted() {
    let self = this;

    self.id = self.$route.params.id;
    if (self.id) {
      self.getDetail();
    }
  },
  methods: {
    getTotal() {
      let self = this;

      let total = 0;
      self.payment.items.forEach((item) => {
        total += item.total;
      });

      return total;
    },
    getDetail() {
      let self = this;

      rf.getRequest("AdminRequest")
        .getPaymentDetail(self.id)
        .then((res) => {
          self.payment = res.data;
        });
    },
    onAddItem() {
      let self = this;

      self.payment.items.push({
        id: null,
        item_date: new Date(),
        item_name: "",
        appointment_no: "",
        amount: 0,
      });
    },
    onRemoveItem(item_id, index) {
      let self = this;

      var r = confirm("Are you want to remove this clinic?");
      if (r == true) {
        for (let i = 0; i < self.payment.items.length; i++) {
          if (i == index) {
            self.payment.items.splice(i, 1)
          }
        }
      }
    },
    onSaveDraft() {
      let self = this;

      let params = self.payment;
      params.id = self.id;
      params.status = 1; // Draft.

      rf.getRequest("AdminRequest")
        .postPayments(params)
        .then((res) => {
          self.payment = res.data;
        });
    },
    onSend() {
      let self = this;
      let params = self.payment;
      params.id = self.id;
      params.status = 2; // Publish.

      rf.getRequest("AdminRequest")
        .postPayments(params)
        .then((res) => {
          self.payment = res.data;
        });
    },
  },
};
</script>

<style scopde>
.card-body {
  padding: 34px 46px 42px 32px;
}
</style>
