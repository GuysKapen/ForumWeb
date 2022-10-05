import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
var slugify = require('slugify')
const Schema = mongoose.Schema;
const CategorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  }
});

CategorySchema.pre('validate', function (next) {
  this.slug = slugify(this.name, { lower: true })
  next()
});

CategorySchema.plugin(mongoosePaginate);

const Category = mongoose.model("Category", CategorySchema)

export default Category