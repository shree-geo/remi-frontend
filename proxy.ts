import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  cookieName,
  fallbackLng,
  headerName,
  languages,
} from "@/i18n/settings";
import acceptLanguage from "accept-language";

acceptLanguage.languages(languages);

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname.indexOf("icon") > -1 || pathname.indexOf("chrome") > -1) {
    return NextResponse.next();
  }

  let lng: string | null = null;
  if (request.cookies.has(cookieName)) {
    lng = acceptLanguage.get(request.cookies.get(cookieName)?.value || "");
  }
  if (!lng) {
    lng = acceptLanguage.get(request.headers.get("Accept-Language") || "");
  }

  if (!lng) lng = fallbackLng;

  // Check if pathname already has a locale
  const pathnameHasLocale = languages.some((locale) =>
    pathname.startsWith(`/${locale}`)
  );

  // Extract locale from pathname if it exists
  const lngInPath = languages.find((locale) =>
    pathname.startsWith(`/${locale}`)
  );

  const headers = new Headers(request.headers);

  if (!pathnameHasLocale && !request.nextUrl.pathname.startsWith("/_next")) {
    request.nextUrl.pathname = `/${lng}${pathname}`;
    return NextResponse.redirect(request.nextUrl);
  }

  // Set the header with the detected or path language
  headers.set(headerName, lngInPath || lng);

  const response = NextResponse.next({ headers });

  // Update cookie when language in path is different from cookie
  if (lngInPath && lngInPath !== request.cookies.get(cookieName)?.value) {
    response.cookies.set(cookieName, lngInPath);
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next).*)"],
};
