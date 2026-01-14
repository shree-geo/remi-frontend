import CTranslation from "@/components/molecules/translations/CTranslation";
import Link from "next/link";

export default function ForgetPasswordBtn() {
  return (
    <div className="flex justify-end">
      <button className="text-xs text-black underline">
        <Link href={"/forgot-password"}>
          <CTranslation tKey="forgotPassword" ns="login" />
        </Link>
      </button>
    </div>
  );
}
