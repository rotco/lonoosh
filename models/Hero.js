import mongoose from "mongoose";
import Category from "./Category";

const HeroSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name for this hero."],
    maxlength: [40, "Name cannot be more than 40 characters"],
  },
  hebrew: {
    type: String,
    required: [true, "Please provide hebrew name for that hero"],
    maxlength: [40, "Hebrew Name cannot be more than 40 characters"],
  },
  hebrewWithNikud: {
    type: String,
    required: false,
  },
  imageurl: {
    type: String,
    required: [true, "Please specify the hero's image url"],
  },
  audioFile: {
    type: String,
    required: false,
  },
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  ],
});

export default mongoose.models.Hero || mongoose.model("Hero", HeroSchema);
