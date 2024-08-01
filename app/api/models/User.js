import { model, models, Schema } from "mongoose";

const SALT_ROUNDS = 10;


const UserSchema = new Schema({
  image: {
    type: String,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
  },
  streetAddress: {
    type: String,
  },
  postalCode: {
    type: String,
  },
  city: {
    type: String,
  },
  country: {
    type: String,
  },
  password: {
    type: String,
  },
  admin: {type: Boolean, default: false},
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