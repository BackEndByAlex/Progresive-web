const MemoryAppHTML = document.createElement('template')
MemoryAppHTML.innerHTML = `
  <div class="control-panel">
    <score-board></score-board>
    <button class="restart-btn">Back</button>
  </div>
  <div class="memory-container"></div>
`

export { MemoryAppHTML }
