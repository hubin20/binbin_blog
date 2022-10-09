<template>
  <div class="home-index">
    <tob-bar></tob-bar>
    <video
      src="@/assets/img/qm1.mp4"
      autoplay
      muted
      loop
      class="bg-video"
    ></video>
    <router-view></router-view>
    <foot-bar></foot-bar>
  </div>
</template>

<script setup lang="ts">
import TobBar from '@/components/TobBar.vue'
import FootBar from '@/components/FootBar.vue'
</script>

<style scoped lang="less">
.home-index {
  .bg-video {
    height: 880px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
  }
}
</style>
