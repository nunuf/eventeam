import { ResourceNotFoundErrorModel, ValidationErrorModel } from '../4-models/error-models';
import { EventModel, IEventModel } from '../4-models/event-model';
import { ITypeModel, TypeModel } from '../4-models/type-model';

const getAllTypes = (): Promise<ITypeModel[]> => {
  return TypeModel.find().exec();
};

const getEventsByType = (typeId: string): Promise<IEventModel[]> => {
  return EventModel.find({ typeId }).populate('type').exec();
};

const addEvent = (event: IEventModel): Promise<IEventModel> => {
  const errors = event.validateSync();
  if (errors) throw new ValidationErrorModel(errors.message);
  return event.save();
};

const deleteEvent = async (_id: string): Promise<void> => {
  const deletedEvent = await EventModel.findByIdAndDelete({ _id });
  if (!deletedEvent) throw new ResourceNotFoundErrorModel(_id);
};

export default {
  getAllTypes,
  getEventsByType,
  addEvent,
  deleteEvent
};