import { getServerSession } from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import mongoose from "mongoose";
import { User } from '@/app/api/models/User';

export async function PUT(req) {
    try {
        mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to MongoDB");
        const data = await req.json();
        console.log("Requesteddd data:", data);
        const session = await getServerSession(authOptions);
        console.log("Session retrieved:", session);
        const email = session.user.email;


        if ('name' in data) {
            await User.updateOne({email}, {name:data.name})
        }

        return Response.json(true)
    } catch (error) {
        console.error("Error updating user:", error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
