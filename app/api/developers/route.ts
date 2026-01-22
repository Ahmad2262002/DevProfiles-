import connectMonggo from "@/lib/mongodb";
import Developer from "@/models/Developer";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectMonggo();
        const devs = await Developer.find().sort({ createdAt: -1 });
        return NextResponse.json(devs);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch developers" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        await connectMonggo();
        const created = await Developer.create({
            name: body.name,
            role: body.role,
            bio: body.bio,
            skills: body.skills ?? [],
            YearsOfExperience: body.YearsOfExperience ?? 0,
        });
        return NextResponse.json(created, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            {
                message: "Failed to create developer",
                error: String(error)
            },
            { status: 500 },
        );
    }
}
