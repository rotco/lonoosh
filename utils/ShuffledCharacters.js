import { Game } from "./game";

export class ShuffledCharacters extends Game {
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
    let tempShuffledLetters = [...Array(hero.hebrew.length)];
    hero.hebrew.split("").forEach((letter) => {
      while (true) {
        const rand = Math.round(
          Math.random() * (hero.hebrew.split("").length - 1)
        );
        if (tempShuffledLetters[rand] === undefined) {
          tempShuffledLetters[rand] = letter;
          break;
        }
      }
    });
    return {
      optional: tempShuffledLetters,
      required: hero.hebrew[0],
      tempCurrentCards: [...Array(hero.hebrew.length)],
    };
    return [
      tempShuffledLetters,
      hero.hebrew[0],
      [...Array(hero.hebrew.length)],
    ];
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
      nextMoveOptionalCards = optionalCards.filter(
        (ch, i) => i != userSelectedCardIndex
      );
      const countSolved = currentCards.filter((ch) => ch).length;
      currentCards[countSolved] = hero.hebrew[countSolved];
      isComplete = countSolved + 1 === hero.hebrew.length;
      nextMoveRequiredCard = isComplete
        ? requiredCard
        : hero.hebrew[countSolved + 1];
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
