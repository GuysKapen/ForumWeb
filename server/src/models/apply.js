import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const Schema = mongoose.Schema;
const ApplySchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  recruitment: {
    type: Schema.Types.ObjectId,
    ref: 'Recruitment',
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  cv: {
    type: String,
    required: true
  },
  status: {
    type: Boolean,
    default: false
  }
});

ApplySchema.plugin(mongoosePaginate);

export default mongoose.model('Apply', ApplySchema);
