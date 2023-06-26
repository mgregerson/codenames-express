"use strict";

const CARDS = require("../data/cards");

class Card {
  /** Retrieve 25 randomly selected words from our list of words */
  static async getGameCards() {
    const cards = [];
    const items = CARDS.items;
    while (cards.length < 25) {
      const randomItem = this._getRandomItem(items);
      if (!cards.includes(randomItem)) {
        cards.push(randomItem);
      }
    }
    return cards;
  }

  static _getRandomItem(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }
}

module.exports = Card;
