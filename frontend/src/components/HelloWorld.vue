<template>
  <div class="index page">
    <div class="position main">
      BootstrapVue의 Card태그를 사용해보겠습니다
      <br>
      <br>
      <b-card 
      overlay 
      img-src='https://cdn.pixabay.com/photo/2015/05/06/16/31/andromeda-galaxy-755442_960_720.jpg' 
      img-alt="씨앤텍시스템즈"  
      class="card">

        <b-card-title>씨앤텍시스템즈</b-card-title>
        <b-card-text>안녕하세요 씨앤텍시스템즈입니다.</b-card-text>
        <br>
        <b-card-text>
          BootstrapVue Card 태그의 Overlay 속성입니다.
        </b-card-text>

      </b-card>
    </div>
  </div>
  
</template>
<style scoped>
  .page {
  height: 100vh;
  font-weight: bold;
}

.position {
  position: relative;
  top: 10%;
}

.main {
  text-align: center;
  font-size: 1rem;
}

.card {
  width: 50%;
  text-align: left;
  margin: 0 auto;
  color: #ffffff;
}
</style>
