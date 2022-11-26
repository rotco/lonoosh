import mongoose from "mongoose";

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
  imageurl: {
    type: String,
    required: [true, "Please specify the hero's image url"],
  },
  audioFile: {
    type: String,
    required: [true, "Please specify the hero's audio file name"],
  },
});

export default mongoose.models.Hero || mongoose.model("Hero", HeroSchema);
