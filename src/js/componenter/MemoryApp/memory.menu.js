import { MemoryMenuCSS } from "./memory.menu.css.js"

/**
 * MemoryMenu class that extends HTMLElement.
 * This class represents the menu for the Memory Game.
 */
export default class MemoryMenu extends HTMLElement {
  /**
   * Creates an instance of MemoryMenu and initializes the shadow DOM.
   */
  constructor() {
    super()
    this.attachShadow({ mode: "open" })
    this.shadowRoot.append(MemoryMenuCSS.content.cloneNode(true))
    this.shadowRoot.innerHTML = `
       ${MemoryMenuCSS.innerHTML}
      <div class="menu">
        <h1>Memory Game</h1>
        <button class="level-btn" data-level="easy">Easy</button>
        <button class="level-btn" data-level="normal">Normal</button>
        <button class="level-btn" data-level="hard">Hard</button>
        <button class="highscore-btn">View Highscores</button>
      </div>
    `
  }

  /**
   * Called when the element is connected to the document's DOM.
   * Adds event listeners to the buttons in the menu.
   */
  connectedCallback() {
    this.shadowRoot.querySelectorAll(".level-btn").forEach((btn) =>
      btn.addEventListener("click", (e) => {
        const level = e.target.getAttribute("data-level")
        this.dispatchEvent(
          new CustomEvent("menu-selected", { detail: { level } })
        )
      })
    )

    this.shadowRoot
      .querySelector(".highscore-btn")
      .addEventListener("click", () => {
        this.dispatchEvent(new CustomEvent("menu-highscores"))
      })
  }
}

customElements.define("memory-menu", MemoryMenu)
