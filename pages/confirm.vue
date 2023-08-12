<script setup lang="ts">
const user = useSupabaseUser()

const msg = ref('')

watch(user, () => {
  if (user.value)
    return navigateTo('/')
}, { immediate: true })

onMounted(() => {
  const texts = '正在登录中...'.split('')
  let i = 0
  const timer = setInterval(() => {
    msg.value += texts[i++]
    if (i === texts.length)
      clearInterval(timer)
  }, 150)
})
</script>

<template>
  <div class="flex flex-1 flex-col items-center overflow-hidden">
    <h2 class="mb-2 mt-30 flex items-center text-lg text-#ffffff60">
      <span>{{ msg }}</span>
      <span class="blink-animate ml-1px">|</span>
    </h2>
    <i class="mdi:loading rotate-animate text-18 text-#6c6cc9" />
  </div>
</template>

<style lang="less" scoped>
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(359deg);
  }
}
.rotate-animate {
  animation: rotate 0.8s linear infinite;
}
@keyframes blink {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
.blink-animate {
  animation: blink 1s infinite;
}
</style>
