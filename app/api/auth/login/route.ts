import { SessionPayload } from "@/definitions/auth.definition";
import { handleApi } from "@/lib/apiHandler";
import { createSession } from "@/lib/auth";
import { api } from "@/lib/axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    const [response, error] = await handleApi<SessionPayload>(
      async () => await api.post(`/auth/login/`, { email, password }),
      { isAuthenticated: false },
    );
    if (response) {
      const data = response?.data?.data;
      await createSession(data);
      return NextResponse.json(response?.data, { status: 201 });
    }
    if (error) {
      return NextResponse.json(
        { error: error?.response?.data?.error || error?.response?.data },
        { status: error?.response?.data?.code || error?.status || 500 },
      );
    }
  } catch (error) {
    console.log("i am here", error);

    return NextResponse.json(
      {
        error: {
          error,
          message: "Something went wrong. Please try again.[client error]",
        },
      },
      { status: 500 },
    );
  }
}
