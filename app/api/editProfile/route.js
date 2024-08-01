import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import mongoose from "mongoose";
import { User } from '@/app/api/models/User';

export async function PUT(req) {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        const data = await req.json();
        console.log(data);
        const session = await getServerSession(authOptions);
        const email = session.user.email;

        await User.updateOne({email}, data)

        return new Response(JSON.stringify(true), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error("Error creating or updating user:", error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

export async function GET() {
    mongoose.connect(process.env.MONGO_URL);
    const session = await getServerSession(authOptions);
    const email = session.user.email;
    return Response.json(
        await User.findOne({email})
    );
}
