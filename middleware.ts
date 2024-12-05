import { NextRequest, NextResponse } from "next/server";
import getSession from "./app/lip/session";

interface PublicOnlyUrls {
  [key: string]: boolean;
}

const publicOnlyUrls: PublicOnlyUrls = {
  "/": true,
  "/login": true,
  "/sms": true,
  "/create-account": true,

};

export const middleware = async (request: NextRequest) => {
  const session = await getSession();
  const exists = publicOnlyUrls[request.nextUrl.pathname];
  if (!session.id) {
    if (!exists) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else {
    if (exists) {
      return NextResponse.redirect(new URL("/products", request.url));
    }
  }
};

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
