import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

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

CategorySchema.plugin(mongoosePaginate);

// module.exports = mongoose.model('Category', CategorySchema);
const Category = mongoose.model("Category", CategorySchema)

export default Category