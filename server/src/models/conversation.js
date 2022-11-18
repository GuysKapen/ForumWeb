import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const Schema = mongoose.Schema;
const ConversationSchema = new Schema({
  conversationId: {
    type: String,
    required: true
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
});

ConversationSchema.plugin(mongoosePaginate);

export default mongoose.model('Conversation', ConversationSchema);
