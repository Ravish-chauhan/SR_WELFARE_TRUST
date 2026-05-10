"use client";

import { useState, useEffect, useRef } from "react";
import { MapPin, Mail, Phone, Clock, Send } from "lucide-react";

export default function ContactSection() {
    const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
            { threshold: 0.15 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Thank you for reaching out! We will get back to you soon.");
        setFormData({ name: "", email: "", phone: "", message: "" });
    };

    const contactInfo = [
        { icon: <MapPin className="w-5 h-5" />, label: "Visit Us", value: "123 Women Empowerment Road, New Delhi, India 110001" },
        { icon: <Mail className="w-5 h-5" />, label: "Email Us", value: "info@srwelfare.org" },
        { icon: <Phone className="w-5 h-5" />, label: "Call Us", value: "+91 12345 67890" },
        { icon: <Clock className="w-5 h-5" />, label: "Office Hours", value: "Mon – Sat, 9:00 AM – 6:00 PM" },
    ];

    return (
        <section id="contact" ref={sectionRef} className="py-20 lg:py-28 bg-white relative overflow-hidden">
            {/* Subtle warm background */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-50/30 to-transparent pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section header — left aligned on desktop */}
                <div className={`mb-14 lg:mb-20 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
                    <div className="max-w-2xl">
                        <p
                            className="text-base sm:text-lg mb-2"
                            style={{
                                fontFamily: "'Dancing Script', cursive",
                                fontStyle: "italic",
                                color: "var(--primary)",
                            }}
                        >
                            Get in touch
                        </p>
                        <h2 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-4">
                            We&apos;d love to hear from you.
                        </h2>
                        <p className="text-text-secondary text-base sm:text-lg leading-relaxed">
                            Whether you want to volunteer, partner, or simply say hello — drop us a message and our team will get back to you within 24 hours.
                        </p>
                    </div>
                </div>

                <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
                    {/* Left — Contact Details */}
                    <div className={`lg:col-span-2 transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
                        <div className="space-y-4">
                            {contactInfo.map((item, i) => (
                                <div
                                    key={i}
                                    className="flex items-start gap-4 p-5 rounded-2xl bg-[#f8fafa] border border-border-light hover:border-primary/20 transition-all duration-300 group"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-1">{item.label}</p>
                                        <p className="text-foreground font-medium text-sm leading-relaxed">{item.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Social links */}
                        <div className="mt-8 pt-6 border-t border-border-light">
                            <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-4">Follow us</p>
                            <div className="flex items-center gap-3">
                                {[
                                    { name: "Facebook", letter: "f" },
                                    { name: "Instagram", letter: "in" },
                                    { name: "Twitter", letter: "X" },
                                    { name: "YouTube", letter: "▶" },
                                ].map((social, i) => (
                                    <a
                                        key={i}
                                        href="#"
                                        title={social.name}
                                        className="w-10 h-10 rounded-xl bg-[#f8fafa] border border-border-light hover:bg-primary hover:border-primary hover:text-white text-text-muted flex items-center justify-center transition-all duration-300 text-xs font-bold"
                                    >
                                        {social.letter}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right — Form */}
                    <div className={`lg:col-span-3 transition-all duration-700 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
                        <form
                            onSubmit={handleSubmit}
                            className="bg-white rounded-3xl p-6 sm:p-10 shadow-[0_4px_40px_rgba(43,122,120,0.06)] border border-border-light"
                        >
                            <div className="grid sm:grid-cols-2 gap-5 mb-5">
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-3.5 rounded-xl border border-border bg-[#fafcfc] focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all text-foreground text-sm"
                                        placeholder="Your name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full px-4 py-3.5 rounded-xl border border-border bg-[#fafcfc] focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all text-foreground text-sm"
                                        placeholder="your@email.com"
                                    />
                                </div>
                            </div>
                            <div className="mb-5">
                                <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
                                <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full px-4 py-3.5 rounded-xl border border-border bg-[#fafcfc] focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all text-foreground text-sm"
                                    placeholder="+91 xxxxx xxxxx"
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-foreground mb-2">Your Message</label>
                                <textarea
                                    required
                                    rows={4}
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full px-4 py-3.5 rounded-xl border border-border bg-[#fafcfc] focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all text-foreground resize-none text-sm"
                                    placeholder="Tell us how you'd like to help or what you'd like to know..."
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full py-4 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/20 flex items-center justify-center gap-2 text-sm uppercase tracking-wider"
                            >
                                <Send className="w-4 h-4" />
                                Send Message
                            </button>
                            <p className="text-center text-text-muted text-xs mt-4">
                                We typically respond within 24 hours.
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
