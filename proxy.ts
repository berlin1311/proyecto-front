import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isDashboardRoute = createRouteMatcher(['/dashboard(.*)']);
const isAdminOnlyRoute = createRouteMatcher(['/dashboard/usuarios(.*)', '/dashboard/reportes(.*)']);

export default clerkMiddleware(async (auth, req) => {
  if (isDashboardRoute(req)) {
    const { userId, sessionClaims } = await auth();

    // No ha iniciado sesión -> mándalo al login
    if (!userId) {
      const loginUrl = new URL('/login', req.url);
      return NextResponse.redirect(loginUrl);
    }

    const role = (sessionClaims?.metadata as { role?: string } | undefined)?.role;

    // Rutas exclusivas de admin (ej: gestión de usuarios/vendedores)
    if (isAdminOnlyRoute(req) && role !== 'admin') {
      const noAuthUrl = new URL('/no-autorizado', req.url);
      return NextResponse.redirect(noAuthUrl);
    }

    // Cualquiera sin rol asignado (ni admin ni vendedor) no puede ver nada del dashboard
    if (role !== 'admin' && role !== 'vendedor') {
      const noAuthUrl = new URL('/no-autorizado', req.url);
      return NextResponse.redirect(noAuthUrl);
    }
  }
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/__clerk/:path*',
    '/(api|trpc)(.*)',
  ],
};