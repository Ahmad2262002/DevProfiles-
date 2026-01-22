import connectMonggo from "@/lib/mongodb";
import Developer from "@/models/Developer";
import { NextResponse } from 'next/server';

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();

        await connectMonggo();
        const updatedDev = await Developer.findByIdAndUpdate(
            id,
            { $set: body },
            { new: true, runValidators: true }
        );

        if (!updatedDev) {
            return NextResponse.json({ error: "Developer not found" }, { status: 404 });
        }

        return NextResponse.json(updatedDev);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update developer", details: String(error) }, { status: 400 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await connectMonggo();
        const deletedDev = await Developer.findByIdAndDelete(id);

        if (!deletedDev) {
            return NextResponse.json({ error: "Developer not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Developer deleted successfully", id });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete developer", details: String(error) }, { status: 500 });
    }
}

