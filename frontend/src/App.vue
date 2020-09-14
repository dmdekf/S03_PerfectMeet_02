<template>
  <div id="app">
    <app-navbar></app-navbar>
    <app-footer></app-footer>
  </div>
</template>

<script>
import AppNavbar from "@/views/partials/Navbar.vue"
import AppFooter from '@/views/partials/Footer.vue'
export default {
  name:'app',
  components:{
    AppNavbar,
    AppFooter
  }
}
</script>

