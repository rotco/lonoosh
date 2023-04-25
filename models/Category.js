import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide Hero Category Name"],
    },
  },
  { collection: "categories" }
);

export default mongoose.models?.Category ||
  mongoose.model("Category", CategorySchema);
