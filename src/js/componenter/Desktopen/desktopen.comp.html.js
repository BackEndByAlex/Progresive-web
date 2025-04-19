const HTMLtemplate = document.createElement('template')
HTMLtemplate.innerHTML = `
  <div class="desktop">
    <div class="main-content"></div>
    <dock-view></dock-view>
      <button id="clear-data-btn" title="Clear Data" aria-label="Clear Data">
      🗑️
    </button>
    <button id="time-btn" title="Time Info" aria-label="Time Info">
      🕒 <span id="time-display"></span>
    </button>
    <button id="status-btn" title="Connection Status" aria-label="Connection Status">
      🌐
    </button>
    <div id="swipe-up-menu" class="hidden">
      <div id="location">Laddar plats...</div>
      <div id="weather">Laddar väder...</div>
    </div>
  </div>
`
export { HTMLtemplate }
