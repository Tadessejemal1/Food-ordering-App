import { model, models, Schema } from "mongoose";

const SALT_ROUNDS = 10;

const UserSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
}, { timestamps: true });

// UserSchema.pre("save", async function (next) {
//   const user = this;

//   if (!user.isModified("password")) return next();

//   try {
//     const salt = await bcrypt.genSalt(SALT_ROUNDS);
//     user.password = await bcrypt.hash(user.password, salt);
//     next();
//   } catch (err) {
//     next(err);
//   }
// });

export const User = models?.User || model("User", UserSchema)