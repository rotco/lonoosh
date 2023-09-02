import dbConnect from "./dbConnect";
import Category from "../models/Category";

const axios = require("axios");

export class Game {
  constructor() {
    this.score = 0;
    this.players = [];
    this.currentCards = [];
    this.completeCards = [];
    this.optionalCards = [];
    this.numOfOptionalChars = 4;
    this.collection = [];
    this.hero = null;
  }
  updateScore(num) {
    this.score += num;
    return this.score;
  }
  async getHeroFilter() {
    await dbConnect();
    const category = await Category.findOne({ name: "singer" });
    return JSON.stringify({ categories: { $ne: category._id } });
  }
  async setCollection(filter) {
    const res = await axios.get(
      `${process.env.BE_SERVER}/api/heros?filter=${filter}`
    );
    this.collection = res.data.data;
  }
}
