import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shakti Foundation | Empowering Women, Transforming Lives",
  description:
    "Shakti Foundation is a women-focused NGO dedicated to empowering women through education, healthcare, skill development, and community support. Join us in creating lasting change.",
  keywords: [
    "women empowerment",
    "NGO",
    "women education",
    "women healthcare",
    "skill development",
    "community support",
    "gender equality",
  ],
  openGraph: {
    title: "Shakti Foundation | Empowering Women, Transforming Lives",
    description:
      "Dedicated to empowering women through education, healthcare, skill development, and community support.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
