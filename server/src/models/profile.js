import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const Schema = mongoose.Schema;
const ProfileSchema = new Schema({
  title: {
    type: String,
  },
  about: {
    type: String,
  },
  cover: {
    type: String,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
});

ProfileSchema.plugin(mongoosePaginate);

const Profile = mongoose.model('Profile', ProfileSchema);
export default Profile
