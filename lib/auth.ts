// lib/auth.ts
import { JWTPayload, jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

// Encrypt the JWT token from external API
export async function encrypt(payload: JWTPayload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}

// Decrypt session token
export async function decrypt(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (error) {
    console.log("DECRYPT SESSION ERROR", error);
    return null;
  }
}

// Get session from cookies
export async function getSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

// Create session and set cookie
export async function createSession(user: JWTPayload) {
  const session = await encrypt(user);
  const cookieStore = await cookies();

  cookieStore.set("session", session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });
}

// Delete session
export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}
