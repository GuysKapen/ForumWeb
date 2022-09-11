import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
var slugify = require('slugify')
const Schema = mongoose.Schema;
const RecruitmentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: 'Company',
    required: true
  },
  fields: [{
    type: Schema.Types.ObjectId,
    ref: 'Field',
    required: true
  }],
  skills: [{
    type: Schema.Types.ObjectId,
    ref: 'Skill',
  }],
});

RecruitmentSchema.pre('validate', function (next) {
  this.slug = slugify(this.name, { lower: true })
  next()
});

RecruitmentSchema.plugin(mongoosePaginate);

const Recruitment = mongoose.model("Recruitment", RecruitmentSchema)

export default Recruitment