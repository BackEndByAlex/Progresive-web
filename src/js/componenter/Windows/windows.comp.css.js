const WindowCSS = document.createElement('template')
WindowCSS.innerHTML = `
  <style>
    .window {
      position: absolute;
      background: white;
      border: 1px solid #000;
      display: flex;
      flex-direction: column;
      z-index: 1;
    }

    .header {
      background: #333;
      color: white;
      padding: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .header .title {
      font-size: 16px;
    }

    .header .close-btn {
      background: none;
      border: none;
      color: white;
      font-size: 16px;
      cursor: pointer;
    }

    .content {
      flex: 1;
    }

  .resize-handle {
    position: absolute;
    width: 10px;
    height: 10px;
    cursor: se-resize;
     right: 0; /* Alltid vid högra kanten */
    bottom: 0; /* Alltid vid nedre kanten */
    cursor: se-resize;
  }
  </style>
`
export { WindowCSS }
