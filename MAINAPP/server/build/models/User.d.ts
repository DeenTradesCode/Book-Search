import { type Document } from "mongoose";
import type { BookDocument } from "./Book.js";
export interface UserDocument extends Document {
    id: string;
    username: string;
    email: string;
    password: string;
    savedBooks: BookDocument[];
    isCorrectPassword(password: string): Promise<boolean>;
    bookCount: number;
}
declare const User: import("mongoose").Model<UserDocument, {}, {}, {}, Document<unknown, {}, UserDocument> & UserDocument & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default User;
