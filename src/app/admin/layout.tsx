import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
    title: "Admin Panel — SR Welfare Trust",
    description: "SR Welfare Trust admin panel.",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}

