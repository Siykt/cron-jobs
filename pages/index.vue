<script setup lang="ts">
import LogoPNG from '~/assets/logo.png'
</script>

<template>
  <h1 class="m0 flex items-center p3 text-xl font-medium text-#333">
    <a href="https://www.antpro.me/" title="Siykt的博客">
      <img class="h-52px w-52px" :src="LogoPNG" alt="logo.png">
    </a>
  </h1>
  <div class="flex flex-1 flex-wrap content-start gap-2 p6">
    <ACard />
  </div>
</template>
