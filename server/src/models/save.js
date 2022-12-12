import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const Schema = mongoose.Schema;
const SaveSchema = new Schema({
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  recruitments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Recruitment",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

SaveSchema.plugin(mongoosePaginate);

export default mongoose.model("Save", SaveSchema);
