"use client";

import { useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { X, Upload, CreditCard, Copy } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const donationOptions = [
    {
        id: "edu",
        title: "Help For Education",
        icon: "/images/icon-edu.png",
    },
    {
        id: "medical",
        title: "Medical Emergency",
        icon: "/images/icon-health.png",
    },
    {
        id: "environment",
        title: "Environment Welfare",
        icon: "/images/cause-education.png",
    },
    {
        id: "women",
        title: "Women Empowerment",
        icon: "/images/icon-women.png",
    },
];

export default function DonationSection() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        transactionId: "",
        proof: null as File | null,
    });

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setIsModalOpen(false);
            alert("Success! Thank you for your support.");
            setFormData({ name: "", email: "", phone: "", transactionId: "", proof: null });
        }, 1500);
    };

    useGSAP(() => {
        gsap.from(".payment-methods-grid", {
            y: 30,
            opacity: 0,
            duration: 0.8,
            scrollTrigger: {
                trigger: ".payment-methods-grid",
                start: "top 90%",
            }
        });
    });

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        alert("Copied to clipboard!");
    };

    return (
        <section id="donate" className="py-20 lg:py-28 bg-white relative overflow-hidden border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <p
                        className="text-lg sm:text-xl mb-3"
                        style={{
                            fontFamily: "'Dancing Script', cursive",
                            fontStyle: "italic",
                            color: "var(--primary)",
                            letterSpacing: "0.5px",
                        }}
                    >
                        Make a difference
                    </p>
                    <h2 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1a3a3a] leading-tight mb-4">
                        Support Our Mission
                    </h2>
                    <div className="flex items-center justify-center gap-1 mb-6">
                        <div className="w-8 h-[2px] rounded-full" style={{ background: "var(--primary)" }} />
                        <div className="w-2 h-2 rounded-full" style={{ background: "var(--primary)" }} />
                        <div className="w-8 h-[2px] rounded-full" style={{ background: "var(--primary)" }} />
                    </div>
                    <p className="max-w-lg mx-auto text-text-secondary text-base">
                        Choose a cause close to your heart and help us create lasting change in rural communities.
                    </p>
                </div>

                {/* Grid of 4 Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 mb-24">
                    {donationOptions.map((opt) => (
                        <div key={opt.id} className="bg-[#f9fafb] border border-gray-100 p-5 sm:p-10 rounded-[32px] sm:rounded-[48px] shadow-sm hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 group flex flex-col items-center text-center">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl overflow-hidden mb-5 sm:mb-7 group-hover:scale-105 transition-transform duration-500 shadow-sm">
                                <Image
                                    src={opt.icon}
                                    alt={opt.title}
                                    width={80}
                                    height={80}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <h3 className="text-xs sm:text-xl font-bold text-[#1a3a3a] mb-6 sm:mb-8 leading-tight min-h-[3em] sm:min-h-0">
                                {opt.title}
                            </h3>

                            <button className="w-full py-2.5 sm:py-4 rounded-full bg-[#1a3a3a] text-white text-[10px] sm:text-sm font-bold hover:bg-primary transition-all active:scale-95 shadow-lg shadow-black/5">
                                Donate Now
                            </button>
                        </div>
                    ))}
                </div>

                {/* Payment Methods Section */}
                <div className="payment-methods-grid grid lg:grid-cols-12 gap-8 items-stretch pt-8">
                    {/* QR Card — Real Bank QR */}
                    <div className="lg:col-span-5 bg-white p-4 sm:p-5 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
                        <div className="relative w-full h-full max-h-[450px] flex items-center justify-center rounded-2xl overflow-hidden shadow-sm">
                            <Image
                                src="/qr.jpeg"
                                alt="SR Welfare Trust UPI QR Code - Canara Bank"
                                width={400}
                                height={600}
                                className="w-auto h-full max-h-[450px] object-contain"
                            />
                        </div>
                        <p className="text-gray-400 text-xs mt-3 mb-1 font-medium">Scan with any UPI app to donate directly</p>
                    </div>

                    {/* Bank Details Card (White Card with Colored Inner Boxes) */}
                    <div className="lg:col-span-7 bg-white p-8 md:p-12 rounded-[48px] shadow-xl border border-gray-100 flex flex-col justify-between">
                        <div>
                            <div className="flex items-center gap-4 mb-10">
                                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                                    <CreditCard className="text-primary w-6 h-6" />
                                </div>
                                <h3 className="text-2xl sm:text-3xl font-bold text-[#1a3a3a]">Bank Transfer</h3>
                            </div>

                            <div className="grid md:grid-cols-2 gap-8 mb-8">
                                <div className="p-6 bg-[#f9fafb] rounded-3xl border border-gray-100">
                                    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-1">Account Holder</p>
                                    <p className="text-lg font-bold text-[#1a3a3a]">SR WELFARE TRUST</p>
                                </div>
                                <div className="p-6 bg-[#f9fafb] rounded-3xl border border-gray-100">
                                    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-1">Bank Name</p>
                                    <p className="text-lg font-bold text-[#1a3a3a]">Canara Bank</p>
                                </div>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-4">
                                {/* Account Number Box - Dark Teal/Green */}
                                <div className="p-6 bg-[#1a3a3a] rounded-[32px] text-white flex items-center justify-between group/ac overflow-hidden shadow-lg shadow-black/5">
                                    <div>
                                        <p className="text-white/40 text-[9px] font-bold uppercase tracking-widest mb-1">Account Number</p>
                                        <p className="text-lg sm:text-xl font-bold tracking-wider font-mono">1200 2706 9070</p>
                                    </div>
                                    <button onClick={() => copyToClipboard("120027069070")} className="p-3 rounded-2xl bg-white/10 hover:bg-white/20 transition-all flex flex-col items-center gap-1">
                                        <Copy className="w-4 h-4" />
                                        <span className="text-[7px] font-bold opacity-60">COPY</span>
                                    </button>
                                </div>
                                {/* IFSC Code Box - Primary Green */}
                                <div className="p-6 bg-primary rounded-[32px] text-white flex items-center justify-between group/ifsc overflow-hidden shadow-lg shadow-primary/10">
                                    <div>
                                        <p className="text-white/40 text-[9px] font-bold uppercase tracking-widest mb-1">IFSC Code</p>
                                        <p className="text-lg sm:text-xl font-bold tracking-widest font-mono uppercase">CNRB0018769</p>
                                    </div>
                                    <button onClick={() => copyToClipboard("CNRB0018769")} className="p-3 rounded-2xl bg-white/10 hover:bg-white/20 transition-all flex flex-col items-center gap-1">
                                        <Copy className="w-4 h-4" />
                                        <span className="text-[7px] font-bold opacity-60">COPY</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-6">
                            <p className="text-gray-400 text-xs sm:text-sm max-w-[320px] leading-relaxed">After your transfer, please share the transaction proof here for instant receipt generation.</p>
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-accent text-white font-bold inline-flex items-center justify-center gap-3 hover:translate-y-[-2px] hover:shadow-xl transition-all shadow-accent/20"
                            >
                                <Upload className="w-5 h-5" />
                                Submit Proof
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Form */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-[#1a3a3a]/60 backdrop-blur-md" onClick={() => setIsModalOpen(false)} />
                    <div className="bg-white w-full max-w-lg rounded-[48px] shadow-2xl relative z-10 overflow-hidden animate-in fade-in zoom-in duration-300">
                        <div className="bg-[#1a3a3a] p-10 text-white flex justify-between items-center">
                            <h3 className="text-2xl font-bold">Verification</h3>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="p-10">
                            <form onSubmit={handleFormSubmit} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <input type="text" required placeholder="Name" className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 outline-none focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all" />
                                    <input type="email" required placeholder="Email" className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 outline-none focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <input type="text" required placeholder="Phone" className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 outline-none focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all" />
                                    <input type="text" required placeholder="Txn ID" className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 outline-none focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all" />
                                </div>
                                <label className="p-8 rounded-[32px] border-2 border-dashed border-primary/20 bg-primary/5 flex flex-col items-center justify-center cursor-pointer hover:bg-primary/10 transition-all">
                                    <input 
                                        type="file" 
                                        accept="image/*" 
                                        className="hidden" 
                                        onChange={(e) => {
                                            if (e.target.files && e.target.files[0]) {
                                                setFormData({ ...formData, proof: e.target.files[0] });
                                            }
                                        }} 
                                        required
                                    />
                                    <Upload className="w-8 h-8 text-primary/40 mb-2" />
                                    <p className="text-xs font-bold text-primary/60 text-center px-4 truncate max-w-full">
                                        {formData.proof ? formData.proof.name : "Click to upload Payment Screenshot"}
                                    </p>
                                </label>
                                <button type="submit" disabled={isSubmitting} className="w-full py-5 rounded-2xl bg-accent text-white font-bold uppercase tracking-widest hover:brightness-110 transition-all disabled:opacity-50">
                                    Confirm Support
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
