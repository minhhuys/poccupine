<template>
  <div class="home">
    <h3>List places</h3>
    <div v-if="isLoading" class="loader"></div>
    <ul v-else>
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
      places: [],
      isLoading: false
    }
  },

  created() {
    this.isLoading = true
    this.$store.dispatch('places').then(response => {
      this.isLoading = false

      if(response && response.length !== 0) {
        this.places = response
      }

      if(response && response.errorCode) {
        this.places = []
        alert(response.message)
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

.loader {
  margin-left: 40px;
  border: 5px solid #f1f1f1;
  border-radius: 50%;
  border-top: 5px solid #eaeaea;
  width: 15px;
  height: 15px;
  -webkit-animation: spin .8s linear infinite; /* Safari */
  animation: spin .8s linear infinite;
}

/* Safari */
@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
