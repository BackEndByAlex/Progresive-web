/**
 * TimeHandler class to manage a countdown timer.
 */
export class TimeHandler {
  /**
   * Creates an instance of TimeHandler.
   *
   * @param {number} initialTime - The initial time for the timer.
   * @param {number} bonusTime - The bonus time to add to the timer.
   * @param {Function} callback - The callback function to call when the timer ends.
   * @param {HTMLElement} timerElement - The DOM element to display the timer.
   */
  constructor (initialTime, bonusTime, callback, timerElement) {
    this.initialTime = initialTime
    this.bonusTime = bonusTime
    this.remainingTime = initialTime
    this.callback = callback
    this.timerElement = timerElement
    this.interval = null
  }

  /**
   * Starts the countdown timer.
   * Clears any existing timers and starts a new interval.
   */
  start () {
    this.stop() // Säkerställ att inga gamla timers körs
    this.interval = setInterval(() => {
      this.remainingTime -= 1
      this.updateTimeDisplay()
      if (this.remainingTime <= 0) {
        this.stop()
        this.callback()
      }
    }, 1000)
  }

  /**
   * Stops the countdown timer.
   * Clears the interval if it exists.
   */
  stop () {
    if (this.interval) {
      clearInterval(this.interval)
      this.interval = null
    }
  }

  /**
   * Adds time to the remaining time of the timer.
   *
   * @param {number} time - The amount of time to add.
   */
  addTime (time) {
    this.remainingTime += time
    this.updateTimeDisplay()
  }

  /**
   * Updates the time display in the DOM.
   */
  updateTimeDisplay () {
    if (this.timerElement) {
      this.timerElement.textContent = `Time: ${this.remainingTime}s`
    }
  }
}
