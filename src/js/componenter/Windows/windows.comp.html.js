const WindowHTML = document.createElement('template')
WindowHTML.innerHTML = `
  <div class="window">
    <div class="header">
      <span class="title"></span>
      <button class="close-btn" aria-label="Close">X</button>
    </div>
    <div class="content">
    </div>
    <div class="resize-handle bottom-right"></div>
  </div>
`
export { WindowHTML }
