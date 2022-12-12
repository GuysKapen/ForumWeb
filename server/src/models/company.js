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
    },
    status: {
        type: Boolean,
        required: true,
        default: false
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
    },
    country: {
        type: String,
    },
    zipcode: {
        type: String,
    },
});

CompanySchema.pre('validate', function (next) {
    this.slug = slugify(this.name, { lower: true })
    next()
});

CompanySchema.plugin(mongoosePaginate);

const Company = mongoose.model("Company", CompanySchema)

export default Company