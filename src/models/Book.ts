import { required } from 'joi';
import mongoose, { Schema } from 'mongoose';
import { title } from 'process';
export const bookSchema = new Schema(
    {
        title: { type: String, required: true, unique: true },
        author: { type: String, required: true }
    },
    { timestamps: true }
);

export const Book = mongoose.model('Book', bookSchema);
