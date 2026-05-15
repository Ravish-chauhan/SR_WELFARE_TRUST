"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

/* ─── Event Data ─── */
const events = [
    {
        id: 1,
        title: "Silai Competition",
        subtitle: "Showcasing Tailoring Excellence",
        description:
            "Our annual tailoring competition brings together women from across villages to showcase their stitching skills. From intricate embroidery to modern garment designs, participants compete for recognition and prizes that celebrate their craftsmanship and creativity.",
        highlights: [
            "200+ participants annually",
            "Expert jury panel",
            "Cash prizes & sewing kits",
        ],
        image: "/images/cause-skill.png",
    },
    {
        id: 2,
        title: "Makeup & Beauty Classes",
        subtitle: "Building Confidence & Careers",
        description:
            "Professional makeup and beauty training workshops empower women with marketable skills. Our certified trainers teach everything from basic grooming to advanced bridal makeup, opening doors to entrepreneurship and self-employment.",
        highlights: [
            "Professional trainers",
            "Certification provided",
            "Business mentoring",
        ],
        image: "/images/cause-makeup.png",
    },
    {
        id: 3,
        title: "Health Awareness Camps",
        subtitle: "Healthcare at Your Doorstep",
        description:
            "Free health camps organized across rural communities provide essential medical check-ups, diagnostics, and health education. Our camps focus on women's health, preventive care, and connecting patients with specialist treatment when needed.",
        highlights: [
            "Free medical check-ups",
            "Medicine distribution",
            "Specialist referrals",
        ],
        image: "/images/cause-health.png",
    },
    {
        id: 4,
        title: "SHG Meetings & Training",
        subtitle: "Strength in Unity",
        description:
            "Regular Self Help Group meetings foster financial literacy, collective savings, and community bonding. Women learn bookkeeping, micro-finance management, and develop entrepreneurial skills to build sustainable livelihoods for their families.",
        highlights: [
            "Financial literacy",
            "Savings programs",
            "Loan facilitation",
        ],
        image: "/images/cause-shg.png",
    },
];

/* ─── Main Component ─── */
export default function EventsSection() {
    const container = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    useGSAP(
        () => {
            const cards = cardRefs.current.filter(
                (el): el is HTMLDivElement => el !== null
            );
            const totalCards = cards.length;
            if (totalCards === 0) return;

            gsap.set(cards[0], { y: "0%", scale: 1, force3D: true });
            for (let i = 1; i < totalCards; i++) {
                gsap.set(cards[i], { y: "100%", scale: 1, force3D: true });
            }

            const scrollTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: ".events-sticky-cards",
                    start: "top 20px",
                    end: `+=${window.innerHeight * (totalCards - 1)}`,
                    pin: true,
                    scrub: 1.5,
                    pinSpacing: true,
                    anticipatePin: 1,
                },
            });

            for (let i = 0; i < totalCards - 1; i++) {
                const currentCard = cards[i];
                const nextCard = cards[i + 1];
                if (!currentCard || !nextCard) continue;

                scrollTimeline.to(
                    currentCard,
                    { scale: 0.9, duration: 1, ease: "power1.inOut", force3D: true },
                    i
                );
                scrollTimeline.to(
                    nextCard,
                    { y: "0%", duration: 1, ease: "power1.inOut", force3D: true },
                    i
                );
            }

            let resizeTimer: ReturnType<typeof setTimeout>;
            const resizeObserver = new ResizeObserver(() => {
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(() => {
                    ScrollTrigger.refresh();
                }, 200);
            });
            if (container.current) resizeObserver.observe(container.current);

            return () => {
                clearTimeout(resizeTimer);
                resizeObserver.disconnect();
                scrollTimeline.scrollTrigger?.kill();
                scrollTimeline.kill();
            };
        },
        { scope: container }
    );

    return (
        <section
            id="events"
            className="relative overflow-hidden"
            style={{
                background:
                    "linear-gradient(180deg, #1a3a3a 0%, #1e4544 40%, #1a3a3a 100%)",
            }}
        >
            {/* Subtle texture overlay */}
            <div
                className="absolute inset-0 opacity-[0.06] pointer-events-none"
                style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 0.4px, transparent 0)`,
                    backgroundSize: "28px 28px",
                }}
            />

            {/* Decorative glow blobs */}
            <div
                className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
                style={{
                    background:
                        "radial-gradient(circle, rgba(43,122,120,0.12) 0%, transparent 70%)",
                    filter: "blur(80px)",
                }}
            />
            <div
                className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
                style={{
                    background:
                        "radial-gradient(circle, rgba(212,134,142,0.08) 0%, transparent 70%)",
                    filter: "blur(60px)",
                }}
            />

            {/* ─── Section Header ─── */}
            <div className="relative z-10 pt-24 lg:pt-32 pb-12 lg:pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p
                        className="text-lg sm:text-xl mb-3"
                        style={{
                            fontFamily: "'Dancing Script', cursive",
                            fontStyle: "italic",
                            color: "var(--primary-300)",
                            letterSpacing: "0.5px",
                        }}
                    >
                        What We Do
                    </p>

                    <h2
                        className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6"
                        style={{ color: "#f0f8f7" }}
                    >
                        Our Programs &{" "}
                        <span style={{ color: "var(--primary-300)" }}>
                            Activities
                        </span>
                    </h2>

                    <div className="flex items-center justify-center gap-1 mb-6">
                        <div
                            className="w-8 h-[2px] rounded-full"
                            style={{ background: "var(--primary-400)" }}
                        />
                        <div
                            className="w-2 h-2 rounded-full"
                            style={{ background: "var(--primary-400)" }}
                        />
                        <div
                            className="w-8 h-[2px] rounded-full"
                            style={{ background: "var(--primary-400)" }}
                        />
                    </div>

                    <p
                        className="max-w-2xl mx-auto text-base sm:text-lg"
                        style={{ color: "rgba(255,255,255,0.6)" }}
                    >
                        From skill development workshops to health awareness
                        camps, we organize impactful programs that uplift
                        communities and empower women.
                    </p>
                </div>
            </div>

            {/* ─── Stacking Cards ─── */}
            <div ref={container} className="relative z-10">
                <div
                    className="events-sticky-cards relative flex items-center justify-center overflow-hidden p-3 lg:p-8"
                    style={{ height: "100vh" }}
                >
                    <div
                        className="relative w-full max-w-7xl mx-auto overflow-hidden rounded-3xl"
                        style={{ height: "90%" }}
                    >
                        {events.map((event, i) => (
                            <div
                                key={event.id}
                                ref={(el) => {
                                    cardRefs.current[i] = el;
                                }}
                                className="absolute inset-0 rounded-3xl overflow-hidden will-change-transform"
                                style={{
                                    background: "#ffffff",
                                    border: "1px solid rgba(43,122,120,0.15)",
                                    boxShadow:
                                        "0 8px 30px rgba(0,0,0,0.2)",
                                    transform: "translateZ(0)",
                                }}
                            >
                                <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
                                    {/* ── Image Side ── */}
                                    <div
                                        className={`relative overflow-hidden min-h-[200px] sm:min-h-[250px] lg:min-h-0 ${i % 2 === 1
                                                ? "lg:order-2"
                                                : "lg:order-1"
                                            }`}
                                    >
                                        <Image
                                            src={event.image}
                                            alt={event.title}
                                            fill
                                            sizes="(max-width: 1024px) 100vw, 50vw"
                                            className="object-cover"
                                        />

                                        {/* Event number badge */}
                                        <div
                                            className={`absolute top-4 left-4 lg:top-6 ${i % 2 === 1
                                                    ? "lg:right-6 lg:left-auto"
                                                    : "lg:left-6"
                                                } w-10 h-10 lg:w-12 lg:h-12 rounded-xl lg:rounded-2xl flex items-center justify-center`}
                                            style={{
                                                background:
                                                    "rgba(255,255,255,0.9)",
                                                backdropFilter: "blur(12px)",
                                                border: "1px solid rgba(255,255,255,0.95)",
                                                boxShadow:
                                                    "0 4px 12px rgba(0,0,0,0.12)",
                                            }}
                                        >
                                            <span
                                                className="font-[family-name:var(--font-heading)] text-base lg:text-lg font-bold"
                                                style={{
                                                    color: "var(--primary)",
                                                }}
                                            >
                                                0{i + 1}
                                            </span>
                                        </div>
                                    </div>

                                    {/* ── Content Side ── */}
                                    <div
                                        className={`flex flex-col justify-center p-5 sm:p-6 lg:p-10 xl:p-16 ${i % 2 === 1
                                                ? "lg:order-1"
                                                : "lg:order-2"
                                            }`}
                                    >
                                        <span
                                            className="inline-block px-3 py-1 lg:px-4 lg:py-1.5 rounded-full text-[10px] lg:text-xs font-bold uppercase tracking-widest mb-3 lg:mb-6 w-fit"
                                            style={{
                                                background: "var(--primary-50)",
                                                color: "var(--primary)",
                                                border: "1px solid var(--primary-100)",
                                            }}
                                        >
                                            {event.subtitle}
                                        </span>

                                        <h3
                                            className="font-[family-name:var(--font-heading)] text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold mb-2 lg:mb-5"
                                            style={{ color: "var(--foreground)" }}
                                        >
                                            {event.title}
                                        </h3>

                                        <p
                                            className="text-sm lg:text-base xl:text-lg leading-relaxed mb-4 lg:mb-8"
                                            style={{ color: "var(--text-secondary)" }}
                                        >
                                            {event.description}
                                        </p>

                                        <div className="flex flex-wrap gap-2 lg:block lg:space-y-3">
                                            {event.highlights.map((h, j) => (
                                                <div
                                                    key={j}
                                                    className="flex items-center gap-2 lg:gap-3"
                                                >
                                                    <div
                                                        className="w-5 h-5 lg:w-6 lg:h-6 rounded-full flex items-center justify-center flex-shrink-0"
                                                        style={{
                                                            background: "var(--primary-50)",
                                                        }}
                                                    >
                                                        <svg
                                                            className="w-3 h-3 lg:w-3.5 lg:h-3.5"
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
                                                        className="text-xs lg:text-sm font-medium"
                                                        style={{ color: "var(--text-muted)" }}
                                                    >
                                                        {h}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>

                                        <div
                                            className="mt-4 lg:mt-8 w-12 lg:w-16 h-[2px] rounded-full"
                                            style={{
                                                background:
                                                    "linear-gradient(90deg, var(--primary), var(--accent))",
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
