import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
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
  content: {
    type: String,
    required: true
  },
  file: {
    type: String,
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
  status: {
    type: Boolean,
    required: true,
    default: false
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
  applies: [{
    type: Schema.Types.ObjectId,
    ref: 'Apply',
  }],
});

RecruitmentSchema.pre('validate', function (next) {
  this.slug = slugify(this.name, { lower: true })
  next()
});

RecruitmentSchema.plugin(mongoosePaginate);

RecruitmentSchema.statics.findByRef = async function (refModelName, refName, queryParams, company) {
  const Model = mongoose.model(refModelName);
  const docs = await Model.find({ 'slug': company }).exec();
  if (docs != null && docs.length != 0) {
    const merge = {};
    for (const doc of docs) {
      Object.assign(merge, queryParams, {
        [refName]: {
          $in: [
            doc._id
          ]
        }
      });
    }

    return merge;
  }
  return queryParams
}

const Recruitment = mongoose.model("Recruitment", RecruitmentSchema)

export default Recruitment