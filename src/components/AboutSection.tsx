"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function AboutSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setIsVisible(true);
            },
            { threshold: 0.15 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <>
            <section id="about" ref={sectionRef} className="pt-12 pb-10 lg:py-28 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-10 lg:gap-24 items-center">

                        <div className={`order-1 lg:order-1 relative lg:mt-8 flex justify-center lg:block transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}>
                            <div className="relative w-full max-w-[500px] aspect-[0.9/1] lg:ml-0 mb-[-20px] lg:mb-0">

                                {/* Vertical Teal Bar */}
                                <div className="absolute top-0 left-[8%] sm:left-6 w-5 h-[60%] bg-primary z-0" />

                                {/* Main Top-Right Image */}
                                <div className="absolute top-0 right-[5%] sm:right-0 w-[85%] h-[75%] z-10 overflow-hidden shadow-2xl shadow-black/10">
                                    <Image
                                        src="/images/about-img1.jpeg"
                                        alt="Care"
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                </div>

                                {/* Bottom-Left Overlapping Image */}
                                <div className="absolute bottom-14 left-[2%] sm:left-4 w-[45%] h-[44%] z-20 border-[8px] border-white overflow-hidden shadow-xl">
                                    <Image
                                        src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&h=600&fit=crop"
                                        alt="Support"
                                        fill
                                        className="object-cover"
                                    />
                                </div>

                                {/* "Helping Today" Handwritten Text & Icon (Bottom Right) */}
                                <div className="absolute bottom-[14%] right-[1%] sm:right-[-5%] lg:right-[-12%] xl:right-[-2%] flex flex-col items-center gap-1 z-30">
                                    <div className="flex items-baseline gap-2 text-primary">
                                        <span className="font-[family-name:var(--font-heading)] text-2xl sm:text-3xl font-bold lowercase italic tracking-tight drop-shadow-sm">
                                            #Helping Today
                                        </span>
                                        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                            <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ===== RIGHT — Text Content ===== */}
                        <div className={`order-2 lg:order-2 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`}>

                            {/* Section label */}
                            <div className="flex items-center gap-3 mb-4">
                                <span className="w-10 h-[1px] bg-primary"></span>
                                <p className="text-primary font-bold text-sm uppercase tracking-widest">
                                    About Our NGO
                                </p>
                            </div>

                            {/* Heading */}
                            <h2 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-[1.1] mb-8">
                                Helping Today for a <span className="text-primary">Better Tomorrow</span>
                            </h2>

                            {/* Description */}
                            <div className="space-y-6 mb-10 text-text-secondary text-[16px] leading-relaxed">
                                <p>
                                    SR Welfare Trust is dedicated to the empowerment of women and children
                                    through sustainable development. We provide the tools and resources
                                    necessary for communities to lift themselves out of poverty.
                                </p>
                                <p>
                                    Our mission is to create a world where every individual has the
                                    opportunity to achieve their full potential. Join us in our journey
                                    of compassion and change.
                                </p>
                            </div>

                            {/* Feature List */}
                            <div className="grid sm:grid-cols-2 gap-y-4 mb-12">
                                {[
                                    "Woman Empowerment",
                                    "Child Education",
                                    "Healthcare Support",
                                    "Skill Development",
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-3">
                                        <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <span className="font-bold text-foreground text-sm">{item}</span>
                                    </div>
                                ))}
                            </div>

                            {/* CTA row */}
                            <div className="flex flex-wrap items-center gap-8">
                                {/* Phone */}
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-primary">
                                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-text-muted uppercase font-bold tracking-widest">Call Us Anytime</p>
                                        <p className="text-base font-bold text-foreground">+91 89202 33946</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* ===== Stats bar ===== */}
            <div className="bg-white border-t border-border-light">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border-light">
                        {[
                            { number: "326", label: "Total Campaigns" },
                            { number: "25", label: "Total Fund Raised" },
                            { number: "125", label: "Happy Volunteers" },
                            { number: "15", label: "Years of Fund Raising" },
                        ].map((stat, i) => (
                            <div key={i} className="py-8 px-6 text-center">
                                <div className="text-3xl sm:text-4xl font-bold text-foreground font-[family-name:var(--font-heading)]">
                                    {stat.number}
                                </div>
                                <div className="text-xs text-text-muted mt-1 uppercase tracking-wider">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
