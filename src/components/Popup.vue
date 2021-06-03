<template>
    <div id="open-modal" class="modal-window">
        <div>
            <a title="Close" class="modal-close" @click="close">Đóng</a>
            <div>{{message}}</div>
        </div>
    </div>
</template> 

<script>
export default {
    props: {
        message: {
            type: String,
            default: 'Hello this is message test'
        }
    },

    methods: {
        close() {
            this.$emit('close')
        }
    }
}
</script>


<style lang="scss">
.modal-window {
  position: fixed;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.3);
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  visibility: visible;
  opacity: 1;
  pointer-events: auto;
  transition: all 0.3s;
  
  & > div {
    width: 400px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 2em;
    background: white;
  }
  header {
    font-weight: bold;
  }
  h1 {
    font-size: 150%;
    margin: 0 0 15px;
  }
}

.modal-close {
    cursor: pointer;
  color: #aaa;
  line-height: 50px;
  font-size: 80%;
  position: absolute;
  right: 0;
  text-align: center;
  top: 0;
  width: 70px;
  text-decoration: none;
  &:hover {
    color: black;
  }
}


.container {
  display: grid;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.modal-window {
  & > div {
    border-radius: 1rem;
  }
}

.modal-window div:not(:last-of-type) {
  margin-bottom: 15px;
}

small {
  color: lightgray;
}

.btn {
  background-color: white;
  padding: 1em 1.5em;
  border-radius: 1rem;
  text-decoration: none;
  i {
    padding-right: 0.3em;
  }
}

</style>