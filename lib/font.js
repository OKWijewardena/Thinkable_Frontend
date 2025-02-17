import { DM_Sans, Inter } from "next/font/google";

export const dM_Sans = DM_Sans({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--eventflow-font",
  display: "swap",
});
export const inter = Inter({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--eventflow-font-two",
  display: "swap",
});
