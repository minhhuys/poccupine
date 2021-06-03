<template>
    <div class="login">
        <img src="https://www.poccupine.com/images/Poccupine-Logo-04.png" width="100" height="100" alt="">

        <Input 
            :label="`Username`"
            :inputType="`text`"
            :placeholder="`Nhập username`" 
            @handleChange="onChangeInput"
        />

        <Input 
            :label="`Password`"
            :inputType="`password`"
            :placeholder="`Nhập password`" 
            @handleChange="onChangeInput"
        />

        <p v-if="isError">{{errorMessage}}</p>


        <button @click="!isLoading ? submit() : null">
            {{ isLoading ? 'Đang thực hiện' : 'Đăng nhập' }}
        </button>            
    </div>
</template>

<script>
import Input from "@/components/Input"
import { mapState }  from "vuex"
import { getCookie, removeCookie } from "@/utils.js"

export default {
    components: {
        Input
    },
    computed: {
        ...mapState({
            token: state => state.token,
            expireTokenDate: state => state.expireTokenDate
        }),
        userToken() {
            return this.token || getCookie(this.$constants.COOKIE_NAME__TOKEN)
        }
    },
    data() {
        return {
            username: '',
            password: '',
            isLoading: false,
            isError: false,
            errorMessage: '',
        }
    },
    methods: {
        onChangeInput(value, type) {
            
            if(this.isError) this.isError = false

            if(type === 'Username') {
                this.username = value
            }

            if(type === 'Password') {
                this.password = value
            }
        },

        submit() {
            if(!this.username && !this.password) return;

            this.isLoading = true

            this.$store.dispatch('login', {
                username : this.username,
                password : this.password
            }).then(() => {
                this.isLoading = false

                if(this.userToken)  {
                    this.$router.push({path : '/'})
                }

            }).catch(error => {
                this.isLoading = false
                this.isError = true
                this.errorMessage = error.message
            })
        },

    },

    mounted() {
        const expDate = this.expireTokenDate || getCookie(this.$constants.COOKIE_NAME__EXPIRE_TOKEN_DATE)
        const expireTokenDate = this.$dayjs(expDate).unix() || 0  
        const now = new Date() / 1000

        if(expDate) {
            if(now === expireTokenDate || now > expireTokenDate) {
                removeCookie(this.$constants.COOKIE_NAME__EXPIRE_TOKEN_DATE)
                removeCookie(this.$constants.COOKIE_NAME__TOKEN)
                return this.$router.push({path : '/login'})
            } else {
                return this.$router.push({path : '/'})
            }
        }

    }

}
</script>

<style lang="scss" scoped>
.login {
    width: 365px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;

    button {
        width: 150px;
        background-color: #0125a0;
        color: white;
        border-radius: 6px;
        padding: 10px;
        outline: none;
        border: none;
        cursor: pointer;
        font-weight: 600;

        &:hover {
            opacity: .8;
        }
    }

    p {
        color: red;
    }
}
</style>