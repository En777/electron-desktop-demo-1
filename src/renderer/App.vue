<template>
  <div id="app" class="appContainer">
    <!-- keep-alive 缓存规则：默认启用缓存，路由设置了 keepAlive: false 就不缓存 -->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive !== false"></router-view>
    </keep-alive>
    <router-view v-if="$route.meta.keepAlive === false"></router-view>

  </div>
</template>

<script>
// import { remote } from 'electron'

export default {
  methods: {

  },
  created () {

  }
}
</script>

<style lang="scss">

</style>
