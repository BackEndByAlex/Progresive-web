const CSStemplate = document.createElement('template')
CSStemplate.innerHTML = `
  <style>
    .desktop {
      width: 100%;
      height: 100vh;
      display: flex;
      flex-direction: column;
      position: relative;
      overflow: hidden;
    }

    .main-content {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(to bottom, #1e3c72, #2a5298);
    }

    #clear-data-btn, #time-btn {
      position: fixed;
      background-color: #ff4d4d;
      border: none;
      border-radius: 5px;
      padding: 10px 20px;
      cursor: pointer;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
      transition: background-color 0.3s ease, transform 0.2s ease;
    }

    #clear-data-btn {
      right: 20px;
    }

    #time-btn {
      right: 100px;
      background-color: #4CAF50;
    }

    #time-btn:hover {
      background-color: #45a049;
    }

   #swipe-up-menu {
      position: absolute;
      top: 40px;
      right: 100px; 
      width: 300px;
      background-color: white;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
      border-radius: 5px;
      transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
      transform: scaleY(0);
      transform-origin: top;
      opacity: 0;
      z-index: 1000;
      padding: 20px;
    }

    #swipe-up-menu.visible {
      transform: scaleY(1);
      opacity: 1;
    }

    #status-btn {
      position: fixed;
      right: 237px;
      background-color: #4CAF50; /* Grön för online */
      border: none;
      border-radius: 5px;
      padding: 10px;
      cursor: pointer;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
      transition: background-color 0.3s ease;
    }

    #status-btn.offline {
      background-color: #ff4d4d; /* Röd för offline */
    }
  </style>
`
export { CSStemplate }
