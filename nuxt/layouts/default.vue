<script setup lang="ts">
// layout
import LoadingPage from '@/components/layout/loading-page.vue';

const OpenGroup = defineAsyncComponent(() => import('@/components/open-group/index.vue'));
</script>

<template lang="pug">
#layout
  LoadingPage
  .page-area
    slot

  #layout-self-area
    ClientOnly
      OpenGroup
</template>

<style lang="scss">

// 佈局
#layout {
  max-width: 100vw;
  min-height: 100vh;
  position: relative;
  display: grid;
  grid-template-rows: 1fr auto;
  grid-template-areas:
    'page'
    'self';

  .page-area {
    grid-area: page;
    position: relative;
    z-index: 0;
  }
  #layout-self-area {
    grid-area: self;
    position: sticky;
    bottom: 0;
    z-index: 2;
  }
}

</style>
