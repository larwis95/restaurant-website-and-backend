import mongoose, { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
  username: string;
  password: string;
  name: string;
}

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password") || !this.isNew) {
    return next();
  }
  const SALT_ROUNDS = process.env.SALT_ROUNDS
    ? parseInt(process.env.SALT_ROUNDS)
    : 10;
  try {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    next();
  } catch (error) {
    next(error as Error);
  }
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.models.User || model<IUser>("User", userSchema);
