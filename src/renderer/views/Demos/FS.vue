<template>
  <div>
    <h1>File System</h1>

    <div>
      <ol>
        <li v-for="(file) in list" :key="file">
          <small>{{ file }}</small>
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
  const fs = require('fs')

  export default {
    data () {
      return {
        list: []
      }
    },
    methods: {
      getFileList () {
        this.list = fs.readdirSync('/')
      }
    },
    created () {
      this.getFileList()
    },
  }
</script>

<style lang="scss">

</style>
