import { User } from "@/app/api/models/User";
import mongoose from "mongoose";

async function connectToDatabase() {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  return mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

export async function POST(req) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const createdUser = await User.create(body);
    return new Response(JSON.stringify(createdUser), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
