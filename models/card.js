"use strict";

const { red } = require("colors");
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

  static async assignCardsToGame() {
    const redTeamCount = 7;
    const blueTeamCount = 8;
    const deathCardCount = 1;
    const neutralCardCount = 9;

    const cardValues = await this.getGameCards();

    const cards = {};

    for (let i = 0; i < redTeamCount; i++) {
      const card = cardValues.pop();
      cards[card] = "red";
    }

    for (let i = 0; i < blueTeamCount; i++) {
      const card = cardValues.pop();
      cards[card] = "blue";
    }

    for (let i = 0; i < neutralCardCount; i++) {
      const card = cardValues.pop();
      cards[card] = "neutral";
    }

    for (let i = 0; i < deathCardCount; i++) {
      const card = cardValues.pop();
      cards[card] = "death";
    }

    const shuffledCards = this.shuffleObject(cards);

    return shuffledCards;
  }

  static shuffleObject(obj) {
    const entries = Object.entries(obj);
    const shuffledEntries = this.shuffleArray(entries);
    return Object.fromEntries(shuffledEntries);
  }

  static shuffleArray(array) {
    // Fisher-Yates shuffle algorithm
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  static _getRandomItem(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }
}

module.exports = Card;
