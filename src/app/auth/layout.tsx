import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
    title: "SR Welfare Trust — Account",
    description: "Login or register your account with SR Welfare Trust.",
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}

