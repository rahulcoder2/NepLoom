import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/redux/redux-provider";
import Header from "@/components/shared/header";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "NepLoom - Shopping Made Simple",
  description: "Discover and purchase top products without hassle.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${poppins.variable} font-poppins antialiased`}
      >
        <ReduxProvider>
          <main className="min-h-screen flex flex-col">
            <Header />
            {children}
          </main>
          <Toaster />
        </ReduxProvider>
      </body>
    </html>
  );
}
