/**
 * ScoreBoard class to display and update the score and username.
 *
 * @augments HTMLElement
 */
export default class ScoreBoard extends HTMLElement {
  /**
   * Creates an instance of ScoreBoard.
   */
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: flex;
          flex-direction: column;
          background: #333;
          color: white;
          padding: 10px;
          border-radius: 5px;
          width: 200px;
        }
        .score {
          font-size: 20px;
          margin: 10px 0;
        }
        .username {
          font-size: 16px;
        }
      </style>
       <div class="scoreboard">
        <span id="username">Guest</span>
        <span id="score">0</span>
        <div id="attempts">Attempts: 0</div>
      </div>
    `
  }

  /**
   * Updates the score displayed on the scoreboard.
   *
   * @param {number} newScore - The new score to display.
   */
  updateScore (newScore) {
    const scoreElement = this.shadowRoot.querySelector('#score')
    scoreElement.textContent = newScore
  }

  /**
   * Updates the username displayed on the scoreboard.
   *
   * @param {string} username - The new username to display.
   */
  setUsername (username) {
    const usernameElement = this.shadowRoot.querySelector('#username')
    usernameElement.textContent = username
  }
}

customElements.define('score-board', ScoreBoard)
