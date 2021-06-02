<template>
  <div class="home">
    <h3>List places</h3>
    <ul>
      <li v-for="place in places" :key="place.id">
        {{place.id}}. {{place.name}}
      </li>
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  data() {
    return {
      places: []
    }
  },

  created() {
    this.$store.dispatch('places').then(response => {
      if(response && response.length !== 0) {
        this.places = response
      }
    })
  }
}
</script>

<style lang="scss" scoped>
h3 {
  padding-left: 40px;
}
ul {
  li {
    list-style: none;
  }
}
</style>
