"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const testimonials = [
    {
        name: "Priya Sharma",
        role: "Self-Help Group Leader",
        location: "Rajasthan",
        quote: "Shakti Foundation changed my life. From a daily wage worker, I am now running my own tailoring business and supporting 5 other women in my village.",
        image: "https://images.unsplash.com/photo-1594824476967-48c8b964ac31?w=100&h=100&fit=crop&crop=face",
    },
    {
        name: "Meera Devi",
        role: "Education Program Graduate",
        location: "Bihar",
        quote: "I was married at 15 and thought education was over for me. Shakti's literacy program gave me a second chance. Today, I am a school teacher.",
        image: "https://images.unsplash.com/photo-1607990283143-e81e7a2c9349?w=100&h=100&fit=crop&crop=face",
    },
    {
        name: "Anita Kumari",
        role: "Healthcare Worker",
        location: "Madhya Pradesh",
        quote: "The health training I received helped me become a community health worker. I've helped over 200 women in my village access proper maternal care.",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=face",
    },
];

export default function TestimonialsSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
            { threshold: 0.2 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section id="stories" ref={sectionRef} className="py-24 lg:py-32 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 border border-primary-100 mb-6 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                        <span className="text-sm font-medium text-primary-700">Success Stories</span>
                    </div>
                    <h2 className={`font-[family-name:var(--font-heading)] text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-4 transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                        Voices of <span className="gradient-text">Change</span>
                    </h2>
                    <div className="section-divider mx-auto mb-6" />
                    <p className={`max-w-2xl mx-auto text-lg text-text-secondary transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                        Real stories from real women whose lives have been transformed through our programs.
                    </p>
                </div>

                {/* Testimonials */}
                <div className={`max-w-4xl mx-auto transition-all duration-700 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                    <div className="relative bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-primary/5 border border-border-light overflow-hidden min-h-[280px]">
                        <div className="absolute top-6 left-8 text-8xl font-[family-name:var(--font-heading)] text-primary-100 leading-none select-none">&ldquo;</div>

                        <div className="relative z-10">
                            {testimonials.map((testimonial, i) => (
                                <div key={i} className={`transition-all duration-500 ${i === activeIndex ? "opacity-100 translate-y-0 relative" : "opacity-0 translate-y-4 absolute inset-0 p-8 md:p-12 pointer-events-none"}`}>
                                    <p className="text-lg md:text-xl text-foreground leading-relaxed mb-8 font-medium italic">
                                        &ldquo;{testimonial.quote}&rdquo;
                                    </p>
                                    <div className="flex items-center gap-4">
                                        <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-primary-200">
                                            <Image src={testimonial.image} alt={testimonial.name} fill className="object-cover" />
                                        </div>
                                        <div>
                                            <div className="font-bold text-foreground">{testimonial.name}</div>
                                            <div className="text-sm text-primary-600">{testimonial.role}</div>
                                            <div className="text-xs text-text-muted">{testimonial.location}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary" />
                    </div>

                    {/* Pagination dots */}
                    <div className="flex items-center justify-center gap-3 mt-8">
                        {testimonials.map((_, i) => (
                            <button key={i} onClick={() => setActiveIndex(i)} className={`transition-all duration-300 rounded-full ${i === activeIndex ? "w-8 h-3 bg-gradient-to-r from-primary to-accent" : "w-3 h-3 bg-primary-200 hover:bg-primary-300"}`} aria-label={`Go to testimonial ${i + 1}`} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
