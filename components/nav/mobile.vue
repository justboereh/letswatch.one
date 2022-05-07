<template>
  <div class="text-lg flex gap-4 justify-evenly items-center">
    <i class="ri-search-line" @click="$emit('togglesearch')"></i>

    <i class="ri-sound-module-line"></i>

    <span class="opacity-0 w-4"></span>

    <i class="ri-sun-line"></i>
  </div>
</template>

<script>
export default {
  methods: {
    toggleSearch() {
      this.$emit('togglesearch')
    },
  },
}
</script>
