"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";

const causes = [
    {
        title: "Women Health Awareness",
        description:
            "Organizing health camps and awareness drives to ensure every woman has access to quality healthcare and preventive medical support.",
        image: "/images/cause-health.png",
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
            </svg>
        ),
        accent: "from-rose-500/80 to-pink-600/80",
        iconBg: "bg-rose-500/20",
        iconColor: "text-rose-400",
        badgeColor: "bg-rose-500/10 text-rose-400 border-rose-500/20",
        detailContent: {
            highlights: [
                "Free health check-ups for women in rural areas",
                "Menstrual hygiene awareness and sanitary pad distribution",
                "Maternal health and pre/post-natal care guidance",
                "Cancer screening and early detection camps",
                "Mental health counseling and support groups",
            ],
            fullDescription:
                "Our Women Health Awareness initiative is at the heart of everything we do. We believe that a healthy woman builds a healthy family, and a healthy family builds a strong community. Through regular health camps conducted across 120+ villages, we provide free medical check-ups, diagnostic screenings, and essential medicines to women who otherwise have no access to quality healthcare. Our trained community health workers educate women about preventive care, nutrition, reproductive health, and hygiene practices. We have successfully screened over 15,000 women for various health conditions and facilitated treatment for those in need.",
            impact: "15,000+ women screened, 120+ villages covered",
        },
    },
    {
        title: "Education & Safety",
        description:
            "Empowering children through quality education, safety awareness programs, and recognizing young achievers who inspire their communities.",
        image: "/images/cause-education-v2.png",
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 14l9-5-9-5-9 5 9 5z"
                />
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                />
            </svg>
        ),
        accent: "from-blue-500/80 to-indigo-600/80",
        iconBg: "bg-blue-500/20",
        iconColor: "text-blue-400",
        badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
        detailContent: {
            highlights: [
                "Scholarship programs for underprivileged children",
                "After-school tutoring and mentorship initiatives",
                "Safety awareness workshops in schools",
                "Annual academic competitions and award ceremonies",
                "Digital literacy and computer education programs",
            ],
            fullDescription:
                "Education is the most powerful weapon to change the world. Our Education & Safety programs focus on ensuring every child, regardless of their socio-economic background, has access to quality learning opportunities. We run after-school tutoring centers, provide scholarships, distribute learning materials, and organize annual competitions that motivate children to excel. Our safety awareness workshops teach children about personal safety, road safety, cyber safety, and good-touch/bad-touch awareness. We have awarded over 2,500 scholarships and positively impacted the lives of more than 10,000 children across multiple districts.",
            impact: "2,500+ scholarships, 10,000+ children impacted",
        },
    },
    {
        title: "SHG & Financial Support",
        description:
            "Establishing Self Help Groups to promote financial independence, micro-savings, and entrepreneurship among rural women.",
        image: "/images/cause-shg.png",
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                />
            </svg>
        ),
        accent: "from-emerald-500/80 to-teal-600/80",
        iconBg: "bg-emerald-500/20",
        iconColor: "text-emerald-400",
        badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
        detailContent: {
            highlights: [
                "Formation and training of Self Help Groups",
                "Micro-finance and savings programs",
                "Entrepreneurship development workshops",
                "Linkage with banks and government schemes",
                "Financial literacy and bookkeeping training",
            ],
            fullDescription:
                "Our Self Help Group (SHG) initiative empowers rural women to become financially independent through collective savings, micro-credit, and entrepreneurial ventures. We facilitate the formation of SHGs, train members in financial management, and link them with banking institutions and government welfare schemes. Women who once had no income of their own are now running small businesses, managing savings accounts, and contributing to their household income. Our SHGs have collectively saved lakhs of rupees and have become a model for community-driven economic development.",
            impact: "200+ SHGs formed, 3,000+ women members",
        },
    },
    {
        title: "Skill & Livelihood",
        description:
            "Providing vocational training in tailoring, handicrafts, and other trades to build sustainable livelihoods for women and youth.",
        image: "/images/cause-skill.png",
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
            </svg>
        ),
        accent: "from-amber-500/80 to-orange-600/80",
        iconBg: "bg-amber-500/20",
        iconColor: "text-amber-400",
        badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
        detailContent: {
            highlights: [
                "Tailoring and garment-making courses",
                "Handicraft and handloom training",
                "Beauty and wellness skill development",
                "Food processing and preservation workshops",
                "Market linkage and product sales support",
            ],
            fullDescription:
                "Our Skill & Livelihood program equips women and youth with practical vocational skills that open doors to sustainable income. We run training centers offering courses in tailoring, handicrafts, embroidery, handloom weaving, beauty services, and food processing. Each program is designed to be hands-on, with expert trainers guiding participants from basic skills to market-ready proficiency. Graduates receive tool kits and are connected to local markets, exhibitions, and online platforms to sell their products. Many of our trainees have gone on to start their own micro-enterprises and become financially self-reliant.",
            impact: "5,000+ women trained, 800+ micro-enterprises started",
        },
    },
];

/* ─── Modal Component ─── */
function CauseModal({
    cause,
    onClose,
}: {
    cause: (typeof causes)[number];
    onClose: () => void;
}) {
    const modalRef = useRef<HTMLDivElement>(null);

    // Close on Escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handleKeyDown);
        // Lock body scroll
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "";
        };
    }, [onClose]);

    // Click outside to close
    const handleBackdropClick = (e: React.MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 animate-modal-backdrop-in"
            onClick={handleBackdropClick}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

            {/* Modal */}
            <div
                ref={modalRef}
                className="relative z-10 w-full max-w-2xl max-h-[90vh] rounded-2xl overflow-hidden animate-modal-in"
                style={{
                    background: "#fffdf9",
                    border: "1px solid var(--border)",
                    boxShadow:
                        "0 25px 60px rgba(0,0,0,0.2), 0 0 40px rgba(43,122,120,0.08)",
                }}
            >
                {/* Scrollable Content */}
                <div className="overflow-y-auto max-h-[90vh] custom-scrollbar">
                    {/* Hero Image */}
                    <div className="relative w-full h-64 sm:h-80">
                        <Image
                            src={cause.image}
                            alt={cause.title}
                            fill
                            className="object-cover"
                            priority
                        />
                        {/* Soft bottom fade into content */}
                        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#fffdf9] to-transparent" />

                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 w-10 h-10 rounded-full backdrop-blur-md flex items-center justify-center transition-all duration-200 cursor-pointer"
                            style={{
                                background: "rgba(255,255,255,0.85)",
                                border: "1px solid var(--border-light)",
                                color: "var(--foreground)",
                                boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                            }}
                            aria-label="Close"
                        >
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>

                        {/* Icon badge on image */}
                        <div
                            className="absolute bottom-6 left-6 w-14 h-14 rounded-2xl backdrop-blur-md flex items-center justify-center"
                            style={{
                                background: "rgba(255,255,255,0.9)",
                                border: "1px solid var(--border-light)",
                                color: "var(--primary)",
                                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                            }}
                        >
                            {cause.icon}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 sm:p-8 pt-4 sm:pt-5">
                        {/* Title */}
                        <h3
                            className="font-[family-name:var(--font-heading)] text-2xl sm:text-3xl font-bold mb-2"
                            style={{ color: "var(--foreground)" }}
                        >
                            {cause.title}
                        </h3>

                        {/* Impact badge */}
                        <div
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6"
                            style={{
                                background: "var(--primary-50)",
                                color: "var(--primary-dark)",
                                border: "1px solid var(--primary-100)",
                            }}
                        >
                            <svg
                                className="w-3.5 h-3.5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                                />
                            </svg>
                            {cause.detailContent.impact}
                        </div>

                        {/* Full description */}
                        <p
                            className="text-sm sm:text-base leading-relaxed mb-8"
                            style={{ color: "var(--text-secondary)" }}
                        >
                            {cause.detailContent.fullDescription}
                        </p>

                        {/* Key highlights */}
                        <div className="mb-6">
                            <h4
                                className="text-xs font-bold uppercase tracking-widest mb-4"
                                style={{ color: "var(--primary)" }}
                            >
                                Key Highlights
                            </h4>
                            <div className="space-y-3">
                                {cause.detailContent.highlights.map(
                                    (item, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-start gap-3"
                                        >
                                            <div
                                                className="mt-1 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                                                style={{
                                                    background: "var(--primary-50)",
                                                }}
                                            >
                                                <svg
                                                    className="w-3 h-3"
                                                    fill="none"
                                                    stroke="var(--primary)"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={3}
                                                        d="M5 13l4 4L19 7"
                                                    />
                                                </svg>
                                            </div>
                                            <span
                                                className="text-sm"
                                                style={{ color: "var(--text-muted)" }}
                                            >
                                                {item}
                                            </span>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>

                        {/* CTA */}
                        <div
                            className="pt-4"
                            style={{ borderTop: "1px solid var(--border-light)" }}
                        >
                            <a
                                href="#contact"
                                onClick={onClose}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white text-sm font-bold uppercase tracking-wider rounded-lg hover:bg-primary-light transition-colors duration-300"
                            >
                                Get Involved
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                                    />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ─── Main Section ─── */
export default function KeyCausesSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [activeCause, setActiveCause] = useState<number | null>(null);

    const closeModal = useCallback(() => setActiveCause(null), []);

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
        <>
            <section
                id="causes"
                ref={sectionRef}
                className="pt-24 lg:pt-32 pb-28 sm:pb-34 lg:pb-44 relative overflow-hidden"
                style={{ background: "linear-gradient(180deg, #fdf8f0 0%, #fefcf7 40%, #faf5eb 100%)" }}
            >
                {/* Subtle speckle/noise texture */}
                <div
                    className="absolute inset-0 opacity-[0.4]"
                    style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, #d4c5a0 0.4px, transparent 0)`,
                        backgroundSize: "28px 28px",
                    }}
                />

                {/* ─── Decorative Heart Background (top-left) ─── */}
                <div
                    className={`absolute top-0 left-0 pointer-events-none transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-12"}`}
                    style={{
                        zIndex: 1,
                        width: "clamp(160px, 28vw, 350px)",
                        height: "auto",
                    }}
                >
                    <img
                        src="/images/heart-bg.svg"
                        alt=""
                        aria-hidden="true"
                        style={{
                            width: "100%",
                            height: "auto",
                            display: "block",
                            transform: "translateX(-5%) translateY(-30%)",
                        }}
                    />
                </div>


                {/* ─── Decorative Hand Background (bottom-right, behind cards) ─── */}
                <div
                    className={`absolute bottom-0 right-0 pointer-events-none transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
                    style={{
                        zIndex: 1,
                        width: "clamp(220px, 34vw, 400px)",
                        height: "auto",
                    }}
                >
                    <img
                        src="/images/hand-bg.svg"
                        alt=""
                        aria-hidden="true"
                        style={{
                            width: "100%",
                            height: "auto",
                            display: "block",
                            transform: "translateX(15%) translateY(40%)",
                        }}
                    />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Section Header */}
                    <div className="text-center mb-16 lg:mb-20">
                        {/* Script-style subtitle */}
                        <p
                            className={`text-lg sm:text-xl mb-3 transition-all duration-700 ${isVisible
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-4"
                                }`}
                            style={{
                                fontFamily: "'Dancing Script', cursive",
                                fontStyle: "italic",
                                color: "var(--primary)",
                                letterSpacing: "0.5px",
                            }}
                        >
                            Our Best Features
                        </p>

                        <h2
                            className={`font-[family-name:var(--font-heading)] text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6 transition-all duration-700 delay-200 ${isVisible
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-4"
                                }`}
                            style={{ color: "var(--foreground)" }}
                        >
                            We&apos;re Charitable Group
                            <br />
                            That{" "}
                            <span style={{ color: "var(--primary)" }}>
                                Improves Lives
                            </span>
                        </h2>

                        {/* Decorative divider with dot */}
                        <div
                            className={`flex items-center justify-center gap-1 mb-6 transition-all duration-700 delay-300 ${isVisible ? "opacity-100" : "opacity-0"}`}
                        >
                            <div className="w-8 h-[2px] rounded-full" style={{ background: "var(--primary)" }} />
                            <div className="w-2 h-2 rounded-full" style={{ background: "var(--primary)" }} />
                            <div className="w-8 h-[2px] rounded-full" style={{ background: "var(--primary)" }} />
                        </div>
                    </div>

                    {/* Cards Grid */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7">
                        {causes.map((cause, i) => (
                            <div
                                key={i}
                                onClick={() => setActiveCause(i)}
                                className={`group relative rounded-2xl overflow-hidden transition-all duration-700 cursor-pointer hover:-translate-y-2 ${isVisible
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 translate-y-12"
                                    }`}
                                style={{
                                    transitionDelay: isVisible
                                        ? `${i * 150 + 400}ms`
                                        : "0ms",
                                    background: "#ffffff",
                                    boxShadow: "0 4px 24px rgba(43, 122, 120, 0.08), 0 1px 3px rgba(0,0,0,0.04)",
                                    border: "1px solid var(--border-light)",
                                }}
                            >
                                {/* Hover shadow upgrade */}
                                <div
                                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                    style={{
                                        boxShadow: "0 12px 40px rgba(43, 122, 120, 0.15), 0 4px 12px rgba(0,0,0,0.06)",
                                    }}
                                />

                                <div className="relative z-10">
                                    {/* Image — clear, no overlay */}
                                    <div className="relative h-44 sm:h-48 overflow-hidden">
                                        <Image
                                            src={cause.image}
                                            alt={cause.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        />

                                        {/* Floating icon badge */}
                                        <div
                                            className="absolute top-4 right-4 w-10 h-10 rounded-xl backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                                            style={{
                                                background: "rgba(255,255,255,0.85)",
                                                border: "1px solid rgba(255,255,255,0.9)",
                                                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                                                color: "var(--primary)",
                                            }}
                                        >
                                            {cause.icon}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-5 pt-4">
                                        <h3
                                            className="font-[family-name:var(--font-heading)] text-lg font-bold mb-2 group-hover:text-primary transition-colors duration-300"
                                            style={{ color: "var(--foreground)" }}
                                        >
                                            {cause.title}
                                        </h3>
                                        <p
                                            className="text-sm leading-relaxed"
                                            style={{ color: "var(--text-muted)" }}
                                        >
                                            {cause.description}
                                        </p>

                                        {/* Learn more link */}
                                        <div
                                            className="mt-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider opacity-100 translate-y-0 lg:opacity-0 lg:translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
                                            style={{ color: "var(--primary)" }}
                                        >
                                            <span>Learn More</span>
                                            <svg
                                                className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Modal */}
            {activeCause !== null && (
                <CauseModal
                    cause={causes[activeCause]}
                    onClose={closeModal}
                />
            )}
        </>
    );
}
