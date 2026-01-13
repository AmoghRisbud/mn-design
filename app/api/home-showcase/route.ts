import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { redis } from "@/lib/redis";
import { HomeShowcase } from "@/lib/types";

// GET - Fetch all home showcase items
export async function GET() {
  try {
    const showcaseKeys = await redis.keys("home-showcase:*");

    if (!showcaseKeys || showcaseKeys.length === 0) {
      return NextResponse.json([]);
    }

    const showcases = await Promise.all(
      showcaseKeys.map(async (key) => {
        const showcase = await redis.get(key);
        return showcase;
      })
    );

    const validShowcases = showcases.filter(
      (s): s is HomeShowcase => s !== null
    );

    // Sort by order
    validShowcases.sort((a, b) => a.order - b.order);

    return NextResponse.json(validShowcases);
  } catch (error) {
    console.error("Error fetching home showcases:", error);
    return NextResponse.json(
      { error: "Failed to fetch home showcases" },
      { status: 500 }
    );
  }
}

// POST - Create new home showcase item
export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { title, category, image, projectId, order } = body;

    if (!title || !category || !image || order === undefined) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const id = `showcase-${Date.now()}`;
    const showcase: HomeShowcase = {
      id,
      title,
      category,
      image,
      projectId: projectId || undefined,
      order,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await redis.set(`home-showcase:${id}`, showcase);

    return NextResponse.json(showcase, { status: 201 });
  } catch (error) {
    console.error("Error creating home showcase:", error);
    return NextResponse.json(
      { error: "Failed to create home showcase" },
      { status: 500 }
    );
  }
}
