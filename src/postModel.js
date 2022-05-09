import mongoose from "mongoose";

// This Mongoose Model represents post collection in MongoDB database.
// These fields will be generated automatically for each Post document.

const schema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    createor: { type: String, required: true },
    likes: { type: [String], default: [] },
  },
  { timestamps: true }
);

schema.method("toJSON", () => {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

export default mongoose.model("posts", schema);
