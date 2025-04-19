const MemoryEndgameCSS = document.createElement('template')
MemoryEndgameCSS.innerHTML = `
  <style>
    .end-game {
      text-align: center;
      font-family: Arial, sans-serif;
      color: #333;
    }

    .end-game h2 {
      font-size: 24px;
      color: #4CAF50;
      margin-bottom: 20px;
    }

    .end-game p {
      font-size: 18px;
      margin: 10px 0;
    }

    .end-game button {
      background-color: #4CAF50;
      color: white;
      border: none;
      padding: 10px 20px;
      font-size: 16px;
      margin: 10px 5px;
      cursor: pointer;
      border-radius: 5px;
      transition: background-color 0.3s;
    }
      
    .end-game button:hover {
      background-color: #45a049;
    }
  </style>
`
export { MemoryEndgameCSS }
