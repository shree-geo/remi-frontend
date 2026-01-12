import STranslation from "@/components/molecules/translations/STranslation";
import Image from "next/image";

export default function Header() {
  return (
    <div className="text-center">
      <div className="mx-auto flex items-center justify-center gap-2">
        <Image
          src="/gov-logo.png"
          alt="Government of Nepal"
          width={100}
          height={100}
          className="h-12 w-12"
        />
        <STranslation
          tKey="headerTitle"
          ns="login"
          className="text-2xl font-bold"
        />
      </div>
      <STranslation
        tKey="headerDescription"
        ns="login"
        className="mt-2 text-sm text-muted-foreground"
      />
    </div>
  );
}
