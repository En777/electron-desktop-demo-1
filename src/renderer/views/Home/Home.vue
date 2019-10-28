<template>
  <div>
    <h1>File Hash</h1>
    <div>
      <FileHash />
    </div>

    <div class="otherDemo">
      <h3>Other Demo</h3>
      <div>

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
  margin-top: 30vh;
}
</style>
