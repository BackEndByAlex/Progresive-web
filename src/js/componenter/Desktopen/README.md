
# Desktopen Component

## Beskrivning
`Desktopen` är en webkomponent som representerar användargränssnittets desktop. Den kapslar in layout och styling för ett desktop-liknande gränssnitt med hjälp av `Shadow DOM`. Komponentens struktur består av en `main-content`-sektion för huvudinnehållet och ett `dock-view`-element som fungerar som ett dockningsområde.

Desktopen inkluderar funktionalitet för:
- En knapp att rensar localStorage och cachen
- Visa aktuell tid och väder.
- Reverse geocoding för att visa staden baserat på användarens plats.
- Swipe-upp-meny som visas under tidsknappen.
---

## Attribut
Denna komponent har inga konfigurerbara attribut.

---

## Events
Denna komponent har inga definierade events.

---

## Användning
1. Importera komponenten i `index.js`-fil:
   ```javascript
   import './desktopen.js'
   ```
2. Använd komponenten i HTML:
   ```html
   <desktop-view></desktop-view>
   ```

---

## Struktur och funktion

### CSS (desktopen.comp.css.js)
Stilarna är inneslutna i en template som ingår i `Shadow DOM`. Detta säkerställer att komponentens styling inte påverkar eller påverkas av globala stilar. Exempel på CSS:
```css
.desktop {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}
```

### HTML (desktopen.comp.html.js)
HTML-strukturen består av:
- En container med klassen `desktop`.
- En `main-content`-div som fungerar som huvudfönster.
- En `dock-view` för dockning.
- En tidsknapp (`time-btn`) som visar aktuell tid och triggar en swipe-upp-meny.

Exempel på HTML:
```html
<div class="desktop">
  <div class="main-content"></div>
  <dock-view></dock-view>
  <button id="clear-data-btn" title="Clear Data" aria-label="Clear Data">
    🗑️
  </button>
  <button id="time-btn" title="Time Info" aria-label="Time Info">
    🕒 <span id="time-display"></span>
  </button>
  <div id="swipe-up-menu" class="hidden">
    <div id="location">Laddar plats...</div>
    <div id="weather">Laddar väder...</div>
  </div>
</div>
```

### JavaScript (desktopen.js)
`Desktopen` definieras som en anpassad webkomponent (`HTMLElement`) och använder `Shadow DOM` för att kapsla in sin HTML och CSS. Funktionaliteten inkluderar:

- **Tid:** Uppdaterar tiden varje sekund.
- **Plats:** Använder geolocation och reverse geocoding för att visa användarens stad.
- **Väder:** Hämtar väderdata baserat på användarens latitud och longitud.
- **Swipe-upp-meny:** Visar plats och väderinformation under tidsknappen.

Kodexempel:
```javascript
connectedCallback() {
  const timeButton = this.shadowRoot.querySelector('#time-btn');
  const timeDisplay = this.shadowRoot.querySelector('#time-display');
  const swipeUpMenu = this.shadowRoot.querySelector('#swipe-up-menu');

  setInterval(() => {
    const now = new Date();
    timeDisplay.textContent = now.toLocaleTimeString();
  }, 1000);

  timeButton.addEventListener('click', () => {
    swipeUpMenu.classList.toggle('visible');
    swipeUpMenu.classList.toggle('hidden');
    this.updateLocationAndWeather();
  });
}

async updateLocationAndWeather() {
  const locationDiv = this.shadowRoot.querySelector('#location');
  const weatherDiv = this.shadowRoot.querySelector('#weather');

  try {
    const position = await new Promise((resolve, reject) =>
      navigator.geolocation.getCurrentPosition(resolve, reject)
    );
    const { latitude, longitude } = position.coords;

    const geocodeResponse = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
    );
    const geocodeData = await geocodeResponse.json();
    const city = geocodeData.address.city || geocodeData.address.town || geocodeData.address.village || 'Okänd plats';

    locationDiv.textContent = `Plats: ${city} (Lat: ${latitude.toFixed(2)}, Lon: ${longitude.toFixed(2)})`;

    const weatherResponse = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    );
    const weatherData = await weatherResponse.json();
    const { temperature, windspeed } = weatherData.current_weather;
    weatherDiv.textContent = `Temp: ${temperature}°C, Vind: ${windspeed} km/h`;
  } catch (error) {
    locationDiv.textContent = 'Kunde inte hämta plats.';
    weatherDiv.textContent = 'Kunde inte hämta väder.';
  }
}
```

---

## Exempel
### HTML
```html
<desktop-view></desktop-view>
```
