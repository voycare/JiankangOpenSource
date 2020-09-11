<template>
  <div>
    <div style="position: relative; background: white; height: 210px">
      <a href="http://hera.health/">
        <img src="/assets/img/Hera_LOGO.png"
             style="position: absolute;width: 213.57px;height: 65px;left: 71px;top: 78px;"/>
      </a>
    </div>
    <div >
      <div class="signed">
        <span class="first-title">A verification email has been sent to you.</span><br>
        <span>Please verify your email address to activate your account.</span>
        <a class="primary-btn" href="/login">
          <button>BACK TO SIGN IN</button>
        </a>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: "Signed"
  }
</script>

<style scoped>
  .signed {
    border: 1px lightgrey solid;
    border-radius: 5px;
    text-align: center;
    width: 600px;
    height: 350px;
    background-color: white;
    -webkit-transform: translate(-50%, -50%);
    padding: 30px 40px;
    padding-top: 130px;
    text-align: center;
    position: absolute;
    margin-top: 7%;
    top: 50%;
    left: 50%;
  }
  .signed span {
    color: #FFAFAE;
    font-size: 16px;
    font-family: Poppins;
  }
  .signed .first-title {
    margin-top: 200px;
  }
  .signed a {
    color: black;
    font-family: Poppins;
    text-decoration: none;
  }
  .signed button {
    width: 300px;
    height: 40px;
    font-weight: bold;
    border-radius: 20px;
    font-size: 16px;
    border: none;
    background: #FFAFAE;
    margin-top: 50px;
    cursor: pointer;
  }
</style>
