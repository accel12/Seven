import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const jwt = request.cookies.get("Token");
  if (request.nextUrl.pathname.includes("/Home")) {
    console.log(jwt);
    if (jwt == undefined) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    if (jwt.value == "") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
  return NextResponse.next();
}
// export const config = {
//   matcher: "/Home/:path*",
// };
