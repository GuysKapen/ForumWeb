import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const Schema = mongoose.Schema;
const CommentSchema = new Schema({
  comment: {
    type: String,
    required: true
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  commentable: {
    type: Schema.Types.ObjectId,
    required: true,
    refPath: 'commentableType'
  },
  commentableType: {
    type: String,
    required: true
  },
});

CommentSchema.plugin(mongoosePaginate);

export default mongoose.model('Comment', CommentSchema);
