"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { User, LogOut, Shield } from "lucide-react";
import { useRouter } from "next/navigation";

const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Causes", href: "#causes" },
    { name: "Events", href: "#events" },
    { name: "Gallery", href: "#gallery" },
    { name: "Contact", href: "#contact" },
];

interface AuthUser {
    name: string;
    role: "user" | "admin";
}

export default function Navbar() {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [authUser, setAuthUser] = useState<AuthUser | null>(null);
    const [authLoading, setAuthLoading] = useState(true);

    // Check auth state on mount
    useEffect(() => {
        fetch("/api/auth/me", { cache: "no-store" })
            .then((r) => r.ok ? r.json() : null)
            .then((data) => {
                if (data?.user) {
                    setAuthUser({ name: data.user.name, role: data.user.role });
                } else {
                    setAuthUser(null);
                }
            })
            .finally(() => setAuthLoading(false));
    }, []);

    const handleLogout = async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        setAuthUser(null);
        setIsOpen(false);
        router.refresh();
    };

    useEffect(() => {
        const fab = document.getElementById("fab-wrapper");

        if (isOpen) {
            document.body.style.overflow = "hidden";
            if (fab) {
                fab.style.opacity = "0";
                fab.style.pointerEvents = "none";
                fab.style.transition = "all 0.3s ease-in-out";
            }
        } else {
            document.body.style.overflow = "";
            if (fab) {
                fab.style.opacity = "1";
                fab.style.pointerEvents = "auto";
            }
        }

        return () => {
            document.body.style.overflow = "";
            if (fab) {
                fab.style.opacity = "1";
                fab.style.pointerEvents = "auto";
            }
        };
    }, [isOpen]);

    return (
        <nav className="sticky top-0 left-0 right-0 z-50 bg-white shadow-[0_10px_40px_rgba(0,0,0,0.08)] border-b border-black/[0.03]">

            {/* ── Mobile-only Scholarship Ticker ─────────────────── */}
            <div className="lg:hidden overflow-hidden bg-[#366861] py-1.5">
                <div className="ticker-track flex whitespace-nowrap">
                    {[0, 1].map((i) => (
                        <div key={i} className="ticker-content flex items-center gap-8 pr-8">
                            {[
                                "🎓 NEW: NEET Scholarship Test by SR Welfare Trust - Apply Now!",
                                "📚 Scholarship for Class 10th-12th & Droppers - Limited Seats!",
                                "🏆 Offline Test · Full Study Support · Mentorship Included",
                                "📝 Register at /scholarship-test",
                            ].map((msg) => (
                                <Link key={msg} href="/scholarship-test"
                                    className="inline-flex items-center gap-2 text-white text-[11px] font-medium hover:text-yellow-200 transition-colors">
                                    <span className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse flex-shrink-0" />
                                    {msg}
                                </Link>
                            ))}
                        </div>
                    ))}
                </div>
                <style>{`
                    .ticker-track {
                        animation: ticker-scroll 28s linear infinite;
                    }
                    .ticker-track:hover {
                        animation-play-state: paused;
                    }
                    @keyframes ticker-scroll {
                        0%   { transform: translateX(0); }
                        100% { transform: translateX(-50%); }
                    }
                `}</style>
            </div>

            <div className="max-w-[1440px] mx-auto px-4 lg:px-8 xl:px-12">
                <div className="flex items-center justify-between py-3 lg:py-3.5 xl:py-5">
                    {/* Logo Group */}
                    <Link href="#home" className="flex items-center group flex-shrink-0 lg:-translate-x-4 xl:translate-x-0">
                        <Image
                            src="/logo2.svg"
                            alt="SR Welfare Trust"
                            width={170}
                            height={170}
                            className="h-[100px] sm:h-[120px] lg:h-[140px] xl:h-[170px] w-auto -ml-14 sm:-ml-12 lg:-ml-14 xl:-ml-16 -my-8 sm:-my-12 lg:-my-16 xl:-my-20 transition-all duration-300"
                            priority
                        />
                        <div className="flex flex-col items-center leading-[0.8] -ml-12 sm:-ml-12 lg:-ml-16 xl:-ml-20 -mt-1 select-none">
                            <div className="text-[#366861] font-medium text-lg sm:text-2xl lg:text-[22px] xl:text-3xl tracking-[0.05em] font-[family-name:var(--font-heading)]">
                                SR WELFARE
                            </div>
                            <div className="flex items-center w-full gap-0.5 sm:gap-1 mt-0">
                                <svg className="flex-grow h-[2px] sm:h-[3px] max-w-[30px] sm:max-w-[45px] lg:max-w-[50px] xl:max-w-[60px]" viewBox="0 0 100 10" preserveAspectRatio="none">
                                    <path d="M100 2 L100 8 L0 5 Z" fill="#e24a40" fillOpacity="0.8" />
                                </svg>
                                <div className="text-[#366861] font-bold text-[7px] sm:text-[9px] lg:text-[8px] xl:text-[10px] tracking-[0.3em] px-0.5 sm:px-1">
                                    TRUST
                                </div>
                                <svg className="flex-grow h-[2px] sm:h-[3px] max-w-[30px] sm:max-w-[45px] lg:max-w-[50px] xl:max-w-[60px]" viewBox="0 0 100 10" preserveAspectRatio="none">
                                    <path d="M0 2 L0 8 L100 5 Z" fill="#e24a40" fillOpacity="0.8" />
                                </svg>
                            </div>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden lg:flex items-center gap-4 xl:gap-8">
                        <div className="flex items-center gap-0.5 xl:gap-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="relative px-2 xl:px-3 py-2 text-[12px] xl:text-[14px] font-semibold tracking-wide uppercase text-foreground/80 hover:text-primary transition-all duration-300 rounded-lg group"
                                >
                                    {link.name}
                                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] rounded-full bg-gradient-to-r from-primary to-accent w-0 group-hover:w-1/2 transition-all duration-300" />
                                </Link>
                            ))}
                            {/* Scholarship link — desktop */}
                            <Link
                                href="/scholarship-test"
                                className="relative px-2 xl:px-3 py-2 text-[12px] xl:text-[14px] font-semibold tracking-wide uppercase text-[#366861] hover:text-[#2a5048] transition-all duration-300 rounded-lg group"
                            >
                                Scholarship
                                {/* Red NEW dot */}
                                <span className="absolute top-1 right-0.5 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] rounded-full bg-[#366861] w-0 group-hover:w-1/2 transition-all duration-300" />
                            </Link>
                        </div>

                        {/* Auth area — desktop */}
                        {!authLoading && (
                            authUser ? (
                                <div className="flex items-center gap-2 ml-6 xl:ml-12">
                                    {authUser.role === "admin" && (
                                        <Link href="/admin"
                                            className="flex items-center gap-1.5 px-3 py-2 text-[10px] xl:text-xs font-bold uppercase tracking-wider text-[#d4868e] border border-[#d4868e]/30 rounded-full hover:bg-[#d4868e]/10 transition-all">
                                            <Shield className="w-3.5 h-3.5" /> Admin
                                        </Link>
                                    )}
                                    <Link href="/profile"
                                        className="flex items-center gap-1.5 px-3 xl:px-4 py-2 bg-[#1a3a3a]/10 hover:bg-[#1a3a3a]/15 text-[#1a3a3a] text-[10px] xl:text-xs font-bold uppercase tracking-wider rounded-full transition-all border border-[#1a3a3a]/10">
                                        <User className="w-3.5 h-3.5" />
                                        {authUser.name.split(" ")[0]}
                                    </Link>
                                    <button onClick={handleLogout}
                                        className="flex items-center gap-1 px-3 py-2 text-[10px] xl:text-xs font-bold uppercase tracking-wider text-red-500/70 hover:text-red-600 rounded-full hover:bg-red-50 transition-all border border-transparent hover:border-red-100">
                                        <LogOut className="w-3.5 h-3.5" /> Out
                                    </button>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2 ml-6 xl:ml-12">
                                    <Link href="/auth/login"
                                        className="px-4 xl:px-5 py-2 text-[10px] xl:text-xs font-bold uppercase tracking-wider text-[#366861] border border-[#366861]/30 rounded-full hover:bg-[#366861]/5 transition-all">
                                        Login
                                    </Link>
                                    <Link href="#donate"
                                        className="px-4 xl:px-7 py-2 xl:py-2.5 bg-gradient-to-r from-primary to-primary-dark text-white text-[10px] xl:text-sm font-bold uppercase tracking-wider rounded-full hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 text-center whitespace-nowrap">
                                        Donate Now
                                    </Link>
                                </div>
                            )
                        )}
                    </div>

                    {/* Mobile: Login/Profile + Hamburger */}
                    <div className="lg:hidden flex items-center gap-2 z-50">
                        {!authLoading && (
                            authUser ? (
                                <Link href="/profile"
                                    className="flex items-center gap-1.5 px-3 py-2 bg-[#1a3a3a]/8 border border-[#1a3a3a]/15 text-[#1a3a3a] text-[11px] font-bold uppercase tracking-wider rounded-full active:scale-95 transition-all duration-300 whitespace-nowrap">
                                    <User className="w-4 h-4" />
                                    {authUser.name.split(" ")[0]}
                                </Link>
                            ) : (
                                <Link href="/auth/login"
                                    className="flex items-center gap-1.5 px-3 py-2 border border-[#366861]/40 text-[#366861] text-[11px] font-bold uppercase tracking-wider rounded-full active:scale-95 transition-all duration-300 whitespace-nowrap hover:bg-[#366861]/5">
                                    <User className="w-4 h-4" />
                                    Login
                                </Link>
                            )
                        )}

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-primary/5 active:scale-95 transition-all duration-300"
                            aria-label="Toggle menu"
                        >
                            {!isOpen && (
                                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse z-10" />
                            )}
                            <div className="relative w-[22px] h-[16px]">
                                <span
                                    className={`absolute left-0 w-full h-[2.5px] rounded-full transition-all duration-300 ease-out origin-center ${isOpen ? "top-[7px] rotate-45 bg-primary" : "top-0 bg-[#1a3a3a]"}`}
                                />
                                <span
                                    className={`absolute left-0 top-[7px] w-full h-[2.5px] bg-[#1a3a3a] rounded-full transition-all duration-300 ease-out origin-center ${isOpen ? "opacity-0 scale-x-0" : "opacity-100 scale-x-100"}`}
                                />
                                <span
                                    className={`absolute left-0 w-full h-[2.5px] rounded-full transition-all duration-300 ease-out origin-center ${isOpen ? "top-[7px] -rotate-45 bg-primary" : "bottom-0 bg-[#1a3a3a]"}`}
                                />
                            </div>
                        </button>
                    </div>

                </div>

                {/* Mobile Menu Overlay */}
                <div
                    className={`lg:hidden fixed inset-0 bg-white z-40 transition-transform duration-500 ease-in-out transform ${isOpen ? "translate-x-0" : "translate-x-full"}`}
                >
                    <div className="flex flex-col h-full pt-24 px-6 pb-8">
                        <div className="flex flex-col space-y-2 overflow-y-auto flex-grow">
                            {/* Scholarship — mobile menu (TOP) */}
                            <Link
                                href="/scholarship-test"
                                onClick={() => setIsOpen(false)}
                                className="flex items-center justify-between py-4 border-b border-border-light"
                            >
                                <span className="text-xl font-bold uppercase tracking-widest text-[#366861]">Scholarship Test</span>
                                <span className="flex items-center gap-1.5 px-2.5 py-1 bg-red-500 rounded-full text-white text-[10px] font-bold uppercase tracking-wider animate-pulse">
                                    <span className="w-1.5 h-1.5 bg-white rounded-full" />
                                    New
                                </span>
                            </Link>
                            
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="block text-xl font-bold uppercase tracking-widest py-4 border-b border-border-light text-[#366861] hover:text-primary transition-all duration-300"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            {!authLoading && (
                                authUser ? (
                                    <>
                                        <Link href="/profile" onClick={() => setIsOpen(false)}
                                            className="flex items-center gap-3 text-xl font-bold uppercase tracking-widest py-4 border-b border-border-light text-[#1a3a3a]">
                                            <User className="w-5 h-5" /> My Profile
                                        </Link>
                                        {authUser.role === "admin" && (
                                            <Link href="/admin" onClick={() => setIsOpen(false)}
                                                className="flex items-center gap-3 text-xl font-bold uppercase tracking-widest py-4 border-b border-border-light text-[#d4868e]">
                                                <Shield className="w-5 h-5" /> Admin Panel
                                            </Link>
                                        )}
                                        <button onClick={handleLogout}
                                            className="flex items-center gap-3 text-xl font-bold uppercase tracking-widest py-4 border-b border-border-light text-red-500 w-full text-left">
                                            <LogOut className="w-5 h-5" /> Logout
                                        </button>
                                    </>
                                ) : (
                                    <Link href="/auth/login" onClick={() => setIsOpen(false)}
                                        className="flex items-center gap-3 text-xl font-bold uppercase tracking-widest py-4 border-b border-border-light text-[#366861]">
                                        <User className="w-5 h-5" /> Login / Register
                                    </Link>
                                )
                            )}
                        </div>
                        <Link
                            href="#donate"
                            onClick={() => setIsOpen(false)}
                            className="block w-full text-center px-6 py-4 bg-gradient-to-r from-primary to-primary-dark text-white font-bold uppercase tracking-wider rounded-full mt-8 shadow-lg shadow-primary/20"
                        >
                            Donate Now
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
