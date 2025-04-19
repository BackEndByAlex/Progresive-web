
# YouTube App Component

## Beskrivning
`YouTube App` är en webkomponent som möjliggör sökning på YouTube, visning av sökresultat och uppspelning av valda videor direkt i applikationen. Komponentens utseende och funktionalitet är kapslad med hjälp av `Shadow DOM`.

---

## Attribut
Denna komponent har inga konfigurerbara attribut.

---

## Funktionalitet
1. **Sökning på YouTube**  
   Användaren kan ange en sökterm i inputfältet och klicka på "Search"-knappen för att söka efter videor.
    ## Anledning: 
   För att undvika att användaren oavsiktligt klickar på "Enter"-knappen flera gånger och därmed gör flera API-anrop till YouTube, valde jag att endast tillåta sökning via "Search"-knappen.
   Denna design minskar risken för överflödiga anrop och skyddar mot möjliga framtida buggar. Dessutom säkerställs att om samma sökning redan finns i cache eller localStorage, görs inget nytt API-anrop.
   
2. **Cachning av sökresultat**  
   Sökresultat lagras i både `localStorage` och en intern cache för att minska antalet API-anrop och förbättra prestandan. Cachedata förfaller efter 1 timme.

   ## Anledning: 
   API-nyckeln har en daglig kvot på 10 000 anrop, och för att hålla nere användningen cachelagras sökresultaten. Detta innebär att om användaren söker efter samma sak flera gånger, sker inget nytt API-anrop. Vid omstart av webbläsaren laddas data från localStorage, vilket ytterligare minskar behovet av API-anrop och effektiviserar användningen av API-kvoten.

3. **Uppspelning av video**  
   Användaren kan klicka på en video från sökresultaten för att spela upp den i en inbäddad YouTube-spelare.

---

## Användning
1. Importera komponenten i `index.js`-fil:
   ```javascript
   import './customapp.js'
   ```
2. Använd komponenten i HTML:
   ```html
   <youtube-app></youtube-app>
   ```

---

## Struktur och funktion

### CSS (customapp.comp-css.js)
Stilarna kapslar in layouten och komponentens UI, inklusive sökfältet, resultatlistan och användaren. Exempel:
```css
header {
  flex: 0 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #333;
  color: #fff;
  padding: 10px;
  font-size: 16px;
}

.video-item img {
  width: 100%;
  max-width: 200px;
  border-radius: 8px;
}
```

### HTML (customapp.comp-html.js)
HTML-strukturen innehåller:
- **header**: Ett sökfält och en sökknapp.
- **playerContainer**: Ett område där den inbäddade YouTube-videon spelas upp.
- **videoList**: En lista över videor som visas som sökresultat.

Exempel på HTML:
```html
<div class="window">
  <header>
    <input type="text" id="searchInput" placeholder="Search YouTube...">
    <button id="searchButton">Search</button>
  </header>
  <div id="playerContainer"></div>
  <div id="videoList"></div>
</div>
```

### JavaScript (customapp.js)
Komponenten använder `Shadow DOM` och inkluderar följande funktionalitet:
- **searchYoutube**: Anropar YouTube API för att hämta videor baserat på användarens sökterm.
- **Cachning**: Lagrar sökresultat i `localStorage` och en intern cache.
- **playVideo**: Embeddar en vald video i en iframe.

Kodexempel för sökning:
```javascript
async searchYoutube (query, shadow) {
  const cachedData = this.getFromLocalStorage(query)
  if (this.cache.has(query)) {
    this.cache.get(query, cachedData)
    return this.updateVideoList(cachedData.items, shadow)
  }

  this.requestCount += 1
  const apiKey = 'MY_API_KEY' // API-nyckel
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=$  {encodeURIComponent(query)}&type=video&key=${apiKey}`

  try {
    const response = await fetch(url)
    const data = await response.json()

    this.saveToLocalStorage(query, data)
    this.cache.set(query, data)

    return this.updateVideoList(data.items, shadow)
  } catch (error) {
    console.error(error)
  }
}
```

---

## Exempel
### HTML
```html
<youtube-app></youtube-app>
```
