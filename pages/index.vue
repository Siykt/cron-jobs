<script setup lang="ts">
const router = useRouter()

function handleClick(jobId: string) {
  router.push(`/job/${jobId}`)
}

const { data: jobs } = await useFetch('/api/job/list')
</script>

<template>
  <div class="flex flex-1 flex-wrap content-start gap-2 p6">
    <ACard
      v-for="job in jobs"
      :key="job.id"
      :job-id="job.id"
      :name="job.name"
      :icon="job.icon"
      :description="job.description"
      :count="0"
      @click="handleClick($event.jobId)"
    />
  </div>
</template>
