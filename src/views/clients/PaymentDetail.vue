<template>
  <div>
    <div class="row">
      <div class="col-sm-5 col-4">
        <router-link to="/payments"><h4 class="page-title"><i class="fa fa-arrow-left mr-3"></i>Back to
          Payments</h4></router-link>
      </div>
      <div class="col-sm-7 col-8 text-right m-b-30">
        <div class="btn-group btn-group-sm">
          <button @click="onDownloadPDF" class="btn btn-white">PDF</button>
          <button @click="onPrintJS" class="btn btn-white"><i class="fa fa-print fa-lg"></i> Print</button>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-sm-12">
        <div class="card" id="payment__form" v-if="payment">
          <div class="card-body">
            <div class="row custom-invoice">
              <div class="col-6 col-sm-6 m-b-20">
                <img alt="" class="inv-logo" src="assets/img/title.png">
              </div>
              <div class="col-6 col-sm-6 m-b-20">
                <div class="invoice-details">
                  <span class="title-20 text-uppercase">INVOICE {{ payment.id | convertInvoiceID}}</span>

                  <ul class="list-unstyled">
                    <li class="desc-15">Order Date: {{ payment.created_at |
                      convertTimeSecondToDate}}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-6 col-lg-6 m-b-20">
                <ul class="list-unstyled">
                  <li>Voycare ID: {{ payment.client.id }}</li>
                  <li>Name: {{ payment.client.name }}</li>
                  <li>Email: {{ payment.client.email }}</li>
                </ul>
              </div>
              <div class="col-sm-6 col-lg-6 m-b-20">
                <div class="invoices-view">
                  <ul class="list-unstyled invoice-payment-details">
                    <li>Payment Details:</li>
                    <li>
                      <div class="row">
                        <div class="col-sm-6"><b>Total Paid:</b></div>
                        <div class="col-sm-6"><b>{{ payment.total | formatMoney }}</b></div>
                      </div>
                    </li>
                    <li>
                      <div class="row">
                        <div class="col-sm-6">Payment Method:</div>
                        <div class="col-sm-6">{{ payment.payment_type_name }}</div>
                      </div>
                    </li>
                    <li>Payment Transaction ID:</li>
                  </ul>
                </div>
              </div>
            </div>
            <table class="table mb-0 border-0 table--payment">
              <thead>
              <tr>
                <th>#</th>
                <th>Item</th>
                <th>Clinic</th>
                <th>Price</th>
              </tr>
              </thead>
              <tbody>
              <tr :key="item.id" v-for="item in payment.items">
                <td>{{ item.id }}</td>
                <td><span v-if="item.clinic">{{ item.clinic.name }}</span></td>
                <td>{{ item.price }}</td>
                <td>{{ item.quantity }}</td>
              </tr>
              </tbody>
            </table>

            <div>
              <div class="row invoice-payment">
                <div class="col-sm-7">
                </div>
                <div class="col-sm-5">
                  <div class="m-b-20">
                    <div class="table-responsive no-border">
                      <table class="table mb-0 payment--total">
                        <tbody>
                        <tr>
                          <td>Total:</td>
                          <td class="text-right text-primary">{{ payment.total | formatMoney
                            }}
                          </td>
                        </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  // import html2canvas from 'html2canvas'
  // import jsPDF from 'jspdf'
  import printJS from 'print-js'
  import rf from "../../api/RequestFactory";
  import Const from "./../../utils/const"

  export default {
    data() {
      return {
        printJS,
        Const,
        payment: null
      }
    },
    mounted() {
      let self = this
      let id = parseInt(this.$route.params.id)

      rf.getRequest('UserRequest').getPaymentDetail(id).then((res) => {
        self.payment = res.data;
      })
    },
    methods: {
      onDownloadPDF() {
        // let self = this
        //
        // html2canvas(document.querySelector("#payment__form")).then(canvas => {
        //   let pdf = self.getPDF(canvas)
        //   pdf.save("invoice.pdf");
        // });
      },
      onPrintJS() {
        let self = this

        // html2canvas(document.querySelector("#payment__form")).then(canvas => {
        //   var imgData = canvas.toDataURL("image/jpeg", 1);
        //   // window.open(pdf.output('bloburl'), '_blank');
        //   printJS({
        //     printable: imgData,
        //     type: 'image'
        //   })
        // });
      },
      getPDF(canvas) {
        // let self = this
        // var imgData = canvas.toDataURL("image/jpeg", 1);
        // var pdf = new jsPDF("p", "mm", "a4");
        // var pageWidth = pdf.internal.pageSize.getWidth();
        // var pageHeight = pdf.internal.pageSize.getHeight();
        // var imageWidth = canvas.width;
        // var imageHeight = canvas.height;
        //
        // var ratio = imageWidth / imageHeight >= pageWidth / pageHeight ? pageWidth / imageWidth : pageHeight / imageHeight;
        // pdf.addImage(imgData, 'JPEG', 0, 0, imageWidth * ratio, imageHeight * ratio);
        //
        // return pdf
      }
    }
  }
</script>
<style>
  .table--payment thead {
    border-top: 1px solid #CBCBCB;
    border-bottom: 1px solid #CBCBCB;
    background-color: #E5E5E5
  }

  .table--payment th {
    color: #434343;
    font-weight: 700;
  }

  .payment--total {
    font-weight: bold;
    font-size: 18px;
    line-height: 27px;
    background: #E5E5E5;
    border: 1px solid #434343;
  }

  .table td, .table th {
    border-top: 0px;
  }
</style>
