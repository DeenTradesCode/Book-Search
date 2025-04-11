import type { Request } from "express";
import { GraphQLError } from "graphql";
export declare const authenticateToken: ({ req }: {
    req: Request;
}) => {
    user: null;
} | {
    user: {
        _id: unknown;
        username: string;
        email: string;
    };
};
export declare const signToken: (username: string, email: string, _id: unknown) => string;
export declare class AuthenticationError extends GraphQLError {
    constructor(message: string);
}
