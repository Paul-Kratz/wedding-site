import type { AppProps } from "next/app";
import { Playfair_Display, Montserrat } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import { useBootstrap } from "../utils/bootstrap";
import { Analytics } from "@vercel/analytics/next";

const playFairDisplay = Playfair_Display({
  weight: "400",
  subsets: ["latin"],
  style: "italic",
  variable: "--font-playfair-display",
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
        className={`${playFairDisplay.variable} ${montserrat.variable} montserrat`}
      >
        <Component {...pageProps} />
      </main>
    </>
  );
}
