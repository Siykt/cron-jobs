<script setup lang="ts">
// something
</script>

<template>
  <div class="content relative h-screen w-screen flex" @contextmenu="$event.preventDefault()">
    <div class="bg absolute bottom-0 left-0 right-0 top-0 h-screen w-screen bg-cover bg-center" />
    <div class="absolute bottom-0 left-0 right-0 top-0 h-screen w-screen bg-gray-800 bg-opacity-75" />
    <div
      class="relative z-1 mx-auto h-screen w-screen flex flex-col overflow-hidden bg-#282c34 md:my-15vh md:h-auto md:w-3xl md:rounded-md"
    >
      <slot />
    </div>
  </div>
</template>

<style lang="less" scoped>
.bg {
  background-image: url(/assets/bg.jpg);
  background-color: rgba(31, 41, 55, 0.75);
}
</style>
