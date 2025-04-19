const DockerCSS = document.createElement('template')
DockerCSS.innerHTML = `
  <style>
    .dock {
      width: 100%;
      height: min(60px, 10vh);
      background: rgba(0, 0, 0, 0.8);
      position: absolute;
      bottom: 0;
      display: flex;
      justify-content: space-evenly;
      box-shadow: 0 -4px 6px rgba(0, 0, 0, 0.4);
    }

    .dock button {
      background: transparent;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 10px;
      border-radius: 50%;
      transition: transform 0.2s, background 0.2s;
    }

    .dock button img {
      width: 40px;
      height: 40px;
    }

    .dock button:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: scale(1.1);
    }
  </style>
`
export { DockerCSS }
