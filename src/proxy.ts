import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/back-office",
  },
});

// Hanya proteksi route yang dimulai dengan /admin
export const config = { matcher: ["/admin/:path*"] };