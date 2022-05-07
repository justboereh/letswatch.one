<template>
  <div
    class="gap-4 py-4 md:py-8 rounded grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 row-auto justify-between md:bg-slate-900"
  >
    <div
      v-for="i in 10"
      :key="i"
      class="animate-pulse flex flex-col items-center gap-2 h-72"
      :style="`animation-delay: ${i * 50}ms`"
    >
      <div class="bg-slate-700 w-full grow rounded"></div>

      <div class="bg-slate-700 h-4 rounded" :style="barWidth()"></div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    barWidth() {
      const w = Math.random() * 2 + 7
      return `width: ${w}rem;`
    },
  },
}
</script>
