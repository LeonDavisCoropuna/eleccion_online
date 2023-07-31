import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {
  const jwt = request.cookies.get("MyTokenName");
  if (jwt === undefined) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  try {
    const { payload } = await jwtVerify(
        jwt.value,
        new TextEncoder().encode("secret")
    );
    console.log(payload);

    if (payload.userType === 1 && request.nextUrl.pathname === "/votacion") {
      // Usuario con userType 1 puede acceder a /votacion, pero no a /resultado
      return NextResponse.next();
    } else if (payload.userType === 2 && request.nextUrl.pathname === "/resultado") {
      // Usuario con userType 2 puede acceder a /resultado, pero no a /votacion
      return NextResponse.next();
    } else {
      // En cualquier otro caso, redireccionar a la página de inicio
      return NextResponse.redirect(new URL("/", request.url));
    }
  } catch (err) {
    console.log(err);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// Rutas protegidas
export const config = {
  matcher: ["/votacion", "/resultado"],
};
