const CompYoutubeCSS = document.createElement("template")
CompYoutubeCSS.innerHTML = `
  <style>
    header {
      flex: 0 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #333;
      color: #fff;
      padding: 10px;
      font-size: 16px;
    }

    header input {
      flex-grow: 1;
      margin-right: 10px;
      padding: 5px;
      border: none;
      border-radius: 3px;
    }

    header button {
      background-color: #007bff;
      color: white;
      border: none;
      padding: 5px 10px;
      border-radius: 3px;
      cursor: pointer;
    }

    header button:hover {
      background-color: #0056b3;
    }

    #playerContainer {
      height: 300px;
      background-color: #000;
      justify-content: center;
      align-items: center;
    }

    #playerContainer iframe {
      width: 100%;
      height: 100%;
      border: none;
    }

    #videoList {
      overflow-y: auto;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(1px, 1fr));
      gap: 10px;
    }
      
    .video-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      cursor: pointer;
      margin: 10px;
    }
    
    .video-item img {
      width: 100%;
      max-width: 200px;
      border-radius: 8px;
    }

    .video-item h3 {
      text-align: center;
      font-size: 14px;
      max-height: 12em; /* Begränsar höjden */
      overflow-y: auto; /* Lägg till en vertikal scrollbar */
      white-space: normal;
    }
  </style>
`
export default CompYoutubeCSS
