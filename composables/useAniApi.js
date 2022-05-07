import axios from 'axios'

const baseUrl = 'https://api.aniapi.com/v1/'

const redirectURI =
  process.env.NODE_ENV === 'development'
    ? 'http://192.168.1.77:3000/auth'
    : 'http://letswatch.one/auth'

let JWT = ''

class AniAPI {
  url = ''
  params = ''
  data = null
  page = 1
  lastpage = 0
  count = 0

  constructor(uri, params) {
    this.params = new URLSearchParams(params)

    this.url = `${baseUrl}${uri}?`
  }

  async request() {
    const {
      data: { data, status_code },
    } = await axios.get(this.url + this.params.toString(), {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${JWT}`,
      },
    })

    if (status_code !== 200) return

    this.data = data.documents
    this.count = data.count
    this.lastpage = data.last_page
    this.page = data.current_page

    return this.data
  }

  next() {
    if (this.canNext()) return

    this.params.page = this.page += 1
  }

  prev() {
    if (this.canPrev()) return

    this.params.page = this.page -= 1
  }

  canNext() {
    return this.page < this.lastpage
  }

  canPrev() {
    return this.page > 1
  }

  params(params) {
    params.forEach((x) => {
      this.params.set(x, params[x])
    })
  }
}

class AniAPIRandom {
  url = ''
  params = ''

  constructor(uri, params) {
    this.params = new URLSearchParams(params)

    this.url = `${baseUrl}${uri}?`
  }

  async request() {
    const {
      data: { data, status_code },
    } = await axios.get(this.url + this.params.toString(), {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${JWT}`,
      },
    })
    console.log(data)

    if (status_code !== 200) return

    return data
  }
}

const getJWT = async () => {
  if (JWT !== '') return

  const { data } = await axios.get('/jwt')

  console.log(data)
}

getJWT()

export const useAAAnime = (params = {}) => {
  return new AniAPI('anime/' + (params.id || ''), params.p || {})
}

export const useAAEpisode = (params = {}) => {
  return new AniAPI('episode/' + (params.id || ''), params.p || {})
}

export const useAARandom = async (uri, params = {}) => {
  const nsfw = params.nsfw ? '/' + params.nsfw : ''
  const count = params.count ? params.count : 10
  const id = params.id || ''

  return await new AniAPIRandom(
    `random/${uri}/${id}${count}${nsfw}`,
    params.p || {}
  ).request()
}