"use client";

import { useEffect, useRef, useState } from "react";
import { Heart, Gift, ArrowRight } from "lucide-react";

export default function CTASection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
            { threshold: 0.2 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="py-20 lg:py-28 relative overflow-hidden"
            style={{ background: "linear-gradient(180deg, #1a3a3a 0%, #1e4544 50%, #1a3a3a 100%)" }}
        >
            {/* Subtle noise */}
            <div
                className="absolute inset-0 opacity-[0.04] pointer-events-none"
                style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 0.4px, transparent 0)`,
                    backgroundSize: "28px 28px",
                }}
            />

            <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                    {/* Two-column layout */}
                    <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center">
                        {/* Left Content */}
                        <div className="lg:col-span-3">
                            <p
                                className="text-base sm:text-lg mb-3"
                                style={{
                                    fontFamily: "'Dancing Script', cursive",
                                    fontStyle: "italic",
                                    color: "var(--accent)",
                                }}
                            >
                                Be the change
                            </p>
                            <h2 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
                                Your support can change
                                <span className="text-primary-300"> someone&apos;s life</span> today.
                            </h2>
                            <p className="text-white/45 text-base sm:text-lg leading-relaxed max-w-xl mb-10">
                                Every contribution — big or small — goes directly towards empowering rural women with healthcare, education, and livelihood skills. Join hundreds of supporters who believe in building a better future.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <a
                                    href="#donate"
                                    className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-accent hover:bg-accent-dark text-white font-bold rounded-full transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/30 text-sm uppercase tracking-wider"
                                >
                                    <Gift className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                                    Donate Now
                                </a>
                                <a
                                    href="#contact"
                                    className="group inline-flex items-center justify-center gap-3 px-8 py-4 text-white font-bold rounded-full border border-white/15 hover:border-white/30 hover:bg-white/5 transition-all duration-300 text-sm uppercase tracking-wider"
                                >
                                    Volunteer With Us
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </a>
                            </div>
                        </div>

                        {/* Right — Trust indicators */}
                        <div className="lg:col-span-2">
                            <div className="space-y-5">
                                {[
                                    {
                                        number: "100%",
                                        label: "Transparent",
                                        desc: "Every rupee is accounted for and reported publicly.",
                                    },
                                    {
                                        number: "80G",
                                        label: "Tax Exempt",
                                        desc: "All donations qualify for tax benefits under 80G.",
                                    },
                                    {
                                        number: "50+",
                                        label: "Villages Reached",
                                        desc: "Active programs across rural communities.",
                                    },
                                ].map((item, i) => (
                                    <div
                                        key={i}
                                        className={`p-5 rounded-2xl bg-white/[0.04] border border-white/[0.06] transition-all duration-700 ${
                                            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                                        }`}
                                        style={{ transitionDelay: isVisible ? `${(i + 1) * 200}ms` : "0ms" }}
                                    >
                                        <div className="flex items-start gap-4">
                                            <span className="text-2xl sm:text-3xl font-bold text-primary-300 font-[family-name:var(--font-heading)] leading-none shrink-0 w-16">
                                                {item.number}
                                            </span>
                                            <div>
                                                <p className="text-white font-semibold text-sm mb-0.5">{item.label}</p>
                                                <p className="text-white/35 text-xs leading-relaxed">{item.desc}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
