<script setup lang="ts">
interface Props {
  job: any
}

defineProps<Props>()
</script>

<template>
  <div class="min-h-1px w-full flex flex-col gap-2 p4 text-#ffffff60">
    <div class="h-1/2 flex flex-col">
      <p class="m0 flex items-center justify-center md:justify-start">
        ---------- 运行日志 ----------
      </p>
      <ul class="not-scroll m0 mt2 max-w-full w-full flex flex-1 flex-wrap gap-2 overflow-y-scroll pl-0 pr-2 md:w-520px">
        <li v-for="i in 10" :key="i" class="mb-2 w-full flex flex-col gap-1">
          <span class="line-clamp-1">[Job {{ i }}] [2023.06.21 09:00:00]</span>
          <span class="line-clamp-3">运行时打印的日志运行时打印的日志运行时打印的日志运行时打印的日志运行时打印的日志运行时打印的日志运行时打印的日志运行时打印的日志运行时打印的日志运行时打印的日志运行时打印的日志运行时打印的日志运行时打印的日志运行时打印的日志运行时打印的日志运行时打印的日志运行时打印的日志</span>
        </li>
      </ul>
    </div>
    <div class="h-1/2 flex flex-col">
      <p class="m0 flex items-center justify-center md:justify-start">
        ---------- 错误日志 ----------
      </p>
      <ul class="not-scroll m0 mt2 max-w-full w-full flex flex-1 flex-wrap gap-2 overflow-y-scroll pl-0 pr-2 md:w-520px">
        <li v-for="i in 10" :key="i" class="mb-2 w-full flex flex-col gap-1">
          <span class="line-clamp-1">[Job {{ i }}] [2023.06.21 09:00:00]</span>
          <span class="line-clamp-3">运行时打印的日志运行时打印的日志运行时打印的日志运行时打印的日志运行时打印的日志运行时打印的日志运行时打印的日志运行时打印的日志运行时打印的日志运行时打印的日志运行时打印的日志运行时打印的日志运行时打印的日志运行时打印的日志运行时打印的日志运行时打印的日志运行时打印的日志</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="less" scoped>
// something
</style>
