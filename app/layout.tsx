import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Dashboard from "@/components/dashboard/Dashboard";
import { SideBarStoreProvider } from "@/provider/sidebar-provider";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Personal Finance App",
  description:
    "This is a personal finance app built with Next.js and TypeScript. It provides a user-friendly interface for managing personal finances. It was a challenge from frontend mentor completed by Kevin Emma Mbawalla.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#F8F4F0]`}
      >
        <SideBarStoreProvider>
          <Dashboard children={children} />
          <Toaster />
        </SideBarStoreProvider>
      </body>
    </html>
  );
}
