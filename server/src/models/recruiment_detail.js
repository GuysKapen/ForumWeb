import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
var slugify = require('slugify')
const Schema = mongoose.Schema;
const RecruitmentDetailSchema = new Schema({
  quantity: {
    type: Number,
    required: true
  },
  salary: {
    type: Number,
    required: true
  },
  recruitment: {
    type: Schema.Types.ObjectId,
    ref: "Recruitment",
    required: true
  }
});

RecruitmentDetailSchema.plugin(mongoosePaginate);

const RecruitmentDetail = mongoose.model("RecruitmentDetail", RecruitmentDetailSchema)

export default RecruitmentDetail