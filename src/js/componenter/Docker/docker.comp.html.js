const apps = [
  { title: 'Chat App', img: 'img/chat.png', label: 'Chat App' },
  { title: 'Memory App', img: 'img/memory-loss.png', label: 'Memory App' },
  { title: 'YouTube App', img: 'img/youtube.png', label: 'YouTube App' }
]
const DockerHTML = document.createElement('template')
DockerHTML.innerHTML = `
  <div class="dock">
    ${apps.map(app => `
      <button title="${app.title}" aria-label="${app.label}">
        <img src="${app.img}" alt="${app.label}">
      </button>
    `).join('')}
  </div>
`

export { DockerHTML }
