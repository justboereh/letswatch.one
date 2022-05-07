<template>
  <div class="text-slate-50">
    <NavMain />

    <div class="h-12 md:h-20 w-full"></div>

    <main id="main-content" class="max-w-7xl m-auto px-4">
      <slot />
    </main>

    <footer
      class="text-center bg-slate-900 text-xs md:text-sm py-10 mt-4 md:mt-8"
    >
      Designed and built with ❤️ by
      <a
        class="underline underline-offset-2"
        href="http://justboereh.com"
        target="_blank"
        rel="noopener noreferrer"
        >justboereh</a
      >
    </footer>
  </div>
</template>

<script>
export default {}
</script>
