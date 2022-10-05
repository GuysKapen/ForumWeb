import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
var slugify = require('slugify')
const Schema = mongoose.Schema;
const SkillSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  }
});

SkillSchema.pre('validate', function (next) {
  this.slug = slugify(this.name, { lower: true })
  next()
});

SkillSchema.plugin(mongoosePaginate);

const Category = mongoose.model("Skill", SkillSchema)

export default Category