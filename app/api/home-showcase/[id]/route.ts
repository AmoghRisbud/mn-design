import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { redis } from "@/lib/redis";
import { HomeShowcase } from "@/lib/types";

// PUT - Update home showcase item
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    const existing = await redis.get(`home-showcase:${id}`);
    if (!existing) {
      return NextResponse.json(
        { error: "Showcase not found" },
        { status: 404 }
      );
    }

    const updated: HomeShowcase = {
      ...(existing as HomeShowcase),
      ...body,
      id,
      updatedAt: new Date().toISOString(),
    };

    await redis.set(`home-showcase:${id}`, updated);

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating home showcase:", error);
    return NextResponse.json(
      { error: "Failed to update home showcase" },
      { status: 500 }
    );
  }
}

// DELETE - Delete home showcase item
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const existing = await redis.get(`home-showcase:${id}`);
    if (!existing) {
      return NextResponse.json(
        { error: "Showcase not found" },
        { status: 404 }
      );
    }

    await redis.del(`home-showcase:${id}`);

    return NextResponse.json({ message: "Showcase deleted successfully" });
  } catch (error) {
    console.error("Error deleting home showcase:", error);
    return NextResponse.json(
      { error: "Failed to delete home showcase" },
      { status: 500 }
    );
  }
}
