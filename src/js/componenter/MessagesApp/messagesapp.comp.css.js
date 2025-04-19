const MessageappCSS = document.createElement('template')
MessageappCSS.innerHTML = `
  <style>
    .messageapp {
      height: 100%;
      display: flex;
      flex-direction: column;
      background: #f5f5f5;
      min-height: 350px; /* Minsta höjd */
    }

    .content {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
      max-height: 100%;
      padding: 10px;
    }



    .messages {
      height: 100%; /* Adjust this if needed */
      max-height: 250px; /* Ensure it stays within a defined height */
      overflow-y: auto; /* Enable vertical scrolling */
      padding: 10px;
      margin: 5px;
      border: 1px solid #ccc;
      box-sizing: border-box; /* Include padding and border in size calculations */
    }


    .message.sent {
      background:rgb(166, 233, 203);
      align-self: flex-end;
      text-align: right;
    }

    .message.received {
      background:rgb(184, 84, 92);
      align-self: flex-start;
      text-align: left;
    }

    .input-area {
      display: flex;
      gap: 5px;
    }

    .message-input {
      flex: 1;
      padding: 8px;
      font-size: 14px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }

    .send-btn {
      padding: 8px 12px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    .emoji-picker {
      display: flex;
      gap: 5px;
      padding: 10px;
      background-color: #f0f0f0;
      border-top: 1px solid #ccc;
      overflow-x: auto;
    }

    .emoji {
      font-size: 20px;
      cursor: pointer;
    }

    .emoji:hover {
      transform: scale(1.2);
    }
  </style>
`
export { MessageappCSS }
