import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
const Schema = mongoose.Schema;
const AppointmentSchema = new Schema({
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
  dateTime: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ["scheduled", "canceled", "deleted"],
    default: "pending"
  },
  description: {
    type: String
  }
});

AppointmentSchema.plugin(mongoosePaginate);

const Appointment = mongoose.model("Appointment", AppointmentSchema)

export default Appointment