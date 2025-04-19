
# Windows Component

## Beskrivning
`Windows` är en webkomponent som representerar ett fönster i användargränssnittet. Komponentens syfte är att visa och hantera applikationer som `Chat App`, `Memory App` och `YouTube App`. Den inkluderar funktionalitet för att flytta, ändra storlek och stänga fönster, samt laddar dynamiskt innehåll baserat på titeln (`titles`-attributet).

---

## Attribut
- **titles** *(string)*: Anger vilken applikation som ska laddas i fönstret. Stöder följande värden:
  - `"Chat App"`
  - `"Memory App"`
  - `"YouTube App"`

---

## Events
- **username-saved**: Lyssnar på en händelse från `message-app` och hanterar en     fönsterövergång.
  ## Anledning: 
  När användaren angav sitt användarnamn och skickade det, uppstod en bugg där meddelanden skickades två gånger och användaren behövde klicka "Enter the name" två gånger. För att lösa detta, implementerades en eventlyssnare som stänger det befintliga fönstret och öppnar en ny instans när användarnamnet har skickats, vilket förhindrar dubbla meddelanden och löste buggen.

---

## Användning
1. Importera komponenten i `index.js`-fil:
   ```javascript
   import './windows.js'
   ```
2. Använd komponenten i HTML och ange ett värde för `titles`:
   ```html
   <app-window titles="Chat App"></app-window>
   ```

---

## Struktur och funktion

### CSS (windows.comp.css.js)
Stilarna definierar utseendet för fönstret, inklusive:
- **.window**: Grunderna för fönstrets layout och utseende.
- **.header**: Titelraden, som inkluderar en stäng-knapp.
- **.resize-handle**: Elementet för att ändra storlek på fönstret.

Exempel på CSS:
```css
.window {
  position: absolute;
  background: #ffffff;
  border: 1px solid #000;
  display: flex;
  flex-direction: column;
  user-select: none;
  z-index: 1;
}
.resize-handle {
  position: absolute;
  width: 10px;
  height: 10px;
  cursor: se-resize;
    right: 0; /* Alltid vid högra kanten */
  bottom: 0; /* Alltid vid nedre kanten */
  cursor: se-resize;
}
```

### HTML (windows.comp.html.js)
HTML-strukturen innehåller:
- **.header**: En titelrad med en stäng-knapp.
- **.content**: Sektionen där applikationer laddas.
- **.resize-handle**: Element för att ändra storlek.

Exempel på HTML:
```html
<div class="window">
  <div class="header">
    <span class="title"></span>
    <button class="close-btn" aria-label="Close">X</button>
  </div>
  <div class="content"></div>
  <div class="resize-handle bottom-right"></div>
</div>
```

### JavaScript (windows.js)
Komponenten använder `Shadow DOM` och inkluderar följande funktionalitet:
- **Dynamic content loading**: Laddar applikationer baserat på `titles`-attributet.
- **Drag-and-drop**: Gör fönstret flyttbart.
- **Resizing**: Tillåter användaren att ändra storlek på fönstret.
- **Focus management**: Flyttar fönstret till förgrunden vid klick.
- **Close functionality**: Stänger fönstret när stäng-knappen klickas.

Kodexempel för att ladda innehåll:
```javascript
loadApp(contentArea) {
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
```

---

## Exempel
### HTML
```html
<app-window titles="YouTube App"></app-window>
```
