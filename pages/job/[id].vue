<script setup lang="ts">
const route = useRoute()

const jobId = computed(() => route.params.id as string)
const job = ref({} as any)

onMounted(async () => {
  console.log('[Job]', jobId.value)
  job.value = {
    name: '瑞幸 4.8 折券',
    description: '通过自动化任务定时获取瑞幸的基础折扣券(4.8)',
    module: 'Fetch Api',
    timer: '00:00:00',
    lastTimer: '00:00:00',
    nextTimer: '00:00:00',
    cron: '0 0 1 * * *',
    errorCount: 3,
    count: 3,
  }
})

const active = ref(0)
const tabs = ref(['运行状态', '任务详情', '任务日志'])
</script>

<template>
  <div class="flex flex-1 flex-col overflow-hidden">
    <div class="flex">
      <ATab :tabs="tabs" @click="active = $event" />
    </div>
    <Transition name="list" mode="out-in">
      <JobState v-if="active === 0" :job="job" />
      <JobDetails v-else-if="active === 1" :job="job" />
      <JobLogs v-else-if="active === 2" :job="job" />
    </Transition>
  </div>
</template>
