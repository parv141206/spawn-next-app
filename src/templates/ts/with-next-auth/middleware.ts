import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get("next-auth.session-token")?.value;
  console.log(">>>>>", currentUser);

  if (currentUser) {
    return NextResponse.next();
  } else {
    return NextResponse.redirect(new URL("/api/auth/signin", request.url));
  }
}

export const config = {
  matcher: ["/admin/"],
};
