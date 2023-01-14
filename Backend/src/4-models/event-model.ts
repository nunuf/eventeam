import mongoose from "mongoose";
import { TypeModel } from "./type-model";

export interface IEventModel extends mongoose.Document {
  typeId: mongoose.Schema.Types.ObjectId;
  date: string;
  description: string;
  address: string;
  amount: number;
}

export const EventSchema = new mongoose.Schema<IEventModel>({
  typeId: {
    type: mongoose.Schema.Types.ObjectId
  },
  date: {
    type: String,
    required: [true, "Missing date"]
  },
  description: {
    type: String,
    required: [true, "Missing Event description"]
  },
  address: {
    type: String,
    required: [true, "Missing address"]
  },
  amount: {
    type: Number,
    required: [true, "Missing people"]
  }
}, {
  versionKey: false,
  toJSON: { virtuals: true },
  id: false
});

EventSchema.virtual('type', {
  ref: TypeModel,
  localField: 'typeId',
  foreignField: '_id',
  justOne: true
});

export const EventModel = mongoose.model<IEventModel>('EventModel', EventSchema, 'events');