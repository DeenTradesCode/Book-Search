import { UserDocument } from "../models/User.js";
declare const resolvers: {
    Query: {
        me: (_parent: any, _args: any, context: any) => Promise<UserDocument | null>;
        getUser: (_parent: any, { username }: {
            username: string;
        }) => Promise<UserDocument | null>;
    };
    Mutation: {
        login: (_parent: any, { email, password }: {
            email: string;
            password: string;
        }) => Promise<{
            token: string;
            user: UserDocument;
        } | null>;
        addUser: (_parent: any, { username, email, password, }: {
            username: string;
            email: string;
            password: string;
        }) => Promise<{
            token: string;
            user: UserDocument;
        } | null>;
        saveBook: (_parent: any, { bookData }: {
            bookData: any;
        }, context: any) => Promise<UserDocument | null>;
        removeBook: (_parent: any, { bookId }: {
            bookId: string;
        }, context: any) => Promise<UserDocument | null>;
    };
};
export default resolvers;
