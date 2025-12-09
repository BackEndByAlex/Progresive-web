import CompYoutubeCSS from "./customapp.comp-css.js"
import CompYoutubeHTML from "./customapp.comp-html.js"

/**
 * Custom element for YouTube search and video playback.
 */
export default class CustomYoutube extends HTMLElement {
  /**
   * Creates an instance of CustomYoutube and attaches shadow DOM.
   * Appends the CSS and HTML templates to the shadow DOM.
   */
  constructor() {
    super()
    this.cache = new Map()
    this.requestCount = 0

    const shadow = this.attachShadow({ mode: "open" })
    shadow.appendChild(CompYoutubeCSS.content.cloneNode(true))
    shadow.appendChild(CompYoutubeHTML.content.cloneNode(true))

    shadow.querySelector("#searchButton").addEventListener("click", () => {
      const query = this.shadowRoot.querySelector("#searchInput").value
      this.searchYoutube(query, shadow)
    })
  }

  /**
   * Searches YouTube for videos based on the query and updates the video list.
   * And using the videoId, it plays the video in the player container.
   *
   * @async @function searchYoutube - Searches YouTube for videos based on the query and updates the video list.
   * @param {string} query - The search query.
   * @param {ShadowRoot} shadow - The shadow DOM root.
   * @returns {Promise<void>} - A promise that resolves when the search is complete.
   */
  async searchYoutube(query, shadow) {
    const cachedData = this.getFromLocalStorage(query)
    if (this.cache.has(query)) {
      this.cache.get(query, cachedData)
      return this.updateVideoList(cachedData.items, shadow)
    }

    this.requestCount += 100
    const apiKey = process.env.API_KEY
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
      query
    )}&key=${apiKey}&fields=items(id(videoId),snippet(title,thumbnails))`

    try {
      const response = await fetch(url)
      const data = await response.json()

      this.saveToLocalStorage(query, data)
      this.cache.set(query, data)

      return this.updateVideoList(data.items, shadow)
    } catch (error) {
      console.alert("Failed to fetch videos. Please try again later.")
    }
  }

  /**
   * Saves the search query and data to local storage with a timestamp.
   *
   * @function saveToLocalStorage
   * @param {string} query - The search query.
   * @param {object} data - The data to be saved.
   */
  saveToLocalStorage(query, data) {
    const cachedData = { data, timestamp: Date.now() }
    localStorage.setItem(query, JSON.stringify(cachedData))
  }

  /**
   * Retrieves the cached data from local storage for the given query.
   *
   * @function getFromLocalStorage
   * @param {string} query - The search query.
   * @returns {object|null} - The cached data or null if not found or expired.
   */
  getFromLocalStorage(query) {
    const cachedData = localStorage.getItem(query)
    if (!cachedData) return null

    const parsedData = JSON.parse(cachedData)

    // Kontrollera om cache-data är för gammal (1 timme i detta fall)
    const cacheTimeout = 3600 * 1000 // 1 timme i millisekunder
    if (Date.now() - parsedData.timestamp > cacheTimeout) {
      console.log("Cache har gått ut för denna fråga.")
      localStorage.removeItem(query)
      return null
    }

    return parsedData.data // Returnera endast datadelen
  }

  /**
   * Updates the video list in the shadow DOM with the provided videos.
   * From cache or from the search result.
   *
   * @function updateVideoList
   * @param {Array} videos - An array of video objects to display.
   */
  updateVideoList(videos) {
    const videoListElement = this.shadowRoot.querySelector("#videoList")
    videoListElement.innerHTML = ""

    videos.forEach((video) => {
      const videoElement = document.createElement("div")
      videoElement.className = "video-item"
      videoElement.innerHTML = `
        <img src="${video.snippet.thumbnails.medium.url}" alt="${video.snippet.title}">
        <h3>${video.snippet.title}</h3>
      `

      videoElement.addEventListener("click", () => {
        this.playVideo(video.id.videoId)
      })
      videoListElement.appendChild(videoElement)
    })
  }

  /**
   * Plays the selected video in the player container.
   * The video is embedded using an iframe.
   *
   * @function playVideo - Plays the selected video in the player container.
   * @param {string} videoId - The ID of the video to play.
   */
  playVideo(videoId) {
    const playerContainer = this.shadowRoot.querySelector("#playerContainer")
    playerContainer.innerHTML = `
    <iframe
      width="100%"
      height="315"
      src="https://www.youtube.com/embed/${videoId}?modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&disable_polymer=true&autoplay=1&fs=1"
      frameborder="0"
      allowfullscreen>
    </iframe>
    `
  }
}

customElements.define("youtube-app", CustomYoutube)
