"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const galleryImages = [
    // Gallery-mains (featured real photos)
    { id: 1, src: "/images/gallery-mains/awareness-camp.jpeg", title: "Awareness Camp", category: "Awareness", height: "tall" },
    { id: 2, src: "/images/gallery-mains/health-camp.jpeg", title: "Health Camp", category: "Healthcare", height: "medium" },
    { id: 3, src: "/images/gallery-mains/makeup-class.jpeg", title: "Makeup & Beauty Class", category: "Skill Training", height: "tall" },
    { id: 4, src: "/images/gallery-mains/makeup-class1.jpeg", title: "Beauty Training Session", category: "Skill Training", height: "short" },
    { id: 5, src: "/images/gallery-mains/independance-day-celebration.jpeg", title: "Independence Day", category: "Celebration", height: "medium" },
    { id: 6, src: "/images/gallery-mains/mehndi-competition.jpeg", title: "Mehndi Competition", category: "Events", height: "tall" },
    { id: 7, src: "/images/gallery-mains/project-raksha.jpeg", title: "Project Raksha", category: "Healthcare", height: "medium" },
    { id: 8, src: "/images/gallery-mains/project-raksha-healtcare.jpeg", title: "Project Raksha Healthcare", category: "Healthcare", height: "short" },
    { id: 9, src: "/images/gallery-mains/sewing-competition.jpeg", title: "Sewing Competition", category: "Events", height: "medium" },
    { id: 10, src: "/images/gallery-mains/project-raksha-poster.jpeg", title: "Project Raksha Poster", category: "Awareness", height: "short" },
    // Real gallery photos
    { id: 11, src: "/images/gallery/real-1.jpeg", title: "Trust Registration Desk", category: "Events", height: "tall" },
    { id: 12, src: "/images/gallery/real-2.jpeg", title: "Women Health Checkup", category: "Healthcare", height: "medium" },
    { id: 13, src: "/images/gallery/real-3.jpeg", title: "Community Gathering", category: "Awareness", height: "short" },
    { id: 14, src: "/images/gallery/real-4.jpeg", title: "Health Awareness Session", category: "Healthcare", height: "tall" },
    { id: 15, src: "/images/gallery/real-5.jpeg", title: "NGO Office", category: "Events", height: "medium" },
    { id: 16, src: "/images/gallery/real-6.jpeg", title: "Women Checkup Camp", category: "Healthcare", height: "short" },
    { id: 17, src: "/images/gallery/real-7.jpeg", title: "Awareness Drive", category: "Awareness", height: "medium" },
    { id: 18, src: "/images/gallery/real-8.jpeg", title: "Medical Consultation", category: "Healthcare", height: "tall" },
    { id: 19, src: "/images/gallery/real-9.jpeg", title: "Certificate Distribution", category: "Events", height: "short" },
    { id: 20, src: "/images/gallery/real-10.jpeg", title: "Community Meeting", category: "Awareness", height: "medium" },
    { id: 21, src: "/images/gallery/real-11.jpeg", title: "Women Gathering", category: "Events", height: "tall" },
    { id: 22, src: "/images/gallery/real-12.jpeg", title: "Health Camp Registration", category: "Healthcare", height: "short" },
    { id: 23, src: "/images/gallery/real-13.jpeg", title: "Award Ceremony", category: "Celebration", height: "medium" },
    { id: 24, src: "/images/gallery/real-14.jpeg", title: "Group Photo", category: "Events", height: "tall" },
    { id: 25, src: "/images/gallery/real-15.jpeg", title: "Skill Training Camp", category: "Skill Training", height: "short" },
    { id: 26, src: "/images/gallery/real-16.jpeg", title: "Celebration Moment", category: "Celebration", height: "medium" },
    { id: 27, src: "/images/gallery/real-17.jpeg", title: "Women Empowerment Meet", category: "Awareness", height: "tall" },
    { id: 28, src: "/images/gallery/real-18.jpeg", title: "Trust Event", category: "Events", height: "short" },
    { id: 29, src: "/images/gallery/real-19.jpeg", title: "Community Healthcare", category: "Healthcare", height: "medium" },
];

const categories = ["All", ...Array.from(new Set(galleryImages.map((img) => img.category)))];

const heightMap: Record<string, string> = {
    short: "h-[220px] sm:h-[240px] lg:h-[260px]",
    medium: "h-[280px] sm:h-[320px] lg:h-[360px]",
    tall: "h-[340px] sm:h-[400px] lg:h-[440px]",
};

export default function GalleryPage() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const filteredImages =
        activeCategory === "All"
            ? galleryImages
            : galleryImages.filter((img) => img.category === activeCategory);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    // Lightbox navigation
    const openLightbox = (index: number) => {
        setLightboxIndex(index);
        document.body.style.overflow = "hidden";
    };

    const closeLightbox = () => {
        setLightboxIndex(null);
        document.body.style.overflow = "";
    };

    const goNext = useCallback(() => {
        if (lightboxIndex === null) return;
        setLightboxIndex((lightboxIndex + 1) % filteredImages.length);
    }, [lightboxIndex, filteredImages.length]);

    const goPrev = useCallback(() => {
        if (lightboxIndex === null) return;
        setLightboxIndex((lightboxIndex - 1 + filteredImages.length) % filteredImages.length);
    }, [lightboxIndex, filteredImages.length]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (lightboxIndex === null) return;
            if (e.key === "Escape") closeLightbox();
            if (e.key === "ArrowRight") goNext();
            if (e.key === "ArrowLeft") goPrev();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [lightboxIndex, goNext, goPrev]);

    return (
        <main className="min-h-screen bg-[#fdfaf5]">
            {/* Gallery Header */}
            <div className="relative overflow-hidden">
                {/* Background image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/g1.png"
                        alt=""
                        fill
                        className="object-cover object-center"
                        priority
                    />
                    <div className="absolute inset-0 bg-[#1a3a3a]/85" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a3a3a] via-transparent to-[#1a3a3a]/40" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-14 lg:pt-10 lg:pb-20">
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-2 text-sm text-white/50 mb-10 lg:mb-14">
                        <Link href="/" className="hover:text-white transition-colors duration-300">Home</Link>
                        <span>/</span>
                        <span className="text-white/80">Gallery</span>
                    </nav>

                    <p
                        className="text-lg sm:text-xl mb-2"
                        style={{
                            fontFamily: "'Dancing Script', cursive",
                            fontStyle: "italic",
                            color: "var(--accent)",
                        }}
                    >
                        Moments that matter
                    </p>
                    <h1 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-3">
                        Our Gallery
                    </h1>
                    <p className="text-base text-white/50 max-w-lg">
                        Real stories, real impact — captured through the lens of our community work across rural India.
                    </p>
                </div>
            </div>

            {/* Filter Bar */}
            <div className="sticky top-0 z-30 bg-[#fdfaf5]/90 backdrop-blur-xl border-b border-black/5 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2 py-4 overflow-x-auto no-scrollbar">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                                    activeCategory === cat
                                        ? "bg-primary text-white shadow-lg shadow-primary/20"
                                        : "bg-white text-[#4a6e6e] border border-black/8 hover:border-primary/30 hover:text-primary"
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Pinterest Masonry Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
                <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 lg:gap-5">
                    {filteredImages.map((image, index) => (
                        <div
                            key={image.id}
                            onClick={() => openLightbox(index)}
                            className={`break-inside-avoid mb-4 lg:mb-5 group cursor-pointer rounded-2xl overflow-hidden relative transition-all duration-700 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/10 ${
                                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                            }`}
                            style={{
                                transitionDelay: isLoaded ? `${index * 80}ms` : "0ms",
                            }}
                        >
                            <div className={`relative ${heightMap[image.height]} w-full`}>
                                <Image
                                    src={image.src}
                                    alt={image.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                />

                                {/* Hover overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                                    <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                        <span
                                            className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.15em] mb-2"
                                            style={{
                                                background: "rgba(212, 134, 142, 0.9)",
                                                color: "#fff",
                                            }}
                                        >
                                            {image.category}
                                        </span>
                                        <h3 className="text-white text-base lg:text-lg font-bold font-[family-name:var(--font-heading)] leading-tight">
                                            {image.title}
                                        </h3>
                                    </div>
                                </div>

                                {/* Top-right zoom icon */}
                                <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300 shadow-lg">
                                    <svg className="w-4 h-4 text-[#1a3a3a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty state */}
                {filteredImages.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-[#4a6e6e] text-lg">No photos found in this category.</p>
                    </div>
                )}
            </div>

            {/* Lightbox Modal */}
            {lightboxIndex !== null && (
                <div
                    className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center animate-fade-in"
                    onClick={closeLightbox}
                >
                    {/* Close button */}
                    <button
                        onClick={closeLightbox}
                        className="absolute top-4 right-4 sm:top-6 sm:right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors duration-300 z-10"
                    >
                        <X className="w-6 h-6 text-white" />
                    </button>

                    {/* Prev button */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            goPrev();
                        }}
                        className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors duration-300 z-10"
                    >
                        <ChevronLeft className="w-6 h-6 text-white" />
                    </button>

                    {/* Next button */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            goNext();
                        }}
                        className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors duration-300 z-10"
                    >
                        <ChevronRight className="w-6 h-6 text-white" />
                    </button>

                    {/* Image */}
                    <div
                        className="relative w-[90vw] h-[70vh] sm:w-[80vw] sm:h-[80vh] max-w-5xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={filteredImages[lightboxIndex].src}
                            alt={filteredImages[lightboxIndex].title}
                            fill
                            className="object-contain"
                            sizes="90vw"
                            priority
                        />
                    </div>

                    {/* Caption */}
                    <div
                        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.15em] mb-2 bg-accent/80 text-white">
                            {filteredImages[lightboxIndex].category}
                        </span>
                        <h3 className="text-white text-xl font-bold font-[family-name:var(--font-heading)]">
                            {filteredImages[lightboxIndex].title}
                        </h3>
                        <p className="text-white/50 text-sm mt-1">
                            {lightboxIndex + 1} / {filteredImages.length}
                        </p>
                    </div>
                </div>
            )}

            {/* Hide scrollbar on filter bar */}
            <style jsx>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </main>
    );
}
