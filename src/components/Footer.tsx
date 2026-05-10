"use client";

import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Twitter, Youtube, Mail, MapPin, Phone, Heart } from "lucide-react";

const footerLinks = {
    "Quick Links": [
        { name: "Home", href: "#home" },
        { name: "About Us", href: "#about" },
        { name: "Programs", href: "#programs" },
        { name: "Impact", href: "#impact" },
        { name: "Contact", href: "#contact" },
    ],
    Programs: [
        { name: "Education", href: "#programs" },
        { name: "Healthcare", href: "#programs" },
        { name: "Skill Development", href: "#programs" },
        { name: "Legal Aid", href: "#programs" },
        { name: "Social Reform", href: "#programs" },
    ],
    "Support Us": [
        { name: "Donate Now", href: "#donate" },
        { name: "Partner With Us", href: "#contact" },
        { name: "Join Campaign", href: "#contact" },
        { name: "Tax Exemption", href: "#donate" },
    ],
};

const socialIcons = [
    { icon: <Facebook className="w-5 h-5" />, href: "#" },
    { icon: <Instagram className="w-5 h-5" />, href: "#" },
    { icon: <Twitter className="w-5 h-5" />, href: "#" },
    { icon: <Youtube className="w-5 h-5" />, href: "#" },
];

export default function Footer() {
    return (
        <footer className="bg-[#1a3a3a] text-white relative overflow-hidden pt-24 pb-12">
            {/* Background Pattern Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`, backgroundSize: "40px 40px" }} />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Upper Footer - Branding & Links */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-y-16 lg:gap-x-12 mb-20">

                    {/* Brand Section */}
                    <div className="lg:col-span-2 max-w-sm">
                        <Link href="#home" className="flex items-center mb-8">
                            <div className="relative flex flex-col items-center">
                                <Image
                                    src="/logo2.svg"
                                    alt="SR Welfare Trust Logo"
                                    width={120}
                                    height={120}
                                    className="h-28 w-auto brightness-0 invert scale-125 -ml-10"
                                />
                                <div className="text-white font-[family-name:var(--font-heading)] font-black text-2xl tracking-[0.1em] mt-2">
                                    SR WELFARE <span className="text-accent underline decoration-white/20 underline-offset-4">TRUST</span>
                                </div>
                            </div>
                        </Link>
                        <p className="text-white/60 leading-relaxed text-sm mb-10 pr-10">
                            Empowering women across rural India through dedicated healthcare,
                            quality education, and sustainable skill development. Join our mission
                            to build a brighter, more equitable future today.
                        </p>

                        {/* Social Row */}
                        <div className="flex items-center gap-4">
                            {socialIcons.map((social, i) => (
                                <a
                                    key={i}
                                    href={social.href}
                                    className="w-11 h-11 rounded-2xl bg-white/5 hover:bg-accent hover:shadow-[0_10px_30px_-5px_rgba(212,134,142,0.6)] text-white/50 hover:text-white flex items-center justify-center transition-all duration-300 border border-white/10 hover:border-transparent"
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links Navigation */}
                    {Object.entries(footerLinks).map(([title, links]) => (
                        <div key={title}>
                            <h4 className="text-sm font-black text-white uppercase tracking-[0.2em] mb-8 relative inline-block">
                                {title}
                                <span className="absolute -bottom-2 left-0 w-8 h-[2px] bg-accent" />
                            </h4>
                            <ul className="space-y-4">
                                {links.map((link, i) => (
                                    <li key={i}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-white/40 hover:text-accent hover:translate-x-1 inline-block transition-all duration-300 font-medium tracking-wide"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Newsletter / Contact Quick Links Bar */}
                <div className="grid md:grid-cols-3 gap-8 p-10 bg-white/5 rounded-[40px] border border-white/10 mb-20 backdrop-blur-sm">
                    <div className="flex items-center gap-5">
                        <div className="w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center border border-accent/20">
                            <MapPin className="text-accent w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-[10px] uppercase font-black tracking-widest text-white/40">Location</p>
                            <p className="text-sm font-bold text-white/80">Village Address, India</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-5 border-y md:border-y-0 md:border-x border-white/10 py-6 md:py-0 md:px-8">
                        <div className="w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center border border-accent/20">
                            <Phone className="text-accent w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-[10px] uppercase font-black tracking-widest text-white/40">Helpline</p>
                            <a href="tel:+91XXXXXXXXXX" className="text-sm font-bold text-white/80 hover:text-accent transition-colors">+91 12345 67890</a>
                        </div>
                    </div>
                    <div className="flex items-center gap-5">
                        <div className="w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center border border-accent/20">
                            <Mail className="text-accent w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-[10px] uppercase font-black tracking-widest text-white/40">Email Us</p>
                            <a href="mailto:info@srwelfaretrust.org" className="text-sm font-bold text-white/80 hover:text-accent transition-colors">info@srwelfare.org</a>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 pt-12 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-center gap-3 bg-white/5 px-6 py-2.5 rounded-full border border-white/10">
                        <Heart className="w-4 h-4 text-accent animate-pulse" />
                        <p className="text-xs font-bold text-white/50 tracking-wide uppercase">
                            Made with love for the world
                        </p>
                    </div>

                    <p className="text-xs text-white/30 font-bold uppercase tracking-[0.2em]">
                        © 2025 SR WELFARE TRUST. Registered Charity.
                    </p>

                    <div className="flex items-center gap-8 text-[11px] font-black uppercase text-white/30 tracking-widest">
                        <a href="#" className="hover:text-accent transition-colors">Privacy</a>
                        <a href="#" className="hover:text-accent transition-colors">Tax Info</a>
                        <a href="#" className="hover:text-accent transition-colors">Legal</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
