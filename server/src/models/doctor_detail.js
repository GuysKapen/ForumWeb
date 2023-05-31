import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
const Schema = mongoose.Schema;
const DoctorDetailSchema = new Schema({
  specialization: {
    type: Schema.Types.ObjectId,
    ref: 'DoctorSpecialized',
    required: true
  },
  qualification: {
    type: String,
    required: true
  }
});

DoctorDetailSchema.plugin(mongoosePaginate);

const Field = mongoose.model("Field", DoctorDetailSchema)

export default Field