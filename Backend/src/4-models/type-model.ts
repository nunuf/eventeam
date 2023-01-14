import mongoose from 'mongoose'

export interface ITypeModel extends mongoose.Document {
  name: string;
}

export const TypeSchema = new mongoose.Schema<ITypeModel>({
  name: {
    type: String,
    required: [true, "Missing Type name"]
  }
});

export const TypeModel = mongoose.model<ITypeModel>('TypeModel', TypeSchema, 'types');