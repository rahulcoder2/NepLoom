import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/redux/redux-provider";

import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/shared/header";
import Footer from "@/components/shared/footer";

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
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer/>
          </div>
          <Toaster />
        </ReduxProvider>
      </body>
    </html>
  );
}
