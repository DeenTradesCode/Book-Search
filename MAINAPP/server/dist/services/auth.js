import jwt from "jsonwebtoken";
import { GraphQLError } from "graphql";
import dotenv from "dotenv";
dotenv.config();
export const authenticateToken = ({ req }) => {
    // allows token to be sent via req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;
    if (req.headers.authorization) {
        token = token.split(" ").pop()?.trim();
    }
    if (!token) {
        return req;
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY || "");
        req.user = decoded.data;
    }
    catch (err) {
        console.error("Token verification failed:", err);
        throw new AuthenticationError("Invalid or expired token");
    }
    return req;
};
export const signToken = (username, email, _id) => {
    const payload = { username, email, _id };
    const secretKey = process.env.JWT_SECRET_KEY;
    if (!secretKey) {
        throw new Error("JWT_SECRET_KEY not configured");
    }
    return jwt.sign({ data: payload }, secretKey, { expiresIn: "2h" });
};
export class AuthenticationError extends GraphQLError {
    constructor(message) {
        super(message, undefined, undefined, undefined, ["UNAUTHENTICATED"]);
        Object.defineProperty(this, "name", { value: "AuthenticationError" });
    }
}
