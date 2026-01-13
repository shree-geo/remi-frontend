import { nextApi } from "@/lib/axios";
import { catchActionError } from "@/lib/catchActionError";

export async function logout(state: undefined) {
  return catchActionError(async () => {
    await nextApi.post("/api/auth/logout");
    return {
      error: null,
      success: true,
      message: "Logout successful",
    };
  }, state);
}
