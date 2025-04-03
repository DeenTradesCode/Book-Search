import User from "../models/User.js";
import { AuthenticationError } from "../services/auth.js";
import { signToken } from "../services/auth.js";
const resolvers = {
    Query: {
        me: async (_parent, _args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id }).populate("savedBooks");
            }
            throw new AuthenticationError("You need to be logged in");
        },
        getUser: async (_parent, { username }) => {
            return User.findOne({ username }).populate("savedBooks");
        },
    },
    Mutation: {
        login: async (_parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError("Incorrect credentials");
            }
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError("Incorrect credentials");
            }
            const token = signToken(user.username, user.email, user._id);
            return { token, user };
        },
        addUser: async (_parent, { username, email, password, }) => {
            try {
                const existingUser = await User.findOne({
                    $or: [{ email }, { username }],
                });
                if (existingUser) {
                    throw new AuthenticationError(existingUser.email === email
                        ? "This email is already registered. Please login instead."
                        : "This username is already taken.");
                }
                const user = await User.create({ username, email, password });
                const token = signToken(user.username, user.email, user._id);
                return { token, user };
            }
            catch (error) {
                if (error &&
                    typeof error === "object" &&
                    "code" in error &&
                    error.code === 11000) {
                    const mongoError = error;
                    if (mongoError.keyPattern) {
                        const field = Object.keys(mongoError.keyPattern)[0];
                        throw new AuthenticationError(`This ${field} is already registered. Please try another ${field}.`);
                    }
                }
                console.error("User creation error:", error);
                throw new AuthenticationError("Failed to create user account. Please try again.");
            }
        },
        saveBook: async (_parent, { bookData }, context) => {
            if (context.user) {
                return User.findOneAndUpdate({ _id: context.user._id }, { $addToSet: { savedBooks: bookData } }, { new: true, runValidators: true }).populate("savedBooks");
            }
            throw new AuthenticationError("You need to be logged in!");
        },
        removeBook: async (_parent, { bookId }, context) => {
            if (context.user) {
                return User.findOneAndUpdate({ _id: context.user._id }, { $pull: { savedBooks: { bookId } } }, { new: true }).populate("savedBooks");
            }
            throw new AuthenticationError("You need to be logged in!");
        },
    },
};
export default resolvers;
