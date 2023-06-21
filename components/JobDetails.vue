<script setup lang="ts">
interface Props {
  job: any
}

defineProps<Props>()
</script>

<template>
  <div class="min-h-1px w-full flex flex-col gap-2 p4 text-#ffffff60">
    <p class="m0 flex items-center">
      任务名称：{{ job.name }}
    </p>
    <p class="m0 flex items-center">
      任务描述：
    </p>
    <p class="m0 flex items-center">
      {{ job.description }}
    </p>
    <p class="m0 flex items-center">
      任务配置：
    </p>
    <p class="m0 flex items-center">
      [ConfigType]: String 手机号码
    </p>
    <p class="m0 flex items-center">
      [ConfigType]: JSON
    </p>
    <p class="m0 flex items-center">
      [Param]: phoneNumber 手机号码
    </p>
    <p class="m0 mt4 flex items-center justify-center md:justify-start">
      ---------- 任务指令 ----------
    </p>
    <div class="mt-4 flex flex-wrap justify-center gap-2 md:justify-start">
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
