import { Schema, model } from "mongoose";

interface Todo extends Document {
    task: string;
    title: string;
    status: boolean;
}

const todoSchema = new Schema<Todo>(
    {
        task: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        status: {
            type: Boolean,
            default: false
        },
    },
    { versionKey: false, timestamps: true },
);

const Todo = model<Todo>('Todo', todoSchema);

export { Todo }