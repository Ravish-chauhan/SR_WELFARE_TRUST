import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
    title: "My Profile — SR Welfare Trust",
    description: "View and manage your SR Welfare Trust profile and discount cards.",
};

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}

