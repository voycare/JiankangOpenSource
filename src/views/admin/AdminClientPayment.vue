<template>
  <div>
    <p class="title title-22">
      Payments <i class="fa fa-arrow-right" aria-hidden="true"></i> Client Invoice
    </p>

    <PaymentListing :is_client="true"></PaymentListing>
  </div>
</template>

<script>
  import PaymentListing from '../../components/PaymentListing'

  export default {
    components: {
      PaymentListing
    }
  }
</script>

<style></style>
