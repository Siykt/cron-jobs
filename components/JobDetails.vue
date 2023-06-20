<script setup lang="ts">
// something
</script>

<template>
  <div class="min-h-1px w-full flex flex-col gap-2 p4 text-#ffffff60">
    <p class="m0 mt4 flex items-center">
      ---------- 任务指令 ----------
    </p>
    <div class="mt-4 flex gap-2">
      <AButton>
        <i class="mdi:plus" />
        添加新的任务
      </AButton>
      <AButton>
        <i class="mdi:delete" />
        删除某项任务
      </AButton>
      <AButton>
        <i class="mdi:restart" />
        重启所有任务
      </AButton>
      <AButton>
        <i class="mdi:stop" />
        停止所有任务
      </AButton>
    </div>
  </div>
</template>

<style lang="less" scoped>
// something
</style>
