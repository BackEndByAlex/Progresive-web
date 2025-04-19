import { MemoryAppCSS } from './memoryapp.comp.css.js'
import { MemoryAppHTML } from './memoryapp.comp.html.js'
import { MemoryHighscoresCSS } from './memory.highscores.css.js'
import { TimeHandler } from './memory.time.handler.js'
import { MemoryEndgameCSS } from './memory.endgame.css.js'
import './memory.menu.js'
import './memory.card.js'
import './memory.scoreboard.js'

/**
 * MemoryApp is a custom HTML element that represents the memory game application.
 */
export default class MemoryApp extends HTMLElement {
  /**
   * Creates an instance of MemoryApp.
   * The constructor attaches the shadow DOM and initializes the flipped cards, focused card index, highscores, time handler, and attempts.
   */
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.flippedCards = []
    this.focusedCardIndex = 0
    this.highscores = JSON.parse(localStorage.getItem('memoryHighscores')) || []
    this.timeHandler = null
    this.attempts = 0
    this.currentlevel = null
  }

  /**
   * Called when the element is connected to the document's DOM.
   * This method shows the main menu.
   */
  connectedCallback () {
    this.showMainMenu()
  }

  /**
   * Displays the main menu and sets up event listeners for menu selections.
   * When a menu item is selected, the game is started with the selected level.
   */
  showMainMenu () {
    if (this.timeHandler) {
      this.timeHandler.stop() // Stoppa föregående timer om det finns en
    }
    this.shadowRoot.innerHTML = ''
    const menu = document.createElement('memory-menu')
    menu.addEventListener('menu-selected', e => {
      this.startGame(e.detail.level)
    })
    menu.addEventListener('menu-highscores', () => {
      this.showHighscores()
    })
    this.shadowRoot.appendChild(menu)
  }

  /**
   * Starts the game with the specified level.
   * Initializes the timer, cards, and sets up event listeners for card flipping.
   *
   * @param {string} level - The difficulty level of the game ('easy', 'normal', 'hard').
   */
  startGame (level) {
    this.currentlevel = level
    this.shadowRoot.innerHTML = ''
    this.shadowRoot.append(MemoryAppCSS.cloneNode(true))
    this.shadowRoot.append(MemoryAppHTML.content.cloneNode(true))

    const restartButton = this.shadowRoot.querySelector('.restart-btn')
    restartButton.addEventListener('click', () => this.showMainMenu())

    const initialTime = level === 'easy' ? 6 : level === 'normal' ? 15 : level === 'hard' ? 30 : 0
    const bonusTime = level === 'easy' ? 2 : level === 'normal' ? 3 : level === 'hard' ? 5 : 0

    const timerElement = document.createElement('div')
    timerElement.id = 'timer'
    timerElement.textContent = `Time: ${initialTime}s`
    this.shadowRoot.querySelector('.control-panel').appendChild(timerElement)

    const username = localStorage.getItem('username') || 'Guest'
    const scoreboard = this.shadowRoot.querySelector('score-board')
    scoreboard.setUsername(username) // Uppdatera användarnamnet

    this.timeHandler = new TimeHandler(
      initialTime,
      bonusTime,
      () => {
        const scoreElement = scoreboard.shadowRoot.querySelector('#score')
        const score = parseInt(scoreElement.textContent, 10) || 0
        this.saveHighscore(score, username) // Spara poängen
        this.endGame() // Avsluta spelet när tiden är ute och visa slutskärmen
      },
      this.shadowRoot.querySelector('#timer') // Skicka referensen till timerelementet
    )

    this.timeHandler.start()
    this.initGame(level)
  }

  /**
   * Initializes the game with the specified level.
   * Generates and renders the cards, and updates the scoreboard.
   *
   * @param {string} level - The difficulty level of the game ('easy', 'normal', 'hard').
   */
  initGame (level) {
    const cardValues = this.generateCards(level)
    this.renderCards(cardValues)
    setTimeout(() => this.updateScoreboard(), 0)
  }

  /**
   * Generates card values based on the specified level.
   * The card values are shuffled and returned as an array.
   *
   * @param {string} level - The difficulty level of the game ('easy', 'normal', 'hard').
   * @returns {number[]} An array of card values.
   */
  generateCards (level) {
    const size = level === 'easy' ? 4 : level === 'normal' ? 8 : level === 'hard' ? 16 : 0
    const value = Array.from({ length: size / 2 }, (_, i) => i + 1)
    return [...value, ...value].sort(() => Math.random() - 0.5) // Blanda värdena
  }

  /**
   * Renders the cards in the memory game.
   * The cards are displayed in a grid layout based on the number of card values.
   * Each card element is created and appended to the memory container.
   *
   * @param {number[]} cardValues - An array of card values to be rendered.
   */
  renderCards (cardValues) {
    const container = this.shadowRoot.querySelector('.memory-container')
    container.innerHTML = ''

    const gridSize = Math.sqrt(cardValues.length)
    container.style.gridTemplateColumns = `repeat(${Math.ceil(gridSize)}, 1fr)`

    cardValues.forEach(value => {
      const card = document.createElement('memory-card')
      card.setAttribute('value', value)
      card.setAttribute('tabindex', '0')

      // Lägg till keydown-händelse för att lyssna på Enter
      card.addEventListener('keydown', event => {
        if (event.key === 'Enter') {
          card.classList.add('flipped') // Lägg till 'flipped'-klass
          card.dispatchEvent(new CustomEvent('card-flipped', { detail: card }))
        }
      })

      card.addEventListener('card-flipped', e => this.handleCardFlip(e.detail))
      container.appendChild(card)
    })
  }

  /**
   * Handles the card flip event.
   * Checks for matches and updates the game state accordingly.
   * If all cards are matched, the game ends. Otherwise, the timer is updated.
   * The scoreboard is also updated based on the number of attempts.
   * If the card is already flipped or matched, the event is ignored.
   *
   * @param {HTMLElement} card - The card element that was flipped.
   */
  handleCardFlip (card) {
    if (this.flippedCards.includes(card) || card.isMatched) return // Förhindra klick på matchade kort

    this.flippedCards.push(card)
    if (this.flippedCards.length === 2) {
      this.attempts++
      const [card1, card2] = this.flippedCards

      if (card1.getAttribute('value') === card2.getAttribute('value')) {
        card1.match()
        card2.match()
        this.timeHandler.addTime(this.timeHandler.bonusTime)
        this.updateScoreboard(10)

        // Kontrollera om alla kort är parade
        const unmatchedCards = Array.from(this.shadowRoot.querySelectorAll('memory-card')).filter(
          card => !card.isMatched
        )
        if (unmatchedCards.length === 0) {
          this.endGame()
        }
      } else {
        setTimeout(() => {
          card1.resetcard()
          card2.resetcard()
        }, 500)
      }

      this.flippedCards = []
    }
  }

  /**
   * Updates the scoreboard with the current score and attempts.
   *
   * @param {number} [points=0] - The points to add to the current score.
   */
  updateScoreboard (points = 0) {
    const scoreboard = this.shadowRoot.querySelector('score-board')
    const scoreElement = scoreboard.shadowRoot.querySelector('#score')
    const attemptsElement = scoreboard.shadowRoot.querySelector('#attempts')

    const currentScore = parseInt(scoreElement.textContent, 10) || 0
    scoreboard.updateScore(currentScore + points)
    attemptsElement.textContent = `Attempts: ${this.attempts}`
  }

  /**
   * Saves the highscore to the local storage.
   * The highscores are sorted and limited to the top 5 scores.
   *
   * @param {number} score - The score achieved by the player.
   * @param {string} username - The username of the player.
   */
  saveHighscore (score, username) {
    this.highscores.push({ username, score, attempts: this.attempts })
    this.highscores.sort((a, b) => b.score - a.score || a.attempts - b.attempts)
    this.highscores = this.highscores.slice(0, 5)
    localStorage.setItem('memoryHighscores', JSON.stringify(this.highscores))
  }

  /**
   * Displays the high scores.
   * This method shows the high scores and sets up the event listener for the back button.
   */
  showHighscores () {
    this.shadowRoot.innerHTML = `
      ${MemoryHighscoresCSS.innerHTML}
      <div class="highscores">
         <h2>🏆 High Scores 🏆</h2>
        <ul>
          ${this.highscores.map(score => `<li>${score.username} -  ${score.score} points - ${score.attempts} attempts</li>`).join('')}
        </ul>
        <button class="back-btn">Back to Menu</button>
      </div>
    `
    this.shadowRoot.querySelector('.back-btn').addEventListener('click', () => {
      this.showMainMenu()
    })
  }

  // Steg 10: Skapa en metod för att avsluta spelet
  /**
   * Ends the game and displays the end game screen.
   * Stops the timer, saves the highscore, and shows the final score and attempts.
   */
  endGame () {
    if (this.timeHandler) {
      this.timeHandler.stop() // Stoppa timern
    }

    const scoreboard = this.shadowRoot.querySelector('score-board')
    const scoreElement = scoreboard.shadowRoot.querySelector('#score')
    const score = parseInt(scoreElement.textContent, 10) || 0
    const username = localStorage.getItem('username') || 'Guest'

    this.saveHighscore(score, username)

    // Visa ett meddelande
    this.shadowRoot.innerHTML = `
    ${MemoryEndgameCSS.innerHTML}
       <div class="end-game">
      <h2>🎉 Game Over 🎉</h2>
      <p>Congratulations, <strong>${username}</strong>!</p>
      <p>Your Score: <strong>${score}</strong></p>
      <p>Attempts: <strong>${this.attempts}</strong></p>
      <button class="restart-btn">Restart Game</button>
      <button class="back-btn">Back to Menu</button>
    </div>
    `

    this.shadowRoot.querySelector('.restart-btn').addEventListener('click', () => {
      this.startGame(this.currentlevel) // Starta spelet om med standardnivå
    })
    this.shadowRoot.querySelector('.back-btn').addEventListener('click', () => {
      this.showMainMenu()
    })

    // Återställ försök och andra värden
    this.attempts = 0
  }
}

customElements.define('memory-app', MemoryApp)
