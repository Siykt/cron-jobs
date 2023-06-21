<script setup lang="ts">
interface Props {
  job: any
}

defineProps<Props>()
</script>

<template>
  <div class="min-h-1px w-full flex flex-col gap-2 p4 text-#ffffff60">
    <p class="m0 flex items-center">
      模块：{{ job.module }}
    </p>
    <p class="m0 flex items-center">
      循环时间：{{ job.cron }}
    </p>
    <p class="m0 flex items-center">
      已运行时长：{{ job.timer }}
    </p>
    <p class="m0 flex items-center">
      发生错误次数：{{ job.errorCount }}次
    </p>
    <p class="m0 flex items-center">
      正在运行中的任务数量：{{ job.count }}个
    </p>
    <p class="m0 flex items-center">
      最近一次运行时间：{{ job.lastTimer }}
    </p>
    <p class="m0 flex items-center">
      下次任务的运行时间：{{ job.nextTimer }}
    </p>
    <p class="mx-0 my-2 flex items-center justify-center md:my-0 md:justify-start">
      ---------- 任务列表 ----------
    </p>
    <ul class="not-scroll m0 mt2 max-w-full w-fit flex flex-1 flex-wrap gap-x-6 gap-y-2 overflow-y-scroll pl-0 pr-2">
      <li v-for="i in 10" :key="i" class="mb-2 max-w-full flex items-center gap-2">
        <span class="line-clamp-1">{{ i }}.</span>
        <span class="line-clamp-1">Jobs {{ i }}</span>
        <span class="line-clamp-1">运行次数 (1000)</span>
        <span class="line-clamp-1">发生错误次数 (2000)</span>
      </li>
    </ul>
  </div>
</template>

<style lang="less" scoped>
.not-scroll {
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
