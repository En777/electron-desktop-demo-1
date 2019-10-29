<template>
  <div class="FileHash" @drop="onDropFile" @dragover="onDragover">
    <h1>File Hash</h1>

    <input type="file" multiple @change="onSelectFile">

    <ol>
      <li v-for="(item, index) in list" :key="index">
        <h5>{{ item.file.name }}</h5>
        <div>Size: {{ getFileSize(item.file.size) }} ({{ item.file.size }} Bytes)</div>
        <div>Sha1: {{ item.sha1 | empty }}</div>
        <div>Sha256: {{ item.sha256 | empty }}</div>
        <div>Sha512: {{ item.sha512 | empty }}</div>
      </li>
    </ol>

    <div>
      <button v-show="list.length" @click="onDownload">Download</button>
    </div>
  </div>
</template>

<script>
  // import { remote } from 'electron'
  const FileReaderPromise =require('file-reader-promise')
  const byteSize = require('byte-size')
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
        // this.list = list
        this.list.unshift.apply(this.list, list)

        list.forEach(async (item) => {
          const file = item.file
          const arrayBuffer = await FileReaderPromise.readAsArrayBuffer(file)

          item.sha1 = await this.getHash('SHA-1', arrayBuffer)
          item.sha256 = await this.getHash('SHA-256', arrayBuffer)
          item.sha512 = await this.getHash('SHA-512', arrayBuffer)
          console.log('item')
        })
      },
      async getHash (hashType, arrayBufer) {
        // https://s0developer0mozilla0org.icopy.site/en-US/docs/Web/API/SubtleCrypto/digest
        const digestArrayBuffer = await crypto.subtle.digest(hashType, arrayBufer)
        // convert buffer to byte array
        const array = Array.from(new Uint8Array(digestArrayBuffer))
        // convert bytes to hex string
        const hash = array.map(byte => byte.toString(16).padStart(2, 0)).join('')

        return hash
      },
      getFileSize (size) {
        return byteSize(size)
      },
      onDownload () {
        const string = this.$el.querySelector('ol').innerText

        const link = document.createElement('a')
        link.download = 'file-hash.txt'
        const blob = new Blob([string], {type: 'text/plain'})
        link.href = window.URL.createObjectURL(blob)
        document.body.append(link)
        link.click()
      },
      onDragover (event) {
        event.preventDefault()
      },
      onDropFile (event) {
        event.preventDefault()
        const files = event.dataTransfer.files
        const event2 = { target: { files } }

        this.onSelectFile(event2)
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
.FileHash {
  min-height: 25vh;
  ol {
    font-size: 0.9em;
  }
}
</style>
