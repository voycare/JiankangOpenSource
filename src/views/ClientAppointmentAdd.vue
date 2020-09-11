<template>
  <div >
    <div class="row">
      <div class="col-lg-8 offset-lg-2">
        <h4 class="page-title">Add Appointment</h4>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-8 offset-lg-2">
        <form>
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label>Appointment ID</label>
                <input class="form-control" readonly="" type="text" value="APT-0001">
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label>Patient Name</label>
                <select class="form-control">
                  <option>Select</option>
                  <option>Jennifer Robinson</option>
                  <option>Terry Baker</option>
                </select>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label>Department</label>
                <select class="form-control">
                  <option>Select</option>
                  <option>Dentists</option>
                  <option>Neurology</option>
                  <option>Opthalmology</option>
                  <option>Orthopedics</option>
                  <option>Cancer Department</option>
                  <option>ENT Department</option>
                </select>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label>Doctor</label>
                <select class="form-control">
                  <option>Select</option>
                  <option>Cristina Groves</option>
                  <option>Marie Wells</option>
                  <option>Henry Daniels</option>
                </select>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label>Date</label>
                <div class="cal-icon">
                  <input class="form-control datetimepicker" type="text">
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label>Time</label>
                <div class="time-icon">
                  <input class="form-control" id="datetimepicker3" type="text">
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label>Patient Email</label>
                <input class="form-control" type="email">
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label>Patient Phone Number</label>
                <input class="form-control" type="text">
              </div>
            </div>
          </div>
          <div class="form-group">
            <label>Message</label>
            <textarea class="form-control" cols="30" rows="4"></textarea>
          </div>
          <div class="form-group">
            <label class="display-block">Appointment Status</label>
            <div class="form-check form-check-inline">
              <input checked class="form-check-input" id="product_active" name="status"
                     type="radio" value="option1">
              <label class="form-check-label" for="product_active">
                Active
              </label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" id="product_inactive" name="status" type="radio"
                     value="option2">
              <label class="form-check-label" for="product_inactive">
                Inactive
              </label>
            </div>
          </div>
          <div class="m-t-20 text-center">
            <button class="btn btn-primary btn-pink submit-btn">Create Appointment</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ClientAppointmentAdd"
  }
</script>

<style scoped>

</style>
