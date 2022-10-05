import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
var slugify = require('slugify')
const Schema = mongoose.Schema;
const CompanySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    }
});

CompanySchema.pre('validate', function (next) {
    this.slug = slugify(this.name, { lower: true })
    next()
});

CompanySchema.plugin(mongoosePaginate);

const Company = mongoose.model("Company", CompanySchema)

export default Company