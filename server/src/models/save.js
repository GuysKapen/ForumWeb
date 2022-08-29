import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const Schema = mongoose.Schema;
const SaveSchema = new Schema({
  postedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

SaveSchema.plugin(mongoosePaginate);

export default mongoose.model('Save', SaveSchema);
