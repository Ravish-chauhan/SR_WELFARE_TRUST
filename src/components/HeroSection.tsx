"use client";

import Image from "next/image";
import { Heart, Gift, ArrowRight, ShieldCheck, Users, Globe } from "lucide-react";

export default function HeroSection() {
    return (
        <section
            id="home"
            className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center overflow-hidden bg-[#1a3a3a]"
        >
            {/* Full-screen background image with Ken Burns effect */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <Image
                    src="/images/hero-bg1.jpeg"
                    alt="Indian women empowerment - SR Welfare Trust"
                    fill
                    className="object-cover object-[80%_center] sm:object-[95%_center] scale-100"
                    priority
                    sizes="100vw"
                />

                {/* Advanced Multi-layer Overlay System */}
                {/* 1. Deep Primary Overlay (Left to Right) */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#1a3a3a] via-[#1a3a3a]/80 to-transparent z-[1] opacity-85 sm:opacity-100" />

                {/* 2. Soft Bottom Glow (Bottom to Top) */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a3a3a] via-transparent to-transparent opacity-65 sm:opacity-80 z-[2]" />

                {/* 3. Radial Focus for Text Readability */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(26,58,58,0.35)_0%,transparent_70%)] sm:bg-[radial-gradient(circle_at_20%_50%,rgba(26,58,58,0.4)_0%,transparent_70%)] z-[3]" />
            </div>

            {/* Dynamic Decorative Blur Elements */}
            <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] bg-primary/20 rounded-full blur-[120px] animate-pulse z-[4] pointer-events-none" />
            <div className="absolute bottom-[10%] left-[5%] w-[300px] h-[300px] bg-accent/10 rounded-full blur-[100px] animate-pulse delay-1000 z-[4] pointer-events-none" />

            {/* Main Content Area */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-8 pb-20 lg:pt-20 lg:pb-32">
                <div className="max-w-4xl">
                    {/* Massive Impact Headline */}
                    <h1 className="font-[family-name:var(--font-heading)] text-[34px] sm:text-6xl lg:text-[85px] font-bold leading-[1.1] tracking-[0.01em] [word-spacing:0.08em] sm:[word-spacing:normal] text-white mb-8 animate-fade-in-up drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                        Together, <span className="text-accent italic relative">
                            We Can
                        </span>
                        <br className="hidden sm:block" />
                        {" "}Build A Better Future.
                    </h1>

                    {/* Persuasive Subtitle */}
                    <p className="text-sm sm:text-xl text-white/80 leading-relaxed mb-12 max-w-2xl animate-fade-in-up delay-200 opacity-0 font-medium">
                        SR Welfare Trust invites you to be part of a transformative journey,
                        empowering rural women with
                        <span className="text-white font-black"> healthcare, education,</span> and the skills to lead and thrive.
                    </p>

                    {/* Premium Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-center gap-6 animate-fade-in-up delay-[400ms] opacity-0">
                        <a
                            href="#donate"
                            className="group w-full sm:w-auto inline-flex items-center justify-center gap-4 px-12 py-5.5 bg-accent hover:bg-accent-dark text-white font-black text-sm uppercase tracking-[0.15em] rounded-full transition-all duration-500 hover:shadow-[0_25px_60px_-15px_rgba(212,134,142,0.6)] hover:-translate-y-1.5 active:scale-95"
                        >
                            <Gift className="w-6 h-6 group-hover:rotate-12 transition-transform duration-500" />
                            Donate Now
                        </a>
                        <a
                            href="#gallery"
                            className="group w-full sm:w-auto inline-flex items-center justify-center gap-4 px-12 py-5.5 bg-white/5 hover:bg-white/10 backdrop-blur-xl text-white border border-white/20 font-black text-sm uppercase tracking-[0.15em] rounded-full transition-all duration-500 hover:border-white/50 hover:-translate-y-1.5 active:scale-95 shadow-xl"
                        >
                            Explore Impact
                            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-500" />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
