import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
const slugify = require('slugify')
const Schema = mongoose.Schema;
const DoctorSpecializedSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  },
});

DoctorSpecializedSchema.pre('validate', function (next) {
  this.slug = slugify(this.name, { lower: true })
  next()
});

DoctorSpecializedSchema.plugin(mongoosePaginate);

const DoctorSpecialized = mongoose.model("DoctorSpecialized", DoctorSpecializedSchema)

export default DoctorSpecialized