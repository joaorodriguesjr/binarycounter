export class Presentation {
  /**
   * Maps the numbers from 0 to 9 using 8 bits to
   * set each segment of the digital display.
   *
   * @private {Array<number>}
   */
  bitMaps = {
    0: 0b00111111, //--- {8:0, 7:0, 6:1, 5:1, 4:1, 3:1, 2:1, 1:1} ---//
    1: 0b00000110, //--- {8:0, 7:0, 6:0, 5:0, 4:0, 3:1, 2:1, 1:0} ---//
    2: 0b01101101, //--- {8:0, 7:1, 6:1, 5:0, 4:1, 3:1, 2:0, 1:1} ---//
    3: 0b01001111, //--- {8:0, 7:1, 6:0, 5:0, 4:1, 3:1, 2:1, 1:1} ---//
    4: 0b01010110, //--- {8:0, 7:1, 6:0, 5:1, 4:0, 3:1, 2:1, 1:0} ---//
    5: 0b01011011, //--- {8:0, 7:1, 6:0, 5:1, 4:1, 3:0, 2:1, 1:1} ---//
    6: 0b01111011, //--- {8:0, 7:1, 6:1, 5:1, 4:1, 3:0, 2:1, 1:1} ---//
    7: 0b00001110, //--- {8:0, 7:0, 6:0, 5:0, 4:1, 3:1, 2:1, 1:0} ---//
    8: 0b01111111, //--- {8:0, 7:1, 6:1, 5:1, 4:1, 3:1, 2:1, 1:1} ---//
    9: 0b01011111, //--- {8:0, 7:1, 6:0, 5:1, 4:1, 3:1, 2:1, 1:1} ---//
  }

  /**
   * Masks each one of the 8 bits of a bit map.
   *
   * @private {Array<number>}
   */
  bitMasks = [
    0b00000001, //--- BIT 001 ---/
    0b00000010, //--- BIT 002 ---/
    0b00000100, //--- BIT 004 ---/
    0b00001000, //--- BIT 008 ---/
    0b00010000, //--- BIT 016 ---/
    0b00100000, //--- BIT 032 ---/
    0b01000000, //--- BIT 064 ---/
    0b10000000, //--- BIT 128 ---/
  ]

  /**
   * @param {TreeBuilder}
   */
  constructor(treeBuilder) {
    treeBuilder.segments(this.bitMasks.length);
    this.decimalDisplay = treeBuilder.buildDisplay(3);
    this.binaryDisplay  = treeBuilder.buildDisplay(8);
  }

  /**
   * Updates the digital displays accordingly to the provided number.
   *
   * @param {number} count The number to be displayed
   */
  update(count) {
    this.count = count;
    this.updateDisplay(this.decimalDisplay, 10);
    this.updateDisplay(this.binaryDisplay , 2);
  }

  /**
   * Updates a specific display.
   *
   * @param {object} display The object holding the display structure
   * @param {number} base The numeric base represented by the display
   */
  updateDisplay(display, base) {
    this.characters = this.count.toString(base);
    while (this.characters.length < display.digits.length) {
      this.characters = '0' + this.characters;
    }

    for (let index = 0; index < display.digits.length; index++) {
      this.updateDigit(display.digits[index], this.characters[index]);
    }
  }

  /**
   * Updates a specific digit.
   *
   * @param {object} digit The object holding the structure of the digit
   * @param {string} character The character that represents the digit
   */
  updateDigit(digit, character) {
    this.currentNumber = parseInt(character);
    for (let index = 0; index < digit.segments.length; index++) {
      this.updateSegment(digit.segments[index], this.bitMasks[index]);
    }
  }

  /**
   * Updates a specific digit segment.
   *
   * @param {HTMLElement} segment The HTML element that represents the digit segment
   * @param {number} mask The bit mask of the segment
   */
  updateSegment (segment, mask) {
    const bit = this.bitMaps[this.currentNumber] & mask;
    segment.style.visibility = (bit !== 0) ? 'visible' : 'hidden';
  }
}
