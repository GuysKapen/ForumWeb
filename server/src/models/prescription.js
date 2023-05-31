import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
const Schema = mongoose.Schema;
const PrescriptionSchema = new Schema({
  patientId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  docId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  medicationName: {
    type: String,
    required: true
  },
  dosage: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
});

PrescriptionSchema.plugin(mongoosePaginate);

const Prescription = mongoose.model("Prescription", PrescriptionSchema)

export default Prescription