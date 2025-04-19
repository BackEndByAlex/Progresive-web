
# Docker Component

## Beskrivning
`Docker` är en webkomponent som fungerar som ett dockningsområde längst ner på skärmen. Den innehåller knappar som representerar applikationer, och varje knapp har en ikon och en titel. Komponentens utseende och funktionalitet är kapslad med hjälp av `Shadow DOM`.

---

## Attribut
Denna komponent har inga konfigurerbara attribut.

---

## Events
- **Klick på knapp**: Komponentens `connectedCallback`-metod är förberedd för att hantera klick på knappar, som öppnar en instans. 

---

## Användning
1. Importera komponenten i `index.js`-fil:
   ```javascript
   import './docker.js'
   ```
2. Använd komponenten i HTML:
   ```html
   <dock-view></dock-view>
   ```

---

## Struktur och funktion

### CSS (docker.comp.css.js)
Stilarna definieras i en template och inkluderar:
- **.dock**: Grundläggande styling för dockningsområdet, inklusive bredd, höjd, och bakgrund.
- **.dock button**: Knappens utseende, inklusive hover-effekter.
- **.dock button img**: Storlek på ikonbilderna.

Exempel på CSS:
```css
.dock {
  width: 100%;
  height: min(60px, 10vh);
  background: rgba(0, 0, 0, 0.8);
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: space-evenly;
  box-shadow: 0 -4px 6px rgba(0, 0, 0, 0.4);
}

.dock button:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.1);
}
```

### HTML (docker.comp.html.js)
HTML-strukturen skapas dynamiskt med en lista över applikationer. Varje applikation representeras av en knapp med en bild och en titel.

Exempel på HTML:
```html
<div class="dock">
  <button title="Chat App" aria-label="Chat App">
    <img src="img/chat.png" alt="Chat App">
  </button>
  <button title="Memory App" aria-label="Memory App">
    <img src="img/memory-loss.png" alt="Memory App">
  </button>
  <button title="YouTube App" aria-label="YouTube App">
    <img src="img/youtube.png" alt="YouTube App">
  </button>
</div>
```

### JavaScript (docker.js)
`Docker` definieras som en anpassad webkomponent (`HTMLElement`) och använder `Shadow DOM` för att isolera CSS och HTML. Viktiga metoder:
- **Constructor**: Laddar och fäster CSS- och HTML-templates i `Shadow DOM`.
- **connectedCallback**: Förbereder klickhändelser för knappar.

Kodexempel:
```javascript
connectedCallback () {
  this.shadowRoot.querySelectorAll('button').forEach((button) => {
    button.addEventListener('click', () => {
    })
  })
}
```

---

## Exempel
### HTML
```html
<dock-view></dock-view>
```

---
