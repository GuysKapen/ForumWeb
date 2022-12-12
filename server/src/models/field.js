import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
var slugify = require('slugify')
const Schema = mongoose.Schema;
const FieldSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  }
});

FieldSchema.pre('validate', function (next) {
  this.slug = slugify(this.name, { lower: true })
  next()
});

FieldSchema.plugin(mongoosePaginate);

const Field = mongoose.model("Field", FieldSchema)

export default Field