import { Game } from "./game";

const allChars = "אבגדהוזחטיכךלמםנןסעפףצץקרשת";

export class MissingCharacters extends Game {
  constructor() {
    super();
    this.missingChar = null;
  }

  selectRandomHero() {
    this.hero = this.collection[parseInt(Math.random() * collection.length)];
    this.completeCards = this.hero["hebrew"].split("");
  }

  setCurrentCards() {
    this.currentCards = [...this.completeCards];
    const missingCharIndex = parseInt(Math.random() * this.currentCards.length);
    this.missingChar = this.currentCards[missingCharIndex];
    this.currentCards[missingCharIndex] = null;
  }
  setOptionalCards() {
    let count = 0;
    this.optionalCards = new Array(this.numOfOptionalChars);
    while (count < this.numOfOptionalChars) {
      const i = parseInt(Math.random() * allChars.length);
      const j = parseInt(Math.random() * this.numOfOptionalChars);
      if (!(allChars[i] in this.optionalCards) && !this.optionalCards[j]) {
        count += 1;
        if (count == 1) {
          this.optionalCards[j] = this.missingChar;
        } else {
          this.optionalCards[j] = allChars[i];
        }
      }
    }
  }
  initCards(hero) {
    const missingCharIndex = parseInt(Math.random() * hero.hebrew.length);
    const missingChar = hero.hebrew[missingCharIndex];
    let currentCards = [...hero.hebrew];
    currentCards[missingCharIndex] = " ";
    let count = 0;
    const optionalCards = new Array(this.numOfOptionalChars);
    while (count < this.numOfOptionalChars) {
      const i = parseInt(Math.random() * allChars.length);
      const j = parseInt(Math.random() * this.numOfOptionalChars);
      if (!(allChars[i] in optionalCards) && !optionalCards[j]) {
        count += 1;
        if (count == 1) {
          optionalCards[j] = missingChar;
        } else {
          optionalCards[j] = allChars[i];
        }
      }
    }
    return [optionalCards, missingChar, currentCards];
  }
  checkMove(
    optionalCards,
    currentCards,
    requiredCard,
    hero,
    userSelectedCardIndex
  ) {
    let correctMove,
      nextMoveOptionalCards,
      nextMoveRequiredCard,
      nextMoveCurrentCards,
      isComplete;
    if (requiredCard === optionalCards[userSelectedCardIndex]) {
      correctMove = true;
      nextMoveOptionalCards = null;
      currentCards = currentCards.map((ch) => {
        if (ch === " ") return requiredCard;
        return ch;
      });
      isComplete = true;
      nextMoveRequiredCard = null;
    } else {
      correctMove = false;
      nextMoveOptionalCards = optionalCards;
      nextMoveRequiredCard = requiredCard;
      nextMoveCurrentCards = currentCards;
      isComplete = false;
    }
    return {
      correctMove: correctMove,
      nextMoveOptionalCards: nextMoveOptionalCards,
      nextMoveRequiredCard: nextMoveRequiredCard,
      nextMoveCurrentCards: currentCards,
      isComplete: isComplete,
    };
  }
  async run() {
    await this.setCollection();
    this.selectRandomHero();
    this.setCurrentCards();
    this.setOptionalCards();
  }
}
