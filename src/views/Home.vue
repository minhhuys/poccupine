<template>
  <div class="home">
    <h3>List places</h3>
    <div v-if="isLoading" class="loader"></div>
    <ul v-else>
      <li v-for="place in paginate" :key="place.id">
        {{place.id}}. {{place.name}}
      </li>

      <button 
        v-if="paginate.length > 1"
        v-for="pageNumber in totalPages" 
        :key="pageNumber.id" v-bind:key="pageNumber" 
        @click="setPage(pageNumber)" 
        :class="{current: currentPage === pageNumber, last: (pageNumber == totalPages && Math.abs(pageNumber - currentPage) > 3), first:(pageNumber == 1 && Math.abs(pageNumber - currentPage) > 3)}">

        {{ pageNumber }} 
      </button>
    </ul>

    <p @click="logout">Đăng xuất</p>

    <Popup v-if="toogleModal" :message="errorMessage" @close="close"/>

  </div>
  
</template>

<script>
// @ is an alias to /src
import { removeCookie } from "@/utils.js"
const Popup = () =>
  import("@/components/Popup");

export default {
  data() {
    return {
      places: [],
      isLoading: false,
      toogleModal: false,
      errorMessage: '',
      currentPage: 1,
      itemsPerPage: 10,
      resultCount: 0
    }
  },
  components: {
    Popup
  },

  computed: {
    totalPages() {
        if (this.resultCount == 0){ return 1 }
        else {
          return Math.ceil(this.resultCount / this.itemsPerPage)
        }
    },

    paginate() {
        if (!this.places || this.places.length != this.places.length) return
            
        this.resultCount = this.places.length

        if (this.currentPage >= this.totalPages) {
          this.currentPage = this.totalPages
        }

        let index = this.currentPage * this.itemsPerPage - this.itemsPerPage

        return this.places.slice(index, index + this.itemsPerPage)
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
        this.isLoading = false
        this.places = []
        this.toogleModal = true
        this.errorMessage = response.message
      }
    })
  },
  methods: {
    logout() {
      removeCookie(this.$constants.COOKIE_NAME__EXPIRE_TOKEN_DATE)
      removeCookie(this.$constants.COOKIE_NAME__TOKEN)

      this.$router.push({path : '/login'})
    },

    close() {
      this.toogleModal = false
    },

    setPage(pageNumber) {
        this.currentPage = pageNumber
    },
  }
}
</script>

<style lang="scss" scoped>
%boxshadow {
  box-shadow: 4px 4px 1px rgba(0,0,0,0.05), 0 8px 18px rgba(75,0,0,0.05);
}
$blue: #83e4e2;
$green: #a2ed56;

h3 {
  padding-left: 40px;
}
ul {
  list-style: none;
  margin: 30px 30px 30px 0;

  > li {
    list-style: none;
    background: white;
    border-radius: 0 8px 8px 8px;
    @extend %boxshadow;
    counter-increment: gradient-counter;
    margin-top: 16px;
    min-height: 48px;
    padding: 16px 16px 16px 48px;
    position: relative;
    &::before,
    &::after {
      background: linear-gradient(135deg, $blue 0%,$green 100%);
      border-radius: 16px 16px 0 16px;
      content: '';
      height: 48px;
      left: -16px;
      overflow: hidden;
      position: absolute;
      top: -16px;
      width: 48px;
    }
  }

  button {
    margin: 10px 5px 0 0;
    background-color:  #aeecef;
    color: white;
    border: none;
    border-radius: 4px;
    font-weight: 600;
    cursor: pointer;
    width: 30px;
    height: 30px;
    line-height: 30px;
  }
  button.current {
    background-color: #1e2749;

  }
}

p {
  position: absolute;
  right: 40px;
  top: 10px;
  cursor: pointer;
}

.loader {
  border: 3px solid #1e2749;
  border-radius: 50%;
  border-top: 3px solid #aeecef;
  width: 25px;
  height: 25px;
  -webkit-animation: spin .8s linear infinite; /* Safari */
  animation: spin .8s linear infinite;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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
