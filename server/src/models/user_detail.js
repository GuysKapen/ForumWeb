import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const Schema = mongoose.Schema;
const UserDetailSchema = new Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  country: {
    type: String,
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  zipcode: {
    type: String,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
});

UserDetailSchema.plugin(mongoosePaginate);

const Profile = mongoose.model('UserDetail', UserDetailSchema);
export default Profile
