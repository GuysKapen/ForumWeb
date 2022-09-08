import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
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
  this.slug = slugify(this.name)
  next()
});

FieldSchema.plugin(mongoosePaginate);

const Field = mongoose.model("Field", FieldSchema)

export default Field