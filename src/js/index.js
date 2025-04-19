/**
 * The main script file of the application.
 *
 * @author Alexandru Antonescu <aa227wr@student.lnu.se>
 * @version 1.0.0
 */

import './componenter/CustomApp-Youtube/index.js'
import './componenter/Desktopen/index.js'
import './componenter/Docker/index.js'
import './componenter/MemoryApp/index.js'
import './componenter/MessagesApp/index.js'
import './componenter/Windows/index.js'

/**
 * The main script file of the application. This script is responsible for initializing the application
 * and setting up the event listeners for the dock buttons. When a dock button is clicked, a new window
 * is created and appended to the body of the document.
 */

let initialized = false

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  const container = document.createElement('div')
  container.setAttribute('id', 'app-container')
  document.body.append(container)

  const desktop = document.createElement('desktop-view')
  container.append(desktop)

  setTimeout(() => {
    const shadowRoot = desktop.shadowRoot // Hämta shadow DOM
    const dock = shadowRoot.querySelector('dock-view')

    if (!dock || !dock.shadowRoot) {
      console.error('dock-view eller dess shadow root hittades inte.')
      return
    }

    if (!initialized) {
      initialized = true
      dock.shadowRoot.addEventListener('click', (e) => {
        const button = e.target.closest('button') // Hitta närmaste knapp
        if (!button) return
        const appName = button.title || e.target.alt // Hämta titel från knappen eller alt från bilden
        if (!appName) return

        const mainContent = shadowRoot.querySelector('.main-content') // Hämta main-content från desktop-view
        const appWindow = document.createElement('app-window')
        appWindow.setAttribute('titles', appName)
        mainContent.append(appWindow) // Skapa och lägg till fönster
      })
    }
  }, 10) // Vänta 10ms
})
