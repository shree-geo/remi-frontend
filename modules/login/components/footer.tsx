import STranslation from "@/components/molecules/translations/STranslation";

export default function Footer() {
  return (
    <p className="text-center text-xs text-muted-foreground">
      <STranslation tKey="footer" ns="login" />
    </p>
  );
}
