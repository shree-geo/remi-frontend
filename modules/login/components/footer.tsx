import STranslation from "@/components/molecules/translations/STranslation";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full py-4 space-y-6">
      <div className="flex justify-center">
        <Link
          href="https://moless.gov.np/"
          target="_blank"
          className="group transition-opacity hover:opacity-80"
        >
          <STranslation
            tKey="footer"
            ns="login"
            className="text-center text-xs font-semibold text-muted-foreground transition-colors group-hover:text-foreground"
          />
        </Link>
      </div>

      <Separator className="bg-border/50" />

      <div className="grid grid-cols-2 gap-8 px-4">
        <div className="flex flex-col items-center gap-3">
          <STranslation
            tKey="supportedBy"
            ns="login"
            className="text-xs tracking-widest text-muted-foreground/80 font-semibold"
          />
          <Link
            href="https://remi.org.np/"
            target="_blank"
            className="transition-transform duration-300 hover:scale-105"
          >
            <div className="relative flex items-center justify-center">
              <Image
                src="/remilogo.png"
                alt="Government of Nepal"
                width={100}
                height={100}
                className="h-full w-full object-contain"
              />
            </div>
          </Link>
        </div>

        <div className="flex flex-col items-center gap-3">
          <STranslation
            tKey="developedBy"
            ns="login"
            className="text-xs tracking-widest text-muted-foreground/80 font-semibold"
          />
          <Link
            href="https://www.youngminds.com.np/"
            target="_blank"
            className="transition-transform duration-300 hover:scale-105"
          >
            <div className="relative flex items-center justify-center">
              <Image
                src="/ym-logo.svg"
                alt="Young Minds Creations Pvt. Ltd."
                width={120}
                height={40}
                className="h-full w-full object-contain"
              />
            </div>
          </Link>
        </div>
      </div>
    </footer>
  );
}
