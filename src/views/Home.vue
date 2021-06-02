<template>
  <div class="home">
    <h3>List places</h3>
    <ul>
      <li v-for="place in places" :key="place.id">
        {{place.id}}. {{place.name}}
      </li>
    </ul>

    <p @click="logout">Đăng xuất</p>
  </div>
</template>

<script>
// @ is an alias to /src
import { removeCookie } from "@/utils.js"

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
  },
  methods: {
    logout() {
      removeCookie(this.$constants.COOKIE_NAME__EXPIRE_TOKEN_DATE)
      removeCookie(this.$constants.COOKIE_NAME__TOKEN)

      this.$router.push({path : '/login'})
    }
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

p {
  position: absolute;
  right: 40px;
  top: 10px;
  cursor: pointer;
}
</style>
