<script setup lang="ts">
const user = useSupabaseUser()

watch(user, () => {
  if (user.value)
    return navigateTo('/')
}, { immediate: true })
</script>

<template>
  <div class="flex flex-1 flex-col overflow-hidden">
    <div class="mx-auto min-h-1px w-full flex flex-col gap-2 p4 text-#ffffff60 md:w-460px md:px8">
      登录中...
    </div>
  </div>
</template>
