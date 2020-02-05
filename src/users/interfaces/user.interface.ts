import { Document } from 'mongoose';

export interface User extends Document {
  readonly _id: string;
  username: string;
  readonly email: string;
  readonly password: string;
  language: string;
  currencyName: string;
  userAvatarUrl: string;
}
