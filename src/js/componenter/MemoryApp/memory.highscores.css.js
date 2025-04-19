const MemoryHighscoresCSS = document.createElement('template')
MemoryHighscoresCSS.innerHTML = `
<style>
  .highscores {
    text-align: center;
    padding: 20px;
  }

  .highscores ul {
    list-style: none;
    padding: 0;
  }

  .highscores li {
    padding: 5px 0;
    font-size: 18px;
  }

  .back-btn {
    margin-top: 20px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    border: none;
    border-radius: 5px;
    background-color: #dc3545;
    color: white;
    transition: background-color 0.3s;
  }
    
  .back-btn:hover {
    background-color: #a71d2a;
  }
</style>
`
export { MemoryHighscoresCSS }
