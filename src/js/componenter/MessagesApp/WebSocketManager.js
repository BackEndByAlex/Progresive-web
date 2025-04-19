/**
 * Manages WebSocket connections and message listeners.
 */
class WebSocketManager {
  /**
   * Creates an instance of WebSocketManager.
   */
  constructor () {
    this.serverURL = 'wss://courselab.lnu.se/message-app/socket'
    this.socket = null
    this.listeners = []
  }

  /**
   * Connects to the WebSocket server and sets up event listeners.
   * If the socket is already open or connecting, this method returns.
   * If the socket is closed, it will attempt to reconnect every 3 seconds.
   * If the socket is not connected, it will create a new WebSocket instance.
   */
  connect () {
    // If the socket is open or connecting, returns
    if (this.socket && (this.socket.readyState === WebSocket.OPEN || this.socket.readyState === WebSocket.CONNECTING)) return

    this.socket = new WebSocket(this.serverURL)

    this.listeners = []

    this.socket.addEventListener('message', (event) => {
      const data = JSON.parse(event.data) // Parse the data from the server
      this.listeners.forEach((callback) => callback(data))
    })

    this.socket.addEventListener('close', () => {
      setTimeout(() => this.connect(), 3000)
    })

    this.socket.addEventListener('error', () => {
      alert('WebSocket-anslutningen misslyckades. Försöker igen...')
    })
  }

  /**
   * Sends a message to the WebSocket server.
   * If the socket is open, the message is sent.
   *
   * @param {object} message - The message to be sent.
   */
  send (message) {
    // If the socket is open, send the message
    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(message))
    } else {
      console.error('WebSocket is not connected')
    }
  }

  /**
   * Adds a message listener callback to the listeners array.
   *
   * @param {Function} callback - The callback function to be added.
   */
  addMessageListener (callback) {
    this.listeners.push(callback) // Add the callback to the listeners array
  }
}

export const websocketManager = new WebSocketManager()
