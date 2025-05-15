import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import { Metadata } from "next";
import Providers from "./Provider";
import { getServerSession } from "next-auth";
import authOptions from "./lib/auth";
import Sidebar from "./components/sidebar";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Popup from "./components/PopUp";
import Banner from "./components/Banner";
import { getProfileDetail } from "./actions/profile";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pytechh",
  description: "description for the Pytechh",
  icons: {
    icon: [{ url: "/pytechh.png", sizes: "16x16", type: "image/png" }],
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  const profileDetail = await getProfileDetail()

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers session={session}>
          <Popup />
          <div className="flex flex-col h-screen overflow-hidden">
            <Navbar imageUrl={profileDetail?.imageUrl} />
            <Banner />
            <div className="flex flex-1 min-h-0">
              <Sidebar />
              <main className="flex-1 h-auto overflow-hidden overflow-y-scroll no-scrollbar">
                {children}
              </main>
            </div>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
