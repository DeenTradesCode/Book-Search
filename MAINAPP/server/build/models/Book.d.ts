import { Schema, type Document } from "mongoose";
export interface BookDocument extends Document {
    bookId: string;
    title: string;
    authors: string[];
    description: string;
    image: string;
    link: string;
}
declare const bookSchema: Schema<BookDocument, import("mongoose").Model<BookDocument, any, any, any, Document<unknown, any, BookDocument> & BookDocument & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, BookDocument, Document<unknown, {}, import("mongoose").FlatRecord<BookDocument>> & import("mongoose").FlatRecord<BookDocument> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
export default bookSchema;
