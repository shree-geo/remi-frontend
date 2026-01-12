import STranslation from "@/components/molecules/translations/STranslation";
import { FileText } from "lucide-react";

export default function Header() {
  return (
    <div className="text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-primary">
        <FileText className="h-7 w-7 text-primary-foreground" />
      </div>
      <h1 className="mt-4 text-2xl font-bold">
        <STranslation tKey="headerTitle" ns="login" />
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        <STranslation tKey="headerDescription" ns="login" />
      </p>
    </div>
  );
}
