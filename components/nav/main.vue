<template>
  <nav class="fixed h-12 md:h-20 z-10 w-full">
    <div class="max-w-7xl h-full m-auto flex items-center bg-gray-800 px-4">
      <Nuxt-Link to="/">
        <img class="h-8 md:h-14" src="/letswatch.one.svg" alt="logo" />
      </Nuxt-Link>

      <span class="md:hidden grow h-full"></span>

      <NavMobile class="md:hidden" @togglesearch="toggleSearch" />

      <NavDesktop class="hidden md:inline" />

      <div
        v-if="showSearch"
        class="sm:hidden absolute left-0 bottom-0 translate-y-full h-screen bg-slate-800/90 w-screen backdrop-blur-sm"
      >
        <div class="p-4 h-full">
          <NavSearch />
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return { showSearch: false }
  },
  methods: {
    toggleSearch() {
      this.showSearch = !this.showSearch
    },
  },
}
</script>

<style></style>
