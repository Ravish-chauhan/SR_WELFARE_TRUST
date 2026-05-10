"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
    {
        number: 50000,
        suffix: "+",
        label: "Women Empowered",
        description: "Lives transformed through our programs",
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
        ),
    },
    {
        number: 120,
        suffix: "+",
        label: "Villages Reached",
        description: "Communities across India",
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
        ),
    },
    {
        number: 95,
        suffix: "%",
        label: "Success Rate",
        description: "Program completion rate",
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
        ),
    },
    {
        number: 2500,
        suffix: "+",
        label: "Scholarships Given",
        description: "Educational scholarships awarded",
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            </svg>
        ),
    },
];

function AnimatedCounter({
    target,
    suffix,
    isVisible,
}: {
    target: number;
    suffix: string;
    isVisible: boolean;
}) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!isVisible) return;

        let start = 0;
        const duration = 2000;
        const increment = target / (duration / 16);

        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);

        return () => clearInterval(timer);
    }, [isVisible, target]);

    const formatNumber = (num: number) => {
        if (num >= 1000) {
            return (num / 1000).toFixed(num % 1000 === 0 ? 0 : 0) + "K";
        }
        return num.toString();
    };

    return (
        <span>
            {formatNumber(count)}
            {suffix}
        </span>
    );
}

export default function ImpactSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setIsVisible(true);
            },
            { threshold: 0.2 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section
            id="impact"
            ref={sectionRef}
            className="py-24 lg:py-32 relative overflow-hidden"
        >
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-foreground via-primary-900 to-primary-dark" />
            <div
                className="absolute inset-0 opacity-5"
                style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                    backgroundSize: "32px 32px",
                }}
            />

            {/* Decorative blobs */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <div
                        className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/10 mb-6 transition-all duration-700 ${isVisible
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-4"
                            }`}
                    >
                        <span className="text-sm font-medium text-primary-200">
                            Our Impact
                        </span>
                    </div>

                    <h2
                        className={`font-[family-name:var(--font-heading)] text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4 transition-all duration-700 delay-200 ${isVisible
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-4"
                            }`}
                    >
                        Numbers That Tell{" "}
                        <span className="text-primary-300">Our Story</span>
                    </h2>

                    <div className="w-20 h-0.5 bg-gradient-to-r from-primary-300 to-accent mx-auto mb-6" />

                    <p
                        className={`max-w-2xl mx-auto text-lg text-white/60 transition-all duration-700 delay-300 ${isVisible
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-4"
                            }`}
                    >
                        Every number represents a life changed, a dream nurtured, and a
                        community transformed.
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, i) => (
                        <div
                            key={i}
                            className={`group relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-primary-400/30 hover:bg-white/10 transition-all duration-500 text-center ${isVisible
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 translate-y-8"
                                }`}
                            style={{
                                transitionDelay: isVisible ? `${i * 150 + 400}ms` : "0ms",
                            }}
                        >
                            {/* Icon */}
                            <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center mb-5 text-primary-300 group-hover:scale-110 transition-transform duration-300">
                                {stat.icon}
                            </div>

                            {/* Number */}
                            <div className="text-4xl lg:text-5xl font-bold text-white font-[family-name:var(--font-heading)] mb-2">
                                <AnimatedCounter
                                    target={stat.number}
                                    suffix={stat.suffix}
                                    isVisible={isVisible}
                                />
                            </div>

                            {/* Label */}
                            <div className="text-base font-semibold text-white/80 mb-1">
                                {stat.label}
                            </div>

                            <div className="text-sm text-white/40">{stat.description}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
