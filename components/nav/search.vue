<template>
  <div
    class="flex items-center border border-transparent focus-within:border-primary rounded bg-slate-700"
  >
    <span
      class="h-full p-2 rounded-l cursor-pointer"
      :class="searchEmpty ? '' : 'bg-primary'"
      @click="searchClicked"
    >
      <span class="h-full grid place-items-center" @click="searchClicked">
        <i class="ri-search-line" @click="searchClicked"></i>
      </span>
    </span>

    <input
      ref="searchbar"
      class="bg-transparent grow p-2 rounded outline-none"
      type="text"
      name="search-letswatch.one"
      @input="inputChange"
    />
  </div>
</template>

<script>
import { useDebounceFn } from '@vueuse/core'

export default {
  data() {
    return {
      value: '',
      searchAnime: null,
      animeList: [],
    }
  },
  computed: {
    searchEmpty() {
      return this.value.trim() === ''
    },
  },
  mounted() {
    this.searchAnime = useDebounceFn(async () => {
      if (this.value.trim() === '') return

      this.animeList = await useAAAnime({
        p: {
          title: this.value.trim(),
          per_page: 20,
        },
      }).request()

      console.log(this.animeList)
    }, 500)
  },
  methods: {
    inputChange({ target }) {
      console.log(target)
      this.value = target.value.trim()

      if (this.searchAnime) this.searchAnime()
    },
    searchClicked() {
      console.log('lol')
      if (this.value.trim() === '') {
        this.$refs.searchbar.focus()

        return
      }
      console.log('okay')

      this.$router.push('/search?title=' + this.value.trim())
    },
  },
}
</script>

<style></style>
