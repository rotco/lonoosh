import { Game } from "./game";
import Category from "../models/Category";
// import Hero from "../models/Hero";
import dbConnect from "./dbConnect";

const allChars = "אבגדהוזחטיכךלמםנןסעפףצץקרשת";
const allSentences = [
  "החיים שלנו תותים",
  "סיבת הסיבות",
  "אין עולם",
  "קרן שמש",
  "שבוע טוב",
  "פנתרה",
  "בית משוגעים",
  "מלכת השושנים",
  "כמה אני אוהב אותך",
  "אפס מאמץ",
  "אלף כבאים",
  "בחור אנלוגי בעולם דיגיטלי",
];

export class WhichSong extends Game {
  constructor(heros) {
    super();
    this.missingChar = null;
    this.category = null;
    this.heros = heros;
  }
  async getHeroFilter() {
    await dbConnect();
    this.category = await Category.findOne({ name: "singer" });
    return JSON.stringify({ categories: this.category._id });
  }
  async GetSongNames() {
    await dbConnect();
    this.heros = await Hero.find({ categories: this.category._id });
    return JSON.stringify({ categories: this.category._id });
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
    const iSet = new Set();
    while (count < this.numOfOptionalChars) {
      const i = parseInt(Math.random() * this.heros.length);
      const j = parseInt(Math.random() * this.numOfOptionalChars);
      if (
        !(this.heros[i] in this.optionalCards) &&
        !this.optionalCards[j] &&
        this.heros[i].hebrew !== this.missingChar &&
        !iSet.has(i)
      ) {
        iSet.add(i);
        count += 1;
        if (count == 1) {
          this.optionalCards[j] = this.missingChar;
        } else {
          this.optionalCards[j] = this.heros[i].hebrew;
        }
      }
    }
  }
  async initCards(hero) {
    this.missingChar = hero.hebrew;
    this.setOptionalCards();

    return {
      optional: this.optionalCards,
      required: this.missingChar,
      tempCurrentCards: [],
    };
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
