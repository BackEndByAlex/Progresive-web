import { DockerCSS } from './docker.comp.css.js'
import { DockerHTML } from './docker.comp.html.js'

/**
 * Docker custom element class.
 * This class represents a Docker component, which is a custom element used to create a Docker container.
 *
 * @augments HTMLElement
 */
export default class Docker extends HTMLElement {
  /**
   * Creates an instance of Docker.
   */
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.append(DockerCSS.content.cloneNode(true))
    this.shadowRoot.append(DockerHTML.content.cloneNode(true))
  }
}
customElements.define('dock-view', Docker)
