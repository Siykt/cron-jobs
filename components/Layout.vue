<script setup lang="ts">
const router = useRouter()
const route = useRoute()

const hasHistory = computed(() => route.path !== '/')
</script>

<template>
  <div class="bg relative h-screen w-screen flex bg-cover bg-center" @contextmenu="$event.preventDefault()">
    <div
      class="bgc relative z-1 mx-auto h-screen w-screen flex flex-col overflow-hidden md:my-15vh md:h-auto md:w-3xl md:rounded-md md:shadow-2xl"
    >
      <h1 class="m0 flex items-center p3 text-xl font-medium text-#333">
        <a href="https://www.antpro.me/" title="Siykt的博客">
          <img class="h-52px w-52px" src="~/assets/logo.png" alt="logo.png">
        </a>

        <AButton v-if="hasHistory" class="ml-auto" @click="router.go(-1)">
          <i class="mdi:arrow-left-circle text-xl" />
        </AButton>
      </h1>
      <slot />
    </div>
    <div class="absolute bottom-0 left-0 right-0 top-0 h-screen w-screen bg-gray-800 bg-opacity-40" />
  </div>
</template>

<style lang="less" scoped>
.bg {
  background-image: url(/assets/bg.jpg);
  background-color: rgba(31, 41, 55, 0.75);
}
.bgc {
  background: linear-gradient(140deg, #ffffff40 0%,  #1f293780 38%);
}
</style>
