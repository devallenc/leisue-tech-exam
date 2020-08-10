import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;
export interface IUser extends mongoose.Document {
    username: string;
    email: string;
    password: string;
    suspended: boolean; 
  };

const schema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    suspended: { type: Boolean, default: false}
});

export default mongoose.model<IUser>('users', schema);