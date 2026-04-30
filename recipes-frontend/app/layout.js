import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "RecipeShare",
  description: "Share and discover delicious recipes with RecipeShare, your go-to platform for culinary inspiration and community engagement.",
}
export default function RootLayout({ children }) {
  return (
      <html lang="en">
      <body>
      <NavBar />
      {children}
      </body>
      </html>
  );
}