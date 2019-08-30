export class TreeBuilder {
  /**
   * @param {HTMLDocument } document The root element of the page
   */
  constructor(document) {
    this.document = document;
  }

  /**
   * Defines the number of segments of the builded digits.
   *
   * @param {number} count The number of segments to be created
   */
  segments(count) {
    this.segmentsCount = count;
  }

  /**
   * Builds the elements tree of a digital display.
   *
   * @param {number} digitsCount The number of digits to be represented
   */
  buildDisplay(digitsCount) {
    const display = { digits: [] };
    const classes = {3: 'decimal-display', 8: 'binary-display'}

    const rootElement = this.document.querySelector('.container');
    const decimalDigitsElement = this.document.createElement('div');
    decimalDigitsElement.classList.add(classes[digitsCount]);
    rootElement.appendChild(decimalDigitsElement);

    for (let index = 0; index < digitsCount; index++) {
      display.digits.push(this.buildDigit(decimalDigitsElement));
    }

    return display;
  }

  /**
   * Builds the elements tree of a digit.
   *
   * @param {HTMLElement} rootElement The parent element to attach the element tree
   */
  buildDigit(rootElement) {
    const digit = { segments: [] };
    const digitElement = this.document.createElement('div');
    digitElement.classList.add('digit');
    rootElement.appendChild(digitElement);

    for (let index = 0; index < this.segmentsCount; index++) {
      const segmentElement = this.document.createElement('div');
      segmentElement.classList.add('digit-segment');
      segmentElement.classList.add('segment-0' + (index + 1));
      digitElement.appendChild(segmentElement);
      digit.segments.push(segmentElement);
    }

    return digit;
  }
}
