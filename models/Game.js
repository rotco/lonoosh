import mongoose from "mongoose";

const GameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name for this game."],
    maxlength: [40, "Name cannot be more than 40 characters"],
  },
  imageurl: {
    type: String,
    required: [false, "Please specify the game's image url"],
  },
});

export default mongoose.models.Game || mongoose.model("Game", GameSchema);
