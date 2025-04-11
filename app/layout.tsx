import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import "react-loading-skeleton/dist/skeleton.css";
import Navbar from "@/components/navbar";
import Providers from "@/components/Provider";
import ChatWidget from "@/components/ChatWidget"; // ✅ Import chatbot

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ShareSpace",
  description: "Your Ultimate Community Connection.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <Providers>
          <Navbar />
          <main className="pb-16 md:pt-28 pt-24">
            {children}
          </main>
          <ChatWidget /> {/* ✅ Global persistent chatbot */}
        </Providers>
      </body>
    </html>
  );
}
