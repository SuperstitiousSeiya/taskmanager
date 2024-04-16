import mongoose, { Schema, Document } from 'mongoose';

export interface Task extends Document {
  title: string;
  content: string;
}

const postSchema: Schema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
});

export default mongoose.model<Task>('Post', postSchema);
