// app/api/auth/login/route.ts
import { createSession } from "@/lib/auth";
import { api } from "@/lib/axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Call external API for authentication
    const response = await api.post(`/auth/token/`, { email, password });

    const data = await response.data?.data;

    const { refresh, access } = data;

    // Create session with user data
    await createSession({
      access: access,
      refresh: refresh,
    });

    // Optionally store the external API token if needed for API calls
    return NextResponse.json({
      success: true,
      token: access, // Can be stored in client for direct API calls
      refresh: refresh,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
