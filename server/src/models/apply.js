import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const Schema = mongoose.Schema;
const ApplySchema = new Schema({
  phone: {
    type: String,
    required: true
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  cv: {
    type: String,
    required: true
  },
});

ApplySchema.plugin(mongoosePaginate);

export default mongoose.model('Apply', ApplySchema);
