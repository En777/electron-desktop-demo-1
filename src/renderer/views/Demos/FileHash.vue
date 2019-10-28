<template>
  <div>
    <input type="file" multiple @change="onSelectFile">

    <ol>
      <li v-for="(item, index) in list" :key="index">
        <h6>{{ item.file.name }}</h6>
        <div>Sha1: {{ item.sha1 | empty }}</div>
        <div>Sha256: {{ item.sha256 | empty }}</div>
        <div>Sha512: {{ item.sha512 | empty }}</div>
      </li>
    </ol>
  </div>
</template>

<script>
  // import { remote } from 'electron'
  const FileReaderPromise =require('file-reader-promise')
  // const { sha1, sha256, sha512 } = require('crypto-hash')

  export default {
    data () {
      return {
        list: []
      }
    },
    methods: {
      onSelectFile (event) {
        const files = Array.from(event.target.files)

        const list = files.map((file) => {
          return {
            file: file,
            sha1: '',
            sha256: '',
            sha512: '',
          }
        })
        this.list = list

        list.forEach(async (item) => {
          const file = item.file
          const arrayBuffer = await FileReaderPromise.readAsArrayBuffer(file)

          item.sha1 = await this.getHash('SHA-1', arrayBuffer)
          item.sha256 = await this.getHash('SHA-256', arrayBuffer)
          item.sha512 = await this.getHash('SHA-512', arrayBuffer)
        })
      },
      async getHash (hashType, arrayBufer) {
        const digestArrayBuffer = await crypto.subtle.digest(hashType, arrayBufer)
        // convert buffer to byte array
        const array = Array.from(new Uint8Array(digestArrayBuffer))
        // convert bytes to hex string
        const hash = array.map(byte => byte.toString(16).padStart(2, 0)).join('')

        return hash
      },
    },
    filters: {
      empty (value) {
        return value || '--'
      },
    },
    created () {

    }
  }
</script>

<style lang="scss">

</style>
