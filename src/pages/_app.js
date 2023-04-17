import Footer from "@/components/partials/footer";
import Header from "@/components/partials/header";
import { AuthProvider, ProtectRoute, useAuth } from "@/context/auth";
import "@/styles/globals.css";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  return (
    <AuthProvider>
      {!router.asPath.startsWith("/auth") && <Header />}
      <Component {...pageProps} />
      {!router.asPath.startsWith("/auth") && <Footer />}
    </AuthProvider>
  );
}
