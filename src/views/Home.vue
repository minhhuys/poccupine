<template>
  <div class="home">
    <!-- <Login /> -->
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',

  mounted() {
    this.$store.dispatch('places').then(response => {
      console.log("response", response)
    })
  }
}
</script>
