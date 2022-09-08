import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
var slugify = require('slugify')
const Schema = mongoose.Schema;
const RecruitmentDetailSchema = new Schema({
  quantity: {
    type: Int,
    required: true
  },
  salary: {
    type: Float,
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