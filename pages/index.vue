<template>
  <div>
    <div
      class="flex gap-2 overflow-x-auto whitespace-nowrap text-xs md:text-lg pb-4 pt-2"
    >
      <span
        v-for="genre in genreList"
        :key="genre"
        :genre="genre"
        class="px-4 border border-slate-700 rounded py-1"
        :class="
          selectedGenre.includes(genre) ? 'text-primary border-primary' : ''
        "
        @click="genreSelect"
      >
        {{ genre }}
      </span>
    </div>

    <h1 class="my-4 flex items-center text-2xl md:text-4xl font-medium">
      Random Animes

      <span class="grow"></span>

      <span
        class="text-xs md:text-lg font-normal flex items-center gap-1 cursor-pointer"
        @click="getRandomAnimes"
      >
        Refresh

        <i class="ri-refresh-line group-hover:before:animate-spin"></i>
      </span>
    </h1>

    <HomeRaPlaceholder
      v-show="selectedGenre.length < 1 && randomAnimeList.length < 1"
    />

    <div
      v-show="selectedGenre.length < 1"
      class="gap-4 py-4 md:p-8 md:gap-8 rounded grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 row-auto justify-between md:bg-slate-900"
    >
      <NuxtLink
        v-for="anime in randomAnimeList"
        :key="anime.id"
        :to="`/anime?id=${anime.id}`"
        class="text-center flex flex-col items-center border-2 rounded"
        :style="`background: ${anime.cover_color}; border-color: ${anime.cover_color}`"
      >
        <div class="relative w-full">
          <img
            class="rounded w-full"
            :src="anime.cover_image"
            alt="anime cover"
            loading="lazy"
          />

          <div
            class="absolute top-0 bg-gradient-to-b from-slate-900 via-slate-900/75 to-slate-900/0 w-full py-1 md:text-lg pb-4 max-h-full px-2 font-semibold"
          >
            <h1>
              {{ getTextObj(anime.titles) }}
            </h1>
          </div>

          <div
            v-if="false"
            class="bg-gradient-to-t absolute bottom-0 from-slate-900 via-slate-900/50 to-slate-900/0 text-xs w-full"
          >
            <div class="flex">
              <span class="p-1 px-2 flex gap-1 items-center rounded-br w-fit">
                {{ dateSring(anime.start_date) }}

                <i class="ri-calendar-2-line"></i>
              </span>

              <span class="grow"></span>

              <span class="p-1 px-2 flex gap-1 items-center rounded-bl w-fit">
                {{ anime.score }}

                <i :class="`ri-${starIcon(anime.score)}`"></i>
              </span>
            </div>
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'

export default {
  data() {
    return {
      genreList: [
        'Action',
        'Adventure',
        'Comedy',
        'Drama',
        'Fantasy',
        'Magic',
        'Supernatural',
        'Horror',
        'Mystery',
        'Psychological',
        'Romance',
        'Sci-Fi',
      ],
      selectedGenre: [],
      aaAnime: null,
      animeList: [],
      randomAnimeList: [],
    }
  },
  computed: {},
  async mounted() {
    console.log(this.isMDScreen())

    this.aaAnime = useAAAnime({
      p: {
        per_page: this.isMDScreen() ? 25 : 10,
      },
    })

    this.animeList = await this.aaAnime.request()

    this.getRandomAnimes()
  },
  methods: {
    isMDScreen: () => window.innerWidth > 768,
    genreSelect({ target }) {
      if (!target.hasAttribute('genre')) return

      const tGenre = target.getAttribute('genre')

      if (!this.genreList.includes(tGenre)) return

      if (this.selectedGenre.includes(tGenre)) {
        console.log(this.selectedGenre.filter((x) => x === tGenre))
        this.selectedGenre = this.selectedGenre.filter((x) => x !== tGenre)

        return
      }

      this.selectedGenre = [...this.selectedGenre, tGenre]
    },
    getTextObj(arr) {
      if (!arr) return ''
      if (!arr instanceof Object) return ''
      if (arr.en) return arr.en
      if (arr.jp) return arr.jp

      for (const t in arr) {
        if (arr[t] !== null) return t
      }
    },
    starIcon(score) {
      if (score >= 80) return 'star-fill'
      if (score >= 50) return 'star-half-line'

      return 'star-line'
    },
    truncate(t) {
      if (!t) return ''
      
      return t.slice(0, 120) + '...'
    },
    dateSring(d) {
      return dayjs(d).format('YYYY')
    },
    async getRandomAnimes() {
      if (this.selectedGenre > 0) return

      this.randomAnimeList = []
      this.randomAnimeList = await useAARandom('anime', {
        p: {
          per_page: this.isMDScreen() ? 25 : 10,
        },
      })
    },
  },
}
</script>
