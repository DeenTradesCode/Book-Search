import { Schema, model } from "mongoose";
import * as bcrypt from "bcryptjs";
import bookSchema from "./Book.js";
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, "Must use a valid email address"],
    },
    password: {
        type: String,
        required: true,
    },
    savedBooks: [bookSchema],
}, {
    toJSON: {
        virtuals: true,
    },
});
userSchema.pre("save", async function (next) {
    if (this.isNew || this.isModified("password")) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
});
userSchema.methods.isCorrectPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};
userSchema.virtual("bookCount").get(function () {
    return this.savedBooks.length;
});
const User = model("User", userSchema);
export default User;
