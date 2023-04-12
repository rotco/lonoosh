const axios = require("axios");

const collection = [
  {
    engName: "table",
    hebName: "שולחן",
  },
  {
    engName: "chair",
    hebName: "כסא",
  },
  {
    engName: "car",
    hebName: "מכונית",
  },
  {
    engName: "shows",
    hebName: "נעלים",
  },
  {
    engName: "eyeglasses",
    hebName: "משקפיים",
  },
];
const allChars = "אבגדהוזחטיכךלמםנןסעפףצץקרשת";

const getVowels = async (word) => {
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
  const res = await axios.post(url, payload);
  return res.data.data[0].nakdan.options[0].w;
};

class Game {
  constructor() {
    this.score = 0;
    this.players = [];
    this.currentCards = [];
    this.completeCards = [];
    this.optionalCards = [];
    this.numOfOptionalChars = 4;
    this.collection = [];
  }
  updateScore(num) {
    this.score += num;
    return this.score;
  }
  async setCollection(collection) {
    const res = await axios.get(`${process.env.BE_SERVER}/api/heros`);
    this.collection = res.data.data;
  }
}

export class MissingChar extends Game {
  constructor() {
    super();
    this.missingChar = null;
  }

  selectRandomHero() {
    const hero = this.collection[parseInt(Math.random() * collection.length)];
    this.completeCards = hero["hebrew"].split("");
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
  async run() {
    await this.setCollection();
    this.selectRandomHero();
    this.setCurrentCards();
    this.setOptionalCards();
  }
}

export class ShuffledCharacters extends Game {
  constructor() {
    super();
    this.missingChar = null;
  }

  selectRandomHero() {
    const hero = this.collection[parseInt(Math.random() * collection.length)];
    this.completeCards = hero["hebrew"].split("");
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
  async run() {
    await this.setCollection();
    this.selectRandomHero();
    this.setCurrentCards();
    this.setOptionalCards();
  }
}

export class MissingVowel extends Game {
  constructor() {
    super();
    this.missingVowel = null;
  }

  async selectRandomHero() {
    const hero =
      this.collection[parseInt(Math.random() * this.collection.length)];
    const vowlName = await getVowels(hero["hebrew"]);
    console.log("vowlName:", vowlName);

    // const regex = /([\u0591-\u05BD\u05BF-\u05C7]*[\u05D0-\u05EA])/g;
    const regex =
      /([\u0591-\u05BD\u05BF-\u05C7]*[\u05D0-\u05EA][\u0591-\u05C7]*)/g;
    this.completeCards = vowlName.match(regex);
    console.log("this.completeCards:", this.completeCards);
    // const bidi = require("unicode-bidirectional").bidi;
    // const reordered = bidi(result.join(""), { isolate: true }).split("");
    // console.log("reordered: ", reordered);
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
}
// const run = async () => {
//   // const mcGame = new MissingChar();
//   // mcGame.selectRandomHero();
//   // mcGame.setCurrentCards();
//   // mcGame.setOptionalCards();
//   // console.log(mcGame.currentCards);
//   // console.log(mcGame.completeCards);
//   // console.log(mcGame.optionalCards);

//   const mvGame = new MissingVowel();
//   mvGame.setCollection(collection);
//   await mvGame.selectRandomHero();
//   mvGame.setCurrentCards();
//   mvGame.setOptionalCards();
//   console.log(mvGame.currentCards);
//   console.log(mvGame.completeCards);
//   console.log(mvGame.optionalCards);
// };
// run();
