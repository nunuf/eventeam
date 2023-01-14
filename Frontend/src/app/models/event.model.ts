import { TypeModel } from "./type.model";

export class EventModel {
  public _id: string;
  public typeId: string;
  public date: Date;
  public description: string;
  public address: string;
  public amount: number;

  public type: TypeModel;
}
