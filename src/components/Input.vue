<template>
    <div>
        <label :for="label">{{label}}</label>
        <input @input="handleChange" :type="inputType" :name="label" :placeholder="placeholder" />
    </div>
</template>

<script>
export default {
    props: {
        label: {
            type: String
        },
        inputType: {
            type: String,
            default: 'text'
        },
        placeholder: {
            type: String
        }
    },
    methods: {
        handleChange($event) {
            this.$emit('handleChange', $event.target.value, this.label)
        },
    }
}
</script>

<style lang="scss" scoped>
label {
	font-size:14px;
	color:darkgray;
	cursor:pointer;
}
label, input {
	float:left;
	clear:both;
}

input {
	margin:15px 0;
	padding:15px 10px;
	width:100%;
    height: 60px;
	outline:none;
	border:1px solid #bbb;
	border-radius: 6px;
	display:inline-block;
	-webkit-box-sizing:border-box;
	   -moz-box-sizing:border-box;
	        box-sizing:border-box;
    -webkit-transition:0.2s ease all;
	   -moz-transition:0.2s ease all;
	    -ms-transition:0.2s ease all;
	     -o-transition:0.2s ease all;
	        transition:0.2s ease all;
}

input[type=text]:focus,
input[type="password"]:focus {
	border-color:cornflowerblue;
}

</style>