const MemoryAppCSS = document.createElement('templete')
MemoryAppCSS.innerHTML = `
  <style>
    .control-panel {
      display: flex;
      justify-content: space-between;
    }

    .card {
      width: 60px;
      height: 60px;
      background: #f0f0f0;
      border: 1px solid #ccc;
      cursor: pointer;
      font-weight: bold;
      color: transparent;
      transition: all 0.5s;
    }

    .memory-container {
      display: grid;
      gap: 10px;
      justify-content: center;
      align-items: center;
      width: 100%;
      max-width: 400px;
      margin: 0 auto;
      justify-items: center
    }


    .card.flipped {
      background: #fff;
      color: #000;
    }

    #timer {
      font-size: 18px;
      font-weight: bold;
      color: #000;
      margin-left: auto;
    }
  </style>
`
export { MemoryAppCSS }
