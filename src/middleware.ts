import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { locales } from "./config";

const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales: locales,

  // Used when no locale matches
  defaultLocale: locales[0],
});

// Exclude /api/uploadthing from the internationalization middleware
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip i18n middleware for /api/uploadthing
  if (pathname.startsWith("/api/uploadthing")) {
    return NextResponse.next();
  }

  return intlMiddleware(request);
}

export const config = {
  // Match all paths except for /api/uploadthing
  matcher: ["/(?!api/uploadthing).*"],
};
