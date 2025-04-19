const CompYoutubeHTML = document.createElement('template')
CompYoutubeHTML.innerHTML = `
  <div class="window">
    <header>
    <input type="text" id="searchInput" placeholder="Search YouTube...">
    <button id="searchButton">Search</button>
    </header>
    <div id="playerContainer"></div>
    <div id="videoList"></div>
  </div>
  `
export default CompYoutubeHTML
