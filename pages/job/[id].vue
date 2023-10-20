<script setup lang="ts">
import type { JobDetail } from '~/modules/Job/Core'

const route = useRoute()

const jobId = computed(() => route.params.id as string)
const { data: job } = await useFetch<JobDetail>(`/api/job/${jobId.value}`)
const active = ref(0)
// const tabs = ref(['任务详情', '运行状态', '任务日志'])
const tabs = ref(['任务详情'])
</script>

<template>
  <div class="flex flex-1 flex-col overflow-hidden">
    <div class="flex">
      <ATab :tabs="tabs" @click="active = $event" />
    </div>
    <Transition v-if="job" name="list" mode="out-in">
      <JobDetails v-if="active === 0" :job="job" />
      <!-- <JobState v-else-if="active === 1" :job="job" />
      <JobLogs v-else-if="active === 2" :job="job" /> -->
    </Transition>
  </div>
</template>
