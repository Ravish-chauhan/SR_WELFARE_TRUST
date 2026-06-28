"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
    User, Phone, Mail, MapPin, Calendar, Shield,
    LogOut, CreditCard, CheckCircle, XCircle,
    Loader2, Home, ChevronRight
} from "lucide-react";

interface UserData {
    _id: string;
    name: string;
    email: string;
    phone: string;
    age: number;
    gender: string;
    dob: string;
    city: string;
    state: string;
    address: string;
    role: string;
    createdAt: string;
}

interface CardData {
    _id: string;
    cardNumber: string;
    discountPercent: number;
    hospitalName: string;
    validUntil: string;
    assignedBy: string;
    isActive: boolean;
    createdAt: string;
}

export default function ProfilePage() {
    const router = useRouter();
    const [user, setUser] = useState<UserData | null>(null);
    const [cards, setCards] = useState<CardData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/user/profile")
            .then((r) => {
                if (r.status === 401) { router.push("/auth/login"); return null; }
                return r.json();
            })
            .then((data) => {
                if (data) { setUser(data.user); setCards(data.cards); }
            })
            .finally(() => setLoading(false));
    }, [router]);

    const handleLogout = async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        router.push("/");
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-[#0f2525] via-[#1a3a3a] to-[#0d1f1f] flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-[#366861] animate-spin" />
            </div>
        );
    }

    if (!user) return null;

    const joinDate = new Date(user.createdAt).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" });
    const dob = new Date(user.dob).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" });

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0f2525] via-[#1a3a3a] to-[#0d1f1f]">
            {/* Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#366861]/15 rounded-full blur-[150px]" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#d4868e]/10 rounded-full blur-[100px]" />
            </div>

            {/* Header */}
            <header className="relative z-10 bg-white/5 backdrop-blur-xl border-b border-white/10">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3">
                        <Image src="/logo2.svg" alt="SR Welfare Trust" width={48} height={48} className="w-10 h-10 object-contain" />
                        <span className="text-white font-bold text-sm hidden sm:block">SR Welfare Trust</span>
                    </Link>
                    <div className="flex items-center gap-3">
                        <Link href="/" className="flex items-center gap-1.5 text-white/50 hover:text-white text-sm transition-colors">
                            <Home className="w-4 h-4" /> <span className="hidden sm:block">Home</span>
                        </Link>
                        <button onClick={handleLogout}
                            className="flex items-center gap-1.5 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-400/20 text-red-300 rounded-lg text-sm font-medium transition-all">
                            <LogOut className="w-4 h-4" /> Logout
                        </button>
                    </div>
                </div>
            </header>

            <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-8">
                {/* Welcome banner */}
                <div className="bg-gradient-to-r from-[#366861]/30 to-[#2a5048]/20 border border-[#366861]/30 rounded-2xl p-6 mb-8 flex items-center gap-5">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#366861] to-[#2a5048] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                        <span className="text-white text-2xl font-bold">{user.name.charAt(0).toUpperCase()}</span>
                    </div>
                    <div>
                        <p className="text-white/50 text-sm mb-0.5">Welcome back,</p>
                        <h1 className="text-white text-2xl font-bold">{user.name}</h1>
                        <p className="text-white/40 text-sm">Member since {joinDate}</p>
                    </div>
                    {user.role === "admin" && (
                        <div className="ml-auto">
                            <Link href="/admin"
                                className="flex items-center gap-2 px-4 py-2 bg-[#d4868e]/20 border border-[#d4868e]/30 text-[#d4868e] rounded-lg text-sm font-semibold hover:bg-[#d4868e]/30 transition-all">
                                <Shield className="w-4 h-4" /> Admin Panel <ChevronRight className="w-3 h-3" />
                            </Link>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Profile Info */}
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                        <h2 className="text-white font-bold text-lg mb-5 flex items-center gap-2">
                            <User className="w-5 h-5 text-[#366861]" /> Personal Information
                        </h2>
                        <div className="space-y-4">
                            {[
                                { icon: <User className="w-4 h-4" />, label: "Full Name", value: user.name },
                                { icon: <Calendar className="w-4 h-4" />, label: "Date of Birth", value: dob },
                                { icon: <User className="w-4 h-4" />, label: "Age", value: `${user.age} years` },
                                { icon: <User className="w-4 h-4" />, label: "Gender", value: user.gender },
                            ].map((item) => (
                                <div key={item.label} className="flex items-start gap-3">
                                    <div className="w-8 h-8 bg-[#366861]/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 text-[#366861]">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <p className="text-white/40 text-xs">{item.label}</p>
                                        <p className="text-white text-sm font-medium">{item.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                        <h2 className="text-white font-bold text-lg mb-5 flex items-center gap-2">
                            <Phone className="w-5 h-5 text-[#366861]" /> Contact Details
                        </h2>
                        <div className="space-y-4">
                            {[
                                { icon: <Mail className="w-4 h-4" />, label: "Email", value: user.email },
                                { icon: <Phone className="w-4 h-4" />, label: "Phone", value: user.phone },
                                { icon: <MapPin className="w-4 h-4" />, label: "Location", value: `${user.city}, ${user.state}` },
                                { icon: <MapPin className="w-4 h-4" />, label: "Address", value: user.address },
                            ].map((item) => (
                                <div key={item.label} className="flex items-start gap-3">
                                    <div className="w-8 h-8 bg-[#366861]/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 text-[#366861]">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <p className="text-white/40 text-xs">{item.label}</p>
                                        <p className="text-white text-sm font-medium break-all">{item.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Discount Cards */}
                <div className="mt-6">
                    <h2 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                        <CreditCard className="w-5 h-5 text-[#d4868e]" /> My Hospital Discount Cards
                        <span className="ml-auto text-white/30 text-sm font-normal">{cards.length} card{cards.length !== 1 ? "s" : ""}</span>
                    </h2>

                    {cards.length === 0 ? (
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-10 text-center">
                            <CreditCard className="w-12 h-12 text-white/20 mx-auto mb-3" />
                            <p className="text-white/40 text-sm">No discount cards assigned yet.</p>
                            <p className="text-white/20 text-xs mt-1">Cards will appear here once assigned by the admin.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {cards.map((card) => {
                                const isExpired = new Date(card.validUntil) < new Date();
                                const valid = card.isActive && !isExpired;
                                return (
                                    <div key={card._id}
                                        className={`relative overflow-hidden rounded-2xl p-5 border ${valid
                                            ? "bg-gradient-to-br from-[#366861]/40 to-[#2a5048]/30 border-[#366861]/40"
                                            : "bg-white/5 border-white/10 opacity-60"
                                        }`}>
                                        {/* Card shimmer */}
                                        {valid && <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-12 translate-x-12" />}

                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-center gap-2">
                                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${valid ? "bg-green-400/20" : "bg-red-400/20"}`}>
                                                    {valid
                                                        ? <CheckCircle className="w-4 h-4 text-green-400" />
                                                        : <XCircle className="w-4 h-4 text-red-400" />}
                                                </div>
                                                <span className={`text-xs font-bold uppercase tracking-wider ${valid ? "text-green-400" : "text-red-400"}`}>
                                                    {valid ? "Active" : isExpired ? "Expired" : "Inactive"}
                                                </span>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-3xl font-black text-white">{card.discountPercent}%</div>
                                                <div className="text-white/40 text-xs">Discount</div>
                                            </div>
                                        </div>

                                        <div className="mb-3">
                                            <p className="text-white font-bold">{card.hospitalName}</p>
                                            <p className="text-white/40 text-xs mt-0.5 font-mono">{card.cardNumber}</p>
                                        </div>

                                        <div className="flex items-center justify-between text-xs text-white/40 border-t border-white/10 pt-3 mt-3">
                                            <span>Assigned by: {card.assignedBy}</span>
                                            <span>Valid till: {new Date(card.validUntil).toLocaleDateString("en-IN")}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
