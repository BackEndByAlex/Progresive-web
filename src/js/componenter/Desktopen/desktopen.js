import { CSStemplate } from './desktopen.comp.css.js'
import { HTMLtemplate } from './desktopen.comp.html.js'

/**
 * Desktopen class that extends HTMLElement.
 * The Desktopen class is used to create a desktop component.
 */
export default class Desktopen extends HTMLElement {
  /**
   * Creates an instance of Desktopen and attaches the shadow DOM.
   * The shadow DOM is used to encapsulate the component's styles and markup.
   */
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.append(CSStemplate.content.cloneNode(true))
    this.shadowRoot.append(HTMLtemplate.content.cloneNode(true))
  }

  /**
   * Called when the element is connected to the DOM.
   * Adds an event listener to the clear data button.
   */
  connectedCallback () {
    // Lägg till en eventlistener för rensningsknappen
    const clearDataButton = this.shadowRoot.querySelector('#clear-data-btn')
    clearDataButton.addEventListener('click', async () => {
      // Rensa localStorage och sessionStorage
      localStorage.clear()
      sessionStorage.clear()

      if ('caches' in window) {
        const cacheNames = await caches.keys()
        cacheNames.forEach(cacheName => caches.delete(cacheName))
      }
    })

    const timeButon = this.shadowRoot.querySelector('#time-btn')
    const TimeDisplay = this.shadowRoot.querySelector('#time-display')
    const swipeMenu = this.shadowRoot.querySelector('#swipe-up-menu')

    // Uppdatera Tid
    setInterval(() => {
      const now = new Date()
      TimeDisplay.textContent = now.toLocaleTimeString()
    }, 1000)

    timeButon.addEventListener('click', () => {
      swipeMenu.classList.toggle('visible')
      swipeMenu.classList.toggle('hidden')
      this.updateLocationAndWeather()
    })

    const statusButton = this.shadowRoot.querySelector('#status-btn')

    // Funktion för att uppdatera status
    /**
     * Updates the status button based on the network status.
     * If the user is online, it removes the 'offline' class and sets the title to 'Online'.
     * If the user is offline, it adds the 'offline' class and sets the title to 'Offline'.
     */
    const updateStatus = () => {
      if (navigator.onLine) {
        statusButton.classList.remove('offline')
        statusButton.title = 'Online'
      } else {
        statusButton.classList.add('offline')
        statusButton.title = 'Offline'
      }
    }

    // Initial status
    updateStatus()

    // Lyssna på ändringar i nätverksstatus
    window.addEventListener('online', updateStatus)
    window.addEventListener('offline', updateStatus)
  }

  /**
   * Updates the location and weather information.
   * Fetches the current geographical location and weather data, then updates the DOM elements.
   */
  async updateLocationAndWeather () {
    const locationDiv = this.shadowRoot.querySelector('#location')
    const weatherDiv = this.shadowRoot.querySelector('#weather')

    try {
      // hämta plats
      const position = await new Promise((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject)
      )
      const { latitude, longitude } = position.coords

      const geocodeResponse = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
      )
      const geocodeData = await geocodeResponse.json()
      const city = geocodeData.address.city || geocodeData.address.town || geocodeData.address.village || 'Okänd plats'

      locationDiv.textContent = `Plats: ${city} (Lat: ${latitude.toFixed(2)}, Lon: ${longitude.toFixed(2)})`

      // Fetch weather from Open-Meteo
      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
      )
      const weatherData = await weatherResponse.json()
      const { temperature, windspeed } = weatherData.current_weather
      weatherDiv.textContent = `Temp: ${temperature}°C, Wind: ${windspeed} km/h`
    } catch (error) {
      locationDiv.textContent = 'Kunde inte hämta plats.'
      weatherDiv.textContent = 'Kunde inte hämta väder.'
    }
  }
}
customElements.define('desktop-view', Desktopen)
