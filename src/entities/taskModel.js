import mongoose from "mongoose";


const taskSchema = new mongoose.Schema({
    id: {
      type: String,
      required: [true, 'Task title is required'],
    },
    description: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['todo', 'in-progress', 'done'],
      default: 'todo',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  });


  export default mongoose.model("Task", taskSchema);