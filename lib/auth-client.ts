"use client";
import { SessionPayload } from "@/definitions/auth.definition";

export function getSession() {
  if (!window) throw new Error("getSession must be used in a client component");
  const session = localStorage.getItem("REMI_SESSION");
  if (!session) return null;
  return JSON.parse(session);
}

export function createSession(payload: SessionPayload) {
  if (!window)
    throw new Error("createSession must be used in a client component");
  const session = JSON.stringify(payload);
  localStorage.setItem("REMI_SESSION", session);
}

export async function deleteSession() {
  if (!window)
    throw new Error("deleteSession must be used in a client component");
  localStorage.removeItem("REMI_SESSION");
}
