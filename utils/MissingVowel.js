import { set } from "mongoose";
import { Game } from "./game";
import axios from "axios";
import Category from "../models/Category";
import dbConnect from "./dbConnect";
const allChars = "אבגדהוזחטיכךלמםנןסעפףצץקרשת";

export class MissingVowel extends Game {
  constructor() {
    super();
    this.missingChar = null;
    this.nikudCodes = {
      tsere: 1467,
      kamats: 1464,
      shva: 1456,
      chirik: 1460,
      // dagesh: 1468,
      patach: 1463,
      cholam: 1465,
      shuruk: 1467,
    };
  }
  async getHeroFilter() {
    await dbConnect();
    const category = await Category.findOne({ name: "needNikud" });
    // return JSON.stringify({ name: "chips" });
    return JSON.stringify({ categories: category._id });
  }
  findNikudRegex() {
    let regexString = "";
    for (let key in this.nikudCodes) {
      const hexValue = this.nikudCodes[key].toString(16).padStart(4, "0");
      regexString += `\\u${hexValue}|`;
    }
    regexString = regexString.slice(0, -1);
    const regex = new RegExp(regexString, "g");
    return regex;
  }
  async getVowels(word) {
    const payload = {
      addmorph: false,
      keepmetagim: true,
      keepqq: false,
      nodageshdefmem: false,
      patachma: false,
      task: "nakdan",
      data: word,
      useTokenization: true,
      genre: "modern",
    };
    const url = "https://nakdan-5-1.loadbalancer.dicta.org.il/api";
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      return data.data[0].nakdan.options[0].w;
    } catch (error) {
      console.log("error", error);
      throw new Error("Failed to retrieve data");
    }
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
  async initCards(hero) {
    const regex =
      /([\u0591-\u05BD\u05BF-\u05C7]*[\u05D0-\u05EA][\u0591-\u05C7]*)/g;
    let currentCards = hero.hebrewWithNikud.match(regex);
    let missingChar;
    let matchCode;
    let missingCharIndex;
    let codes = Object.values(this.nikudCodes);

    while (true) {
      missingCharIndex = parseInt(Math.random() * currentCards.length);
      missingChar = currentCards[missingCharIndex];
      const matches = missingChar.match(this.findNikudRegex());
      if (matches) {
        const m = matches.find((ch) => {
          return codes.includes(ch.charCodeAt(0));
        });
        matchCode = m[0].charCodeAt(0);
        break;
      }
    }

    currentCards[missingCharIndex] = " ";
    let count = 0;
    const optionalCards = new Array(this.numOfOptionalChars);
    let usedCodes = new Set();
    const missingVowelChar = String.fromCharCode(matchCode);
    // const tsereRegex = new RegExp(tsereChar, "g");
    const missingVowelRegex = new RegExp(missingVowelChar, "g");
    while (count < this.numOfOptionalChars) {
      const i = parseInt(Math.random() * codes.length);
      const j = parseInt(Math.random() * this.numOfOptionalChars);
      if (!usedCodes.has(codes[i]) && !optionalCards[j]) {
        count += 1;
        if (count == 1) {
          optionalCards[j] = missingChar;
          usedCodes.add(matchCode);
        } else {
          const changeToNewVowelRegex = String.fromCharCode(codes[i]);
          optionalCards[j] = missingChar.replace(
            missingVowelRegex,
            changeToNewVowelRegex
          );
          usedCodes.add(codes[i]);
        }
      }
    }
    return {
      optional: optionalCards,
      required: missingChar,
      tempCurrentCards: currentCards,
    };
    // return { optionalCards, missingChar, currentCards };
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
