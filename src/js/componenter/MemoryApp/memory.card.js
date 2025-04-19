/**
 * Represents a memory card element.
 *
 * @augments HTMLElement
 */
export default class Card extends HTMLElement {
  /**
   * Creates an instance of Card.
   * The constructor sets up the shadow DOM and initializes the card element.
   */
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          width: 80px;
          height: 80px;
          background: #ccc;
          border: 1px solid #999;
          border-radius: 5px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 24px;
          font-weight: bold;
          cursor: pointer;
          color: transparent;
          transition: all 0.3s;
        }

        :host(:focus) {
          outline: 2px solid #4CAF50;
        }

        :host(.flipped) {
          background: #fff;
          color: #000;
        }

        :host(.matched) {
          pointer-events: none; /* Förhindra klick */
          box-shadow: 0 0 10px 5px rgba(0, 255, 0, 0.7); /* Grön skugga */
          border: 2px solid rgba(0, 255, 0, 0.7); /* Lägg till gräns för mer visuell effekt */
        }
      </style>
      <span class="value"></span>
    `

    this.isFlipped = false
    this.isMatched = false
  }

  /**
   * Called when the card is added to the DOM.
   * Adds a click event listener to flip the card.
   */
  connectedCallback () {
    const value = this.getAttribute('value')
    this.shadowRoot.querySelector('.value').textContent = value
    this.addEventListener('click', () => this.flipCard())
  }

  /**
   * Flips the card and dispatches a custom 'card-flipped' event.
   * If the card is already matched or flipped, it does nothing.
   */
  flipCard () {
    if (this.isMatched || this.isFlipped) return

    this.classList.add('flipped')
    this.isFlipped = true

    this.dispatchEvent(new CustomEvent('card-flipped', { detail: this }))
  }

  /**
   * Marks the card as matched.
   * Adds the 'matched' class to the card element.
   */
  match () {
    this.isMatched = true
    this.classList.add('matched')
  }

  /**
   * Resets the card to its initial state.
   * Removes the 'flipped' class and sets isFlipped to false.
   */
  resetcard () {
    this.isFlipped = false
    this.classList.remove('flipped')
  }
}
customElements.define('memory-card', Card)
