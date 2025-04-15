import { prop, getModelForClass } from '@typegoose/typegoose';
import { BaseModel } from '../core/base.model';

export class User extends BaseModel {
  @prop({ required: true })
  public name!: string;

  @prop({ required: true, unique: true })
  public email!: string;

  @prop({ required: true })
  public password!: string;
}

export const UserModel = getModelForClass(User);
