import type { AppProps } from "next/app";
import { Petit_Formal_Script, Montserrat } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import { useBootstrap } from "../utils/bootstrap";
import { Analytics } from "@vercel/analytics/next";

const petitFormalScript = Petit_Formal_Script({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-petit-formal-script",
});

const montserrat = Montserrat({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-montserrat",
});
export default function App({ Component, pageProps }: AppProps) {
  useBootstrap();
  return (
    <>
      <Analytics />
      <main
        className={`${petitFormalScript.variable} ${montserrat.variable} montserrat`}
      >
        <Component {...pageProps} />
      </main>
    </>
  );
}
