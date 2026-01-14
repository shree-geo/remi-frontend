import Link from "next/link";

export default function ForgetPasswordBtn() {
  return (
    <div className="flex justify-end">
      <Link href={"/forgot-password"}>
        <button className="text-xs text-black underline">
          Forgot password?
        </button>
      </Link>
    </div>
  );
}
