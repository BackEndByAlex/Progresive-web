
# Memory Game Component

## Beskrivning
`Memory Game` är en webkomponent som representerar ett minnesspel. Spelet inkluderar funktioner som olika svårighetsnivåer, en timer, poängräkning och highscore-hantering. Det är byggt med flera moduler för att hantera olika delar av spelet, som kort, meny, poängtavla och tidshantering.

---

## Funktionalitet
1. **Svårighetsnivåer**  
   Användaren kan välja mellan nivåerna Easy, Medium och Hard, vilket påverkar antalet kort och tiden.

2. **Timer och poängräkning**  
   Spelet använder en nedräkningstimer och tilldelar bonuspoäng för att matcha kort.

3. **Highscore-hantering**  
   High scores lagras i `localStorage` och visas i spelets highscore-meny.

4. **Dynamisk rendering**  
   Kort genereras och blandas dynamiskt baserat på den valda nivån.

---

## Användning
1. Importera komponenten i `index.js`-fil:
   ```javascript
   import './memoryapp.js'
   ```
2. Använd komponenten i HTML:
   ```html
   <memory-app></memory-app>
   ```

---

## Struktur och funktion

### CSS (memoryapp.comp.css.js)
Stilar som hanterar spelets layout, inklusive kort, kontrollpanel och timer:
```css
.memory-app {
  display: grid;
  gap: 1rem;
  background: #f0f0f0;
  padding: 1rem;
  border-radius: 1rem;
}
```

### HTML (memoryapp.comp.html.js)
HTML-strukturen för spelets kontrollpanel och kortcontainer:
```html
<div class="control-panel">
  <score-board></score-board>
  <button class="restart-btn">Back</button>
</div>
<div class="memory-container"></div>
```

### JavaScript (memoryapp.js)
Huvudkomponenten MemoryApp hanterar spelets logik, inklusive initialisering av spelet och hantering av kort. Här är ett exempel direkt från koden:
```javascript
startGame (level) {
  this.shadowRoot.innerHTML = ''
  this.shadowRoot.append(MemoryAppCSS.cloneNode(true))
  this.shadowRoot.append(MemoryAppHTML.content.cloneNode(true))

  const restartButton = this.shadowRoot.querySelector('.restart-btn')
  restartButton.addEventListener('click', () => this.showMainMenu())

  const initialTime = level === 'easy' ? 8 : level === 'normal' ? 15 : level === 'hard' ? 30 : 0
  const bonusTime = level === 'easy' ? 4 : level === 'normal' ? 5 : level === 'hard' ? 10 : 0

  const timerElement = document.createElement('div')
  timerElement.id = 'timer'
  timerElement.textContent = `Time: ${initialTime}s`
  this.shadowRoot.querySelector('.control-panel').appendChild(timerElement)

  const username = localStorage.getItem('username') || 'Guest'
  const scoreboard = this.shadowRoot.querySelector('score-board')
  scoreboard.setUsername(username) // Uppdatera användarnamnet

  this.timeHandler = new TimeHandler(
    initialTime,
    bonusTime,
    () => {
      const scoreElement = scoreboard.shadowRoot.querySelector('#score')
      const score = parseInt(scoreElement.textContent, 10) || 0
      this.saveHighscore(score, username) // Spara poängen
      this.showMainMenu() // Återgå till huvudmenyn
    },
    this.shadowRoot.querySelector('#timer') // Skicka referensen till timerelementet
  )

  this.timeHandler.start()
  this.initGame(level)
}

```

### Moduler
- **memory.card.js**: Hanterar enskilda kort och dess tillstånd (flippade, matchade).  
- **memory.menu.js**: Visar huvudmenyn och tar emot användarens val av svårighetsnivå.  
- **memory.scoreboard.js**: Hanterar poängtavlan och visar användarnamn, poäng och försök.  
- **memory.time.handler.js**: Sköter nedräkningstimern och hanterar bonuspoäng.  

---

## Exempel
### HTML
```html
<memory-app></memory-app>
```
