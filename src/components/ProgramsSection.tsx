"use client";

import { useEffect, useRef, useState } from "react";

const programs = [
    {
        icon: (
            <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
            </svg>
        ),
        title: "Education & Literacy",
        description:
            "Providing quality education and literacy programs to women and girls, from basic literacy to higher education scholarships.",
        color: "from-rose-500 to-pink-600",
        bgColor: "bg-rose-50",
        stats: "12,000+ enrolled",
    },
    {
        icon: (
            <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
            </svg>
        ),
        title: "Healthcare & Wellness",
        description:
            "Ensuring access to quality healthcare, maternal care, mental health support, and nutrition programs for women.",
        color: "from-purple-500 to-violet-600",
        bgColor: "bg-purple-50",
        stats: "30,000+ treated",
    },
    {
        icon: (
            <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
            </svg>
        ),
        title: "Skill Development",
        description:
            "Training in vocational skills, digital literacy, entrepreneurship, and financial management for economic independence.",
        color: "from-amber-500 to-orange-600",
        bgColor: "bg-amber-50",
        stats: "8,500+ trained",
    },
    {
        icon: (
            <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                />
            </svg>
        ),
        title: "Legal Aid & Rights",
        description:
            "Providing legal awareness, counseling, and support to women facing domestic violence, discrimination, and injustice.",
        color: "from-teal-500 to-emerald-600",
        bgColor: "bg-teal-50",
        stats: "5,000+ cases",
    },
    {
        icon: (
            <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
            </svg>
        ),
        title: "Self-Help Groups",
        description:
            "Organizing women into self-help groups for mutual support, collective savings, micro-loans, and community leadership.",
        color: "from-blue-500 to-indigo-600",
        bgColor: "bg-blue-50",
        stats: "450+ groups",
    },
    {
        icon: (
            <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
            </svg>
        ),
        title: "Leadership Programs",
        description:
            "Nurturing the next generation of women leaders through mentorship, leadership camps, and civic engagement programs.",
        color: "from-pink-500 to-rose-600",
        bgColor: "bg-pink-50",
        stats: "2,000+ leaders",
    },
];

export default function ProgramsSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setIsVisible(true);
            },
            { threshold: 0.1 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section
            id="programs"
            ref={sectionRef}
            className="py-24 lg:py-32 bg-surface-warm relative"
        >
            {/* Top decorative */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-200 to-transparent" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <div
                        className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 border border-primary-100 mb-6 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                            }`}
                    >
                        <span className="text-sm font-medium text-primary-700">
                            What We Do
                        </span>
                    </div>

                    <h2
                        className={`font-[family-name:var(--font-heading)] text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-4 transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                            }`}
                    >
                        Our <span className="gradient-text">Programs</span> &
                        Initiatives
                    </h2>

                    <div className="section-divider mx-auto mb-6" />

                    <p
                        className={`max-w-2xl mx-auto text-lg text-text-secondary transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                            }`}
                    >
                        Comprehensive programs designed to uplift women at every stage
                        of life, creating pathways to independence and leadership.
                    </p>
                </div>

                {/* Programs Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {programs.map((program, i) => (
                        <div
                            key={i}
                            className={`group relative bg-white rounded-2xl p-7 border border-border-light hover:border-primary-200 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/5 ${isVisible
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 translate-y-8"
                                }`}
                            style={{
                                transitionDelay: isVisible ? `${i * 100 + 400}ms` : "0ms",
                            }}
                        >
                            {/* Icon */}
                            <div
                                className={`w-14 h-14 rounded-2xl ${program.bgColor} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
                            >
                                <div
                                    className={`bg-gradient-to-br ${program.color} bg-clip-text text-transparent`}
                                >
                                    {program.icon}
                                </div>
                            </div>

                            {/* Content */}
                            <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                                {program.title}
                            </h3>
                            <p className="text-sm text-text-secondary leading-relaxed mb-4">
                                {program.description}
                            </p>

                            {/* Stats badge */}
                            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary-50 text-xs font-semibold text-primary-700">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                                {program.stats}
                            </div>

                            {/* Hover accent line */}
                            <div className="absolute bottom-0 left-7 right-7 h-0.5 bg-gradient-to-r from-primary to-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-full" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
