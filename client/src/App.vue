<script setup>
import NavBar from './components/NavBar.vue'
import Footer from './components/Footer.vue'

</script>

<template>
  <header>
    <NavBar />
  </header>

  <body class="leading-normal tracking-normal text-white gradient" style="font-family: 'Source Sans Pro', sans-serif;">
    <RouterView />
  </body>

  <footer class="gradient">
    <Footer />
  </footer>
</template>

<style scoped>

</style>
