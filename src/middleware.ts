import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
 
export default createMiddleware(routing);

// export { auth as middleware } from "./app/api/auth/auth";
 
export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(vi|en)/:path*']
};