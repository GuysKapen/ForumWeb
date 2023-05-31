import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
const Schema = mongoose.Schema;
const VitalSchema = new Schema({
  // Cm
  height: {
    type: Number,
    required: true
  },
  // Kg
  weight: {
    type: Number,
    required: true
  },
  // C
  temperature: {
    type: Number,
    required: true
  },
  // /min
  pulse: {
    type: Number,
    required: true
  },
  // /min
  respiratoryRate: {
    type: Number,
    required: true
  },
  // /100
  bloodPressure: {
    type: Number,
    required: true
  },
  // %
  oxygenSaturation: {
    type: Number,
    required: true
  }
});

VitalSchema.plugin(mongoosePaginate);

const Vital = mongoose.model("Vital", VitalSchema)

export default Vital