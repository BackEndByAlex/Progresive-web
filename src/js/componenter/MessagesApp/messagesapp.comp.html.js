const MessageappHTML = document.createElement('template')
MessageappHTML.innerHTML = `
  <div class="messageapp">
    <div class="content">
      <div class="messages"></div>
      <div class="emoji-picker">
        <span class="emoji">😊</span>
        <span class="emoji">😂</span>
        <span class="emoji">❤️</span>
        <span class="emoji">👍</span>
        <span class="emoji">🎉</span>
        <!-- Lägg till fler emojis här -->
      </div>
      <div class="input-area">
        <input type="text" class="message-input" placeholder="Skriv ditt meddelande..." />
        <button class="send-btn">Skicka</button>
      </div>
    </div>
  </div>
`
export { MessageappHTML }
