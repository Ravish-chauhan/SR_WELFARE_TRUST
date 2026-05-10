"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

const galleryImagesRow1 = [
    { id: 1, src: "/images/g1.png", title: "Community Bonding", category: "Social" },
    { id: 2, src: "/images/gallery-mains/awareness-camp.jpeg", title: "Awareness Camp", category: "Awareness" },
    { id: 3, src: "/images/g3.png", title: "Skill Workshop", category: "Vocational" },
    { id: 4, src: "/images/gallery-mains/health-camp.jpeg", title: "Health Camp", category: "Medical" },
    { id: 5, src: "/images/gallery-mains/makeup-class.jpeg", title: "Makeup & Beauty Class", category: "Skill Training" },
    { id: 6, src: "/images/g5.png", title: "Moments of Joy", category: "Celebration" },
];

const galleryImagesRow2 = [
    { id: 7, src: "/images/gallery-mains/independance-day-celebration.jpeg", title: "Independence Day", category: "Celebration" },
    { id: 8, src: "/images/gallery-mains/project-raksha.jpeg", title: "Project Raksha", category: "Healthcare" },
    { id: 9, src: "/images/g4.png", title: "Healthcare Camps", category: "Medical" },
    { id: 10, src: "/images/gallery-mains/mehndi-competition.jpeg", title: "Mehndi Competition", category: "Events" },
    { id: 11, src: "/images/gallery-mains/sewing-competition.jpeg", title: "Sewing Competition", category: "Skill Training" },
    { id: 12, src: "/images/g2.png", title: "Brighter Futures", category: "Education" },
];

export default function GallerySection() {
    const row1Ref = useRef<HTMLDivElement>(null);
    const row2Ref = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const setupMarquee = (row: HTMLElement | null, direction: number, speed: number) => {
            if (!row) return;

            // In a marquee with concatenated items, we move exactly half the scrollWidth
            const totalWidth = row.scrollWidth / 2;

            if (direction === -1) {
                // Moving Left: Start at 0, move to -totalWidth, then reset to 0
                gsap.to(row, {
                    x: -totalWidth,
                    duration: speed,
                    ease: "none",
                    repeat: -1,
                    onRepeat: () => {
                        // GSAP handles the reset naturally with repeat: -1 if the loop is perfect
                    }
                });
            } else {
                // Moving Right: Start at -totalWidth, move to 0, then reset to -totalWidth
                gsap.set(row, { x: -totalWidth });
                gsap.to(row, {
                    x: 0,
                    duration: speed,
                    ease: "none",
                    repeat: -1,
                });
            }
        };

        // Speeds reduced for "speed high" (Lower duration = Faster)
        // Row 1: Right to Left (Fastest)
        setupMarquee(row1Ref.current, -1, 20);
        // Row 2: Left to Right
        setupMarquee(row2Ref.current, 1, 25);
    }, []);

    const MarqueeRow = ({ images, rowRef }: { images: typeof galleryImagesRow1, rowRef: React.RefObject<HTMLDivElement> }) => (
        <div className="relative overflow-hidden w-full py-2">
            <div
                ref={rowRef}
                className="flex gap-4 whitespace-nowrap will-change-transform"
                style={{ width: "fit-content" }}
            >
                {/* Image set rendered twice for seamless loop */}
                {[...images, ...images].map((image, i) => (
                    <div
                        key={`${image.id}-${i}`}
                        className="relative w-[280px] h-[180px] md:w-[450px] md:h-[280px] flex-shrink-0 rounded-3xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500"
                    >
                        <Image
                            src={image.src}
                            alt={image.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                            sizes="(max-width: 768px) 280px, 450px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 translate-y-4 group-hover:translate-y-0 transition-transform">
                            <span className="text-accent text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] mb-1">{image.category}</span>
                            <h3 className="text-white text-base sm:text-xl font-bold font-[family-name:var(--font-heading)] leading-tight">{image.title}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <section id="gallery" className="py-24 bg-[#fdfaf5] overflow-hidden border-t border-black/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
                <p
                    className="text-lg sm:text-xl mb-3"
                    style={{
                        fontFamily: "'Dancing Script', cursive",
                        fontStyle: "italic",
                        color: "var(--primary)",
                        letterSpacing: "0.5px"
                    }}
                >
                    Our Infinite Impact
                </p>
                <h2 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl lg:text-[52px] font-bold text-[#1a3a3a] leading-tight mb-4">
                    Visual <span className="gradient-text">Journey</span>
                </h2>
                <div className="section-divider mx-auto mb-6" />
                <p className="max-w-2xl mx-auto text-lg text-[#4a6e6e]">
                    A seamless stream of heart-touching moments, moving forward just like our mission.
                </p>
            </div>

            <div className="flex flex-col gap-6 md:gap-8">
                <MarqueeRow images={galleryImagesRow1} rowRef={row1Ref} />
                <MarqueeRow images={galleryImagesRow2} rowRef={row2Ref} />
            </div>

            <div className="mt-16 text-center">
                <Link href="/gallery" className="inline-block px-10 py-4 rounded-full bg-primary text-white font-bold hover:shadow-[0_20px_50px_rgba(54,104,97,0.3)] transition-all duration-500 hover:-translate-y-1 active:scale-95">
                    Explore Our Gallery
                </Link>
            </div>
        </section>
    );
}
