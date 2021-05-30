<template>
    <div class="login">
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

        <button @click="!isLoading ? submit() : null">
            Đăng nhập
        </button>
        
    </div>
</template>

<script>
import Input from "@/components/Input"

export default {
    components: {
        Input
    },
    data() {
        return {
            username: '',
            password: '',
            isLoading: false
        }
    },
    methods: {
        onChangeInput(value, type) {
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
            }).then(response => {
                this.isLoading = false
                console.log("response", response)
            }).catch(error => {
                console.log("errir", error)
            })
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

    button {
        width: 150px;
        background-color: rgb(23, 105, 255);
        color: white;
        border-radius: 4px;
        padding: 10px;
        outline: none;
        border: none;
        cursor: pointer;

        &:hover {
            opacity: .8;
        }
    }
}
</style>