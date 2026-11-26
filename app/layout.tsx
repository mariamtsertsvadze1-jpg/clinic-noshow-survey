import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "კლინიკაში გაცდენილი ვიზიტების კვლევა",
  description: "კვლევის კითხვარი კლინიკის No-Show და Waitlist სიმულაციის პროექტისთვის"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ka">
      <body>{children}</body>
    </html>
  );
}
