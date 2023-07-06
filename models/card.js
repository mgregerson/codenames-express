"use strict";

const CARDS = require("../data/cards");

class Card {
  /** Assign cards to game */
  static async assignCardsToGame() {
    const redTeamCount = 7;
    const blueTeamCount = 8;
    const deathCardCount = 1;
    const neutralCardCount = 9;

    const cardValues = await this._getGameCards();

    const cards = [];

    for (let i = 0; i < redTeamCount; i++) {
      const card = cardValues.pop();
      cards.push({ word: card, team: "red", guess: "", selected: false });
    }

    for (let i = 0; i < blueTeamCount; i++) {
      const card = cardValues.pop();
      cards.push({ word: card, team: "blue", guess: "", selected: false });
    }

    for (let i = 0; i < neutralCardCount; i++) {
      const card = cardValues.pop();
      cards.push({ word: card, team: "neutral", guess: "", selected: false });
    }

    for (let i = 0; i < deathCardCount; i++) {
      const card = cardValues.pop();
      cards.push({ word: card, team: "death", guess: "", selected: false });
    }

    const shuffledCards = this._shuffleArray(cards);

    return shuffledCards;
  }

  /** Retrieve 25 randomly selected words from our list of words */
  static async _getGameCards() {
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

  /** Shuffle array */
  static _shuffleArray(array) {
    // Fisher-Yates shuffle algorithm
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  /** Get random item from array */
  static _getRandomItem(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }
}

module.exports = Card;
