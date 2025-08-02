import bcrypt from "bcryptjs";
import { model, Schema } from "mongoose";
import { IUser } from "./user.interface";

const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String
    },
    phone: {
        type: String
    },
    photo: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["student", "admin"],
        default: "student"
    }
}, {
    versionKey: false,
    timestamps: true
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password") || !this.password) return next();

    try {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (error) {
        next(error as Error);
    }
});

export const User = model<IUser>("user", userSchema);