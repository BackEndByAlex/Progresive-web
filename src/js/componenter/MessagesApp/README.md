
# Chat App Component

## Beskrivning
`Chat App` är en webkomponent som hanterar en chattapplikation med funktioner som att skicka och ta emot meddelanden, använda emojis, och hantera användarnamn. Komponentens utseende och funktionalitet är kapslad med hjälp av `Shadow DOM`.

---

## Attribut
Denna komponent har inga konfigurerbara attribut.

---

## Events
- **username-saved**:  
  Skickas när användaren har sparat sitt användarnamn. Händelsen är **bubblande** och **composed**, vilket innebär att den kan passera `Shadow DOM` och nå föräldrakomponenter.
   ## Anledning: 
   När användaren angav sitt användarnamn och skickade det, uppstod en bugg i Chat App där meddelanden skickades två gånger, och användaren behövde klicka på "Enter the name" två gånger för att komma vidare. För att lösa detta implementerades en eventlyssnare som lyssnar på händelsen username-saved. Den stänger det befintliga fönstret och öppnar en ny instans av Chat App när användarnamnet har skickats, vilket förhindrar dubbla meddelanden och löser buggen.

---

## Användning
1. Importera komponenten i `index.js`-fil:
   ```javascript
   import './messageapp.js'
   ```
2. Använd komponenten i HTML:
   ```html
   <message-app></message-app>
   ```

---

## Struktur och funktion

### CSS (messagesapp.comp.css.js)
Stilarna kapslar in layouten för chattapplikationen och hanterar element som meddelanden, inputfält, emojis och knappar. Exempel:
```css
.message.sent {
  background: rgb(166, 233, 203);
  align-self: flex-end;
  text-align: right;
}

.message.received {
  background: rgb(184, 84, 92);
  align-self: flex-start;
  text-align: left;
}
```

### HTML (messagesapp.comp.html.js)
HTML-strukturen innehåller:
- **.messages**: Ett område för att visa meddelanden.
- **.emoji-picker**: Ett område för att välja emojis.
- **.input-area**: Ett inputfält och en knapp för att skicka meddelanden.

Exempel på HTML:
```html
<div class="messageapp">
  <div class="content">
    <div class="messages"></div>
    <div class="emoji-picker">
      <span class="emoji">😊</span>
      <span class="emoji">😂</span>
      <span class="emoji">❤️</span>
    </div>
    <div class="input-area">
      <input type="text" class="message-input" placeholder="Skriv ditt meddelande..." />
      <button class="send-btn">Skicka</button>
    </div>
  </div>
</div>
```

### JavaScript (messageapp.js)
Komponenten använder `Shadow DOM` och inkluderar följande funktionalitet:
- **Användarnamnshantering**: Kontrollerar om ett användarnamn finns sparat i `localStorage`. Om inte, begär det ett användarnamn.
- **WebSocket-anslutning**: Använder `WebSocketManager` för att skicka och ta emot meddelanden.
- **Meddelanden**: Lägger till meddelanden i UI och sparar dem i `localStorage`.

Kodexempel för att spara ett användarnamn:
```javascript
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
```

---

## WebSocketManager.js
Hanterar WebSocket-anslutningar för chattapplikationen. Funktioner:
- **connect**: Ansluter till servern och lyssnar på inkommande meddelanden.
- **send**: Skickar meddelanden till servern.
- **addMessageListener**: Lägger till lyssnare för inkommande meddelanden.

---

## Exempel
### HTML
```html
<message-app></message-app>
```
