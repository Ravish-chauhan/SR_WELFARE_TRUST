"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Programs", href: "#programs" },
    { name: "Impact", href: "#impact" },
    { name: "Stories", href: "#stories" },
    { name: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="sticky top-0 left-0 right-0 z-50 bg-white shadow-[0_10px_40px_rgba(0,0,0,0.08)] border-b border-black/[0.03]">
            <div className="max-w-[1440px] mx-auto px-4 lg:px-8 xl:px-12">
                <div className="flex items-center justify-between py-3 lg:py-3.5 xl:py-5">
                    {/* Logo Group */}
                    <Link href="#home" className="flex items-center group flex-shrink-0">
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
                        </div>
                        <Link
                            href="#donate"
                            className="ml-6 xl:ml-12 px-4 xl:px-7 py-2 xl:py-2.5 bg-gradient-to-r from-primary to-primary-dark text-white text-[10px] xl:text-sm font-bold uppercase tracking-wider rounded-full hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 text-center whitespace-nowrap"
                        >
                            Donate Now
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="lg:hidden p-2 rounded-lg hover:bg-primary-50 transition-colors z-50"
                        aria-label="Toggle menu"
                    >
                        <div className="w-6 h-5 flex flex-col justify-between">
                            <span
                                className={`w-full h-0.5 bg-[#366861] rounded-full transition-all duration-300 ${isOpen ? "rotate-45 translate-y-2" : ""}`}
                            />
                            <span
                                className={`w-full h-0.5 bg-[#366861] rounded-full transition-all duration-300 ${isOpen ? "opacity-0" : ""}`}
                            />
                            <span
                                className={`w-full h-0.5 bg-[#366861] rounded-full transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : ""}`}
                            />
                        </div>
                    </button>
                </div>

                {/* Mobile Menu Overlay */}
                <div
                    className={`lg:hidden fixed inset-0 bg-white z-40 transition-transform duration-500 ease-in-out transform ${isOpen ? "translate-x-0" : "translate-x-full"}`}
                >
                    <div className="flex flex-col h-full pt-24 px-6 pb-8">
                        <div className="flex flex-col space-y-2 overflow-y-auto flex-grow">
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
