<template>
  <div class="Home">
    <FileHash />

    <div class="otherDemo">
      <h3>Other Demo</h3>
      <div>
        <router-link to="/FS">Node.js File System</router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import FileHash from '@/views/Demos/FileHash'

  export default {
    components: {
      FileHash,
    },
    methods: {

    },
    created () {

    }
  }
</script>

<style lang="scss">
.otherDemo {
  margin-top: 15vh;
}
</style>
