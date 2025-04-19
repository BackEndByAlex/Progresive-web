import { MessageappCSS } from './messagesapp.comp.css.js'
import { MessageappHTML } from './messagesapp.comp.html.js'
import { websocketManager } from './WebSocketManager.js'

/**
 * Messageapp is a custom HTML element that handles a chat application.
 */
export default class Messageapp extends HTMLElement {
  /**
   * Creates an instance of Messageapp.
   * The constructor attaches the shadow DOM and appends the CSS and HTML templates.
   * And initializes the username and messages properties.
   */
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.append(MessageappCSS.content.cloneNode(true))
    this.shadowRoot.append(MessageappHTML.content.cloneNode(true))
    this.username = null
    this.messages = []
  }

  /**
   * Called when the element is connected to the document's DOM.
   * Initializes the input, send button, and messages container.
   */
  connectedCallback () {
    this.input = this.shadowRoot.querySelector('.message-input')
    this.sendButton = this.shadowRoot.querySelector('.send-btn')
    this.MessagesContainer = this.shadowRoot.querySelector('.messages')

    this.initEmojis()
    this.checkUsername()
  }

  /**
   * Checks if the user has a saved username in localStorage.
   * If a username is found, it initializes the chat.
   * Otherwise, it requests a username from the user.
   */
  checkUsername () {
    const savedUsername = localStorage.getItem('username')
    if (savedUsername) {
      this.username = savedUsername
      this.initializeChat()
    } else {
      this.requestUsername()
    }
  }

  /**
   * Requests the username from the user if it is not found in localStorage.
   * Sets up the input placeholder and send button text.
   * Saves the username and initializes the chat when the user submits the username.
   */
  requestUsername () {
    this.input.placeholder = 'skriv ditt användarnamn...'
    this.sendButton.content = 'Spara'

    /**
     * Saves the username entered by the user.
     */
    const saveUsername = () => {
      const name = this.input.value.trim()
      if (name) {
        this.username = name
        localStorage.setItem('username', name)

        const event = new CustomEvent('username-saved', {
          detail: { username: name },
          bubbles: true, // Viktigt för att händelsen ska nå upp till 'Windows'
          composed: true // Gör det möjligt att passera Shadow DOM
        })
        this.dispatchEvent(event)

        this.initializeChat() // Starta chatten efter att användarnamnet har sparats
      }
    }

    this.sendButton.addEventListener('click', saveUsername, { once: true }) // Kör endast en gång
    this.input.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') saveUsername()
    })
  }

  /**
   * Initializes the chat by setting up the input placeholder, send button text,
   * connecting to the WebSocket, adding message listeners, loading previous messages,
   * and setting up event listeners for sending messages.
   */
  initializeChat () {
    this.input.placeholder = 'skriv ett meddelande...'
    this.sendButton.content = 'Skicka'

    websocketManager.connect()
    websocketManager.addMessageListener((data) => {
      if (data.type === 'message') {
        this.addMessage(data.username, data.data)
      }
    })

    // Ladda tidigare meddelanden från localStorage
    const savedMessages = JSON.parse(localStorage.getItem('messages')) || []
    savedMessages.forEach((message) => {
      this.addMessage(message.username, message.data)
    })

    this.sendButton.addEventListener('click', () => this.sendMessage())
    this.input.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') this.sendMessage()
    })
  }

  /**
   * Initializes the emojis by adding click event listeners to each emoji element.
   * When an emoji is clicked, it is appended to the input field.
   */
  initEmojis () {
    this.shadowRoot.querySelectorAll('.emoji').forEach((emoji) => {
      emoji.addEventListener('click', () => {
        this.input.value += emoji.innerText
        this.input.focus()
      })
    })
  }

  /**
   * Sends a message via WebSocket.
   * Retrieves the message from the input field, constructs the message object,
   * sends it through the WebSocket, and clears the input field.
   */
  sendMessage () {
    const messageData = this.input.value.trim()
    if (messageData) {
      const message = {
        type: 'message',
        data: messageData,
        username: this.username,
        channel: 'my, not so secret, channel',
        key: 'eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd'
      }
      websocketManager.send(message)

      this.input.value = ''
    }
  }

  // Lägg till meddelande i UI och scrolla till botten
  /**
   * Adds a message to the messages container and updates the local storage.
   * The message is displayed in the UI, and the messages array is updated.
   * If the number of messages exceeds 20, the oldest message is removed.
   *
   * @param {string} username - The username of the message sender.
   * @param {string} message - The message content.
   */
  addMessage (username, message) {
    const messageElement = document.createElement('div')
    messageElement.textContent = `${username}: ${message}`
    messageElement.classList.add('message', username === this.username ? 'sent' : 'received')
    this.MessagesContainer.append(messageElement)
    this.MessagesContainer.scrollTop = this.MessagesContainer.scrollHeight

    // Begränsa antalet meddelanden till 20
    if (this.MessagesContainer.children.length > 20) {
      this.MessagesContainer.removeChild(this.MessagesContainer.firstChild) // Ta bort det första (äldsta) meddelandet
    }

    // Scrolla automatiskt till botten
    this.MessagesContainer.scrollTop = this.MessagesContainer.scrollHeight

    // Spara i localStorage (om du använder lokal lagring)
    this.messages.push({ username, data: message })
    if (this.messages.length > 20) {
      this.messages.shift() // Ta bort det äldsta meddelandet från arrayen
    }
    localStorage.setItem('messages', JSON.stringify(this.messages))
  }
}
customElements.define('message-app', Messageapp)
