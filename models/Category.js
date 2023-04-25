import mongoose from "mongoose";

const CategoryScheme = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide Hero Category Name"],
  },
});

export default mongoose.models.Category ||
  mongoose.model("Category", CategoryScheme);
