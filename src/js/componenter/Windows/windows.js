import { WindowCSS } from './windows.comp.css.js'
import { WindowHTML } from './windows.comp.html.js'

/**
 * Represents a window component, which is a custom element.
 * The window component is used to create a window for the chat, memory, and YouTube applications.
 *
 * @augments HTMLElement
 */
export default class Windows extends HTMLElement {
  static lastPosition = { x: 100, y: 100 }
  static highestZIndex = 1
  /**
   * Creates an instance of the Windows component.
   */
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.append(WindowCSS.content.cloneNode(true))
    this.shadowRoot.append(WindowHTML.content.cloneNode(true))
  }

  /**
   * Called when the element is connected to the document's DOM.
   * This method initializes the window component by setting the title, loading the content, initializing the close button, drag and drop, resizing, focus on click, and window transition.
   */
  connectedCallback () {
    this.setTitle()
    const contentArea = this.shadowRoot.querySelector('.content')
    this.loadApp(contentArea) // Steg 2: Ladda innehållet

    this.initializeCloseButton()
    const windowElement = this.shadowRoot.querySelector('.window')

    // Ställ in standardstorlek baserat på applikationstiteln
    const title = this.getAttribute('titles')
    if (title === 'YouTube App') {
      windowElement.style.width = '500px'
      windowElement.style.height = '650px'
    } else if (title === 'Chat App') {
      windowElement.style.width = '300px'
      windowElement.style.height = '400px'
    } else if (title === 'Memory App') {
      windowElement.style.width = '400px'
      windowElement.style.height = '500px'
    }

    this.initializeDragAndDrop(windowElement)
    this.initializeResize(windowElement)

    windowElement.style.left = `${Windows.lastPosition.x}px`
    windowElement.style.top = `${Windows.lastPosition.y}px`

    Windows.lastPosition.x += 30 // Flytta 30px åt höger
    Windows.lastPosition.y += 30

    // Placera fönstret med en offset
    const desktop = document.querySelector('desktop-view').shadowRoot.querySelector('.desktop')
    const desktopRect = desktop.getBoundingClientRect()

    if (Windows.lastPosition.x + windowElement.offsetWidth > desktopRect.right) {
      Windows.lastPosition.x = 100 // Återställ X-position
    }
    if (Windows.lastPosition.y + windowElement.offsetHeight > desktopRect.bottom) {
      Windows.lastPosition.y = 100 // Återställ Y-position
    }

    this.moveToFront(windowElement)
    // Gör så att fönstret flyttas fram vid klick
    this.initializeFocusOnClick(windowElement)

    // Lyssna på händelsen från message-app
    this.shadowRoot.addEventListener('username-saved', (event) => {
      // Anropa metoden för att hantera fönsterövergångs
      this.handleWindowTransition('Chat App')
    })
  }

  /**
   * Sets the title of the window based on the 'titles' attribute.
   */
  setTitle () {
    const title = this.getAttribute('titles')
    this.shadowRoot.querySelector('.title').innerText = title
  }

  /**
   * Loads the appropriate application content into the window based on the title attribute.
   *
   * @param {HTMLElement} contentArea - The content area element where the app will be loaded.
   */
  loadApp (contentArea) {
    const title = this.getAttribute('titles')
    if (title === 'Chat App') {
      const chatApp = document.createElement('message-app')
      contentArea.appendChild(chatApp)
    } else if (title === 'Memory App') {
      const memoryApp = document.createElement('memory-app')
      contentArea.appendChild(memoryApp)
    } else if (title === 'YouTube App') {
      const youtubeApp = document.createElement('youtube-app')
      contentArea.appendChild(youtubeApp)
    }
  }

  /**
   * Initializes the drag and drop functionality for the window element.
   *
   * @param {HTMLElement} windowElement - The window element to be made draggable.
   */
  initializeDragAndDrop (windowElement) {
    let isDragging = false
    let offsetX = 0
    let offsetY = 0

    const header = this.shadowRoot.querySelector('.header')

    /**
     * Handles the mouse move event for dragging the window.
     *
     * @param {MouseEvent} event - The mouse move event.
     */
    const onMouseMove = (event) => {
      if (!isDragging) return

      // Beräkna nya positioner
      let newLeft = event.clientX - offsetX
      let newTop = event.clientY - offsetY

      const desktop = document.querySelector('desktop-view').shadowRoot.querySelector('.desktop')

      // Begränsa inom desktop
      const desktopRect = desktop.getBoundingClientRect()
      const windowRect = windowElement.getBoundingClientRect()

      if (newLeft < desktopRect.left) newLeft = desktopRect.left // Vänstergräns
      if (newTop < desktopRect.top) newTop = desktopRect.top // Övre gräns
      if (newLeft + windowRect.width > desktopRect.right) {
        newLeft = desktopRect.right - windowRect.width // Högergräns
      }
      if (newTop + windowRect.height > desktopRect.bottom) {
        newTop = desktopRect.bottom - windowRect.height // Nedre gräns
      }
      // Uppdatera position
      windowElement.style.left = `${newLeft}px`
      windowElement.style.top = `${newTop}px`
    }

    /**
     * Handles the mouse up event to stop dragging the window.
     */
    const onMouseUp = () => {
      isDragging = false
      windowElement.classList.remove('dragging')
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
    }

    header.addEventListener('mousedown', (event) => {
      isDragging = true
      windowElement.classList.add('dragging')

      // Correctly calculate the offsets
      const rect = windowElement.getBoundingClientRect()
      offsetX = event.clientX - rect.left
      offsetY = event.clientY - rect.top

      document.addEventListener('mousemove', onMouseMove)
      document.addEventListener('mouseup', onMouseUp)
    })
  }

  /**
   * Initializes the resize functionality for the window element.
   *
   * @param {HTMLElement} windowElement - The window element to be made resizable.
   */
  initializeResize (windowElement) {
    const resizeHandle = this.shadowRoot.querySelector('.resize-handle')
    resizeHandle.addEventListener('mousedown', (event) => {
      event.preventDefault()

      const startWidth = windowElement.offsetWidth // Startstorlek på fönstret
      const startHeight = windowElement.offsetHeight
      const startX = event.clientX // Startposition på muspekaren
      const startY = event.clientY

      /**
       * Handles the mouse move event for resizing the window.
       *
       * @param {MouseEvent} event - The mouse move event.
       */
      const onResize = (event) => {
        // Uppdatera storleken på fönstret
        let newWidth = startWidth + event.clientX - startX
        let newHeight = startHeight + event.clientY - startY

        // Begränsa till minimal bredd och höjd
        const title = this.getAttribute('titles')
        if (title === 'YouTube App') {
          newWidth = Math.max(500, newWidth)
          newHeight = Math.max(650, newHeight)
        } else if (title === 'Memory App') {
          newWidth = Math.max(400, newWidth)
          newHeight = Math.max(500, newHeight)
        } else if (title === 'Chat App') {
          newWidth = Math.max(300, newWidth)
          newHeight = Math.max(400, newHeight)
        }

        windowElement.style.width = `${newWidth}px` // Uppdatera storleken på fönstret
        windowElement.style.height = `${newHeight}px`
      }

      /**
       * Handles the mouse up event to stop resizing the window.
       */
      const onStopResize = () => {
        document.removeEventListener('mousemove', onResize)
        document.removeEventListener('mouseup', onStopResize)
      }

      document.addEventListener('mousemove', onResize)
      document.addEventListener('mouseup', onStopResize)
    })
  }

  /**
   * Initializes the close button functionality for the window element.
   */
  initializeCloseButton () {
    const closeButton = this.shadowRoot.querySelector('.close-btn')
    if (closeButton) {
      closeButton.addEventListener('click', () => this.remove())
    }
  }

  /**
   * Initializes the focus on click functionality for the window element.
   *
   * @param {HTMLElement} windowElement - The window element to be focused on click.
   */
  initializeFocusOnClick (windowElement) {
    const header = this.shadowRoot.querySelector('.header')

    header.addEventListener('mousedown', () => {
      const allWindows = document.querySelectorAll('app-window')
      allWindows.forEach(window => {
        window.shadowRoot.querySelector('.window').style.zIndex = 1
      })

      // Öka z-index för det aktuella fönstret
      Windows.highestZIndex += 1
      windowElement.style.zIndex = Windows.highestZIndex
    })
  }

  /**
   * Moves the window element to the front by increasing its z-index.
   *
   * @param {HTMLElement} windowElement - The window element to be moved to the front.
   */
  moveToFront (windowElement) {
    if (!Windows.highestZIndex) {
      Windows.highestZIndex = 1
    }
    Windows.highestZIndex += 1
    windowElement.style.zIndex = Windows.highestZIndex
  }

  /**
   * Handles the transition of the window to a new application.
   *
   * @param {string} titleToClose - The title of the new application to load.
   */
  handleWindowTransition (titleToClose) {
  // Hitta det existerande fönstret baserat på titeln
    const desktopView = document.querySelector('desktop-view')
    const mainContent = desktopView.shadowRoot.querySelector('.main-content')
    const existingWindow = mainContent.querySelector(`app-window[titles="${titleToClose}"]`)

    if (existingWindow) {
      // Uppdatera innehållet i det befintliga fönstret
      const contentArea = existingWindow.shadowRoot.querySelector('.content')
      contentArea.innerHTML = '' // Rensa tidigare innehåll

      // Lägg till nytt innehåll (starta om appen alltså)
      const chatApp = document.createElement('message-app')
      contentArea.appendChild(chatApp)
    } else {
      console.error(`Fönster med titeln "${titleToClose}" hittades inte.`)
    }
  }
}
customElements.define('app-window', Windows)
