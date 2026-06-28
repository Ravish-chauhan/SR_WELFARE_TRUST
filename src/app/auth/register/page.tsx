"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
    User, Phone, Mail, Lock, MapPin, Calendar,
    ChevronRight, ChevronLeft, AlertCircle, Loader2,
    Eye, EyeOff, CheckCircle2
} from "lucide-react";

interface FormData {
    // Step 1 — Personal Info
    name: string;
    age: string;
    gender: string;
    dob: string;
    // Step 2 — Contact
    email: string;
    phone: string;
    city: string;
    state: string;
    address: string;
    // Step 3 — Account
    password: string;
    confirmPassword: string;
}

const INDIAN_STATES = [
    "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat",
    "Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh",
    "Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab",
    "Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh",
    "Uttarakhand","West Bengal","Delhi","Jammu & Kashmir","Ladakh",
];

const steps = [
    { title: "Personal Info", subtitle: "Tell us about yourself" },
    { title: "Contact Details", subtitle: "Where can we reach you?" },
    { title: "Create Account", subtitle: "Set up your password" },
];

export default function RegisterPage() {
    const router = useRouter();
    const [step, setStep] = useState(0);
    const [form, setForm] = useState<FormData>({
        name: "", age: "", gender: "", dob: "",
        email: "", phone: "", city: "", state: "", address: "",
        password: "", confirmPassword: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const update = (field: keyof FormData, value: string) =>
        setForm((prev) => ({ ...prev, [field]: value }));

    const validateStep = (): string => {
        if (step === 0) {
            if (!form.name.trim()) return "Full name is required";
            if (!form.age || Number(form.age) < 1 || Number(form.age) > 120) return "Please enter a valid age";
            if (!form.gender) return "Please select your gender";
            if (!form.dob) return "Date of birth is required";
        }
        if (step === 1) {
            if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return "Valid email is required";
            if (!form.phone.trim() || !/^\d{10}$/.test(form.phone.replace(/\s/g, ""))) return "Valid 10-digit phone number is required";
            if (!form.city.trim()) return "City is required";
            if (!form.state) return "Please select your state";
            if (!form.address.trim()) return "Address is required";
        }
        if (step === 2) {
            if (!form.password || form.password.length < 8) return "Password must be at least 8 characters";
            if (form.password !== form.confirmPassword) return "Passwords do not match";
        }
        return "";
    };

    const next = () => {
        const err = validateStep();
        if (err) { setError(err); return; }
        setError("");
        setStep((s) => s + 1);
    };

    const back = () => { setError(""); setStep((s) => s - 1); };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const err = validateStep();
        if (err) { setError(err); return; }
        setError("");
        setLoading(true);
        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: form.name,
                    email: form.email,
                    phone: form.phone,
                    password: form.password,
                    age: Number(form.age),
                    gender: form.gender,
                    dob: form.dob,
                    city: form.city,
                    state: form.state,
                    address: form.address,
                }),
            });
            const data = await res.json();
            if (!res.ok) { setError(data.error || "Registration failed"); return; }
            router.push("/profile");
        } catch {
            setError("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const inputClass = "w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-[#366861] focus:bg-white/10 transition-all text-sm";
    const labelClass = "block text-white/60 text-xs font-semibold uppercase tracking-wider mb-1.5";

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-[#0f2525] via-[#1a3a3a] to-[#0d1f1f]">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#366861]/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-[#d4868e]/10 rounded-full blur-[80px]" />
            </div>

            <div className="relative w-full max-w-lg">
                <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-[0_40px_100px_rgba(0,0,0,0.4)]">

                    {/* Logo */}
                    <div className="flex justify-center mb-6">
                        <Link href="/">
                            <Image src="/logo2.svg" alt="SR Welfare Trust" width={80} height={80} className="w-16 h-16 object-contain" />
                        </Link>
                    </div>

                    {/* Step indicator */}
                    <div className="flex items-center justify-center gap-2 mb-6">
                        {steps.map((s, i) => (
                            <div key={i} className="flex items-center gap-2">
                                <div className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold transition-all duration-300 ${
                                    i < step ? "bg-[#366861] text-white" :
                                    i === step ? "bg-[#d4868e] text-white ring-4 ring-[#d4868e]/30" :
                                    "bg-white/10 text-white/30"
                                }`}>
                                    {i < step ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                                </div>
                                {i < steps.length - 1 && (
                                    <div className={`w-8 h-0.5 rounded-full transition-all duration-500 ${i < step ? "bg-[#366861]" : "bg-white/10"}`} />
                                )}
                            </div>
                        ))}
                    </div>

                    <h1 className="text-xl font-bold text-white text-center">{steps[step].title}</h1>
                    <p className="text-white/40 text-sm text-center mb-6">{steps[step].subtitle}</p>

                    {error && (
                        <div className="flex items-center gap-2 bg-red-500/10 border border-red-400/30 text-red-300 rounded-xl px-4 py-3 mb-5 text-sm">
                            <AlertCircle className="w-4 h-4 flex-shrink-0" />
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        {/* ── STEP 1: Personal Info ── */}
                        {step === 0 && (
                            <div className="space-y-4">
                                <div>
                                    <label className={labelClass}>Full Name</label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                                        <input id="reg-name" type="text" placeholder="Enter your full name" value={form.name}
                                            onChange={(e) => update("name", e.target.value)}
                                            className={inputClass + " pl-11"} />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className={labelClass}>Age</label>
                                        <input id="reg-age" type="number" placeholder="Age" min={1} max={120} value={form.age}
                                            onChange={(e) => update("age", e.target.value)}
                                            className={inputClass} />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Gender</label>
                                        <select id="reg-gender" value={form.gender} onChange={(e) => update("gender", e.target.value)}
                                            className={inputClass + " appearance-none"}>
                                            <option value="" disabled>Select</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className={labelClass}>Date of Birth</label>
                                    <div className="relative">
                                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                                        <input id="reg-dob" type="date" value={form.dob}
                                            onChange={(e) => update("dob", e.target.value)}
                                            className={inputClass + " pl-11 [color-scheme:dark]"} />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ── STEP 2: Contact Details ── */}
                        {step === 1 && (
                            <div className="space-y-4">
                                <div>
                                    <label className={labelClass}>Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                                        <input id="reg-email" type="email" placeholder="your@email.com" value={form.email}
                                            onChange={(e) => update("email", e.target.value)}
                                            className={inputClass + " pl-11"} />
                                    </div>
                                </div>
                                <div>
                                    <label className={labelClass}>Phone Number</label>
                                    <div className="relative">
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                                        <input id="reg-phone" type="tel" placeholder="10-digit mobile number" value={form.phone}
                                            onChange={(e) => update("phone", e.target.value)}
                                            className={inputClass + " pl-11"} maxLength={10} />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className={labelClass}>City / Village</label>
                                        <div className="relative">
                                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                                            <input id="reg-city" type="text" placeholder="Your city" value={form.city}
                                                onChange={(e) => update("city", e.target.value)}
                                                className={inputClass + " pl-11"} />
                                        </div>
                                    </div>
                                    <div>
                                        <label className={labelClass}>State</label>
                                        <select id="reg-state" value={form.state} onChange={(e) => update("state", e.target.value)}
                                            className={inputClass + " appearance-none"}>
                                            <option value="" disabled>Select state</option>
                                            {INDIAN_STATES.map((s) => (
                                                <option key={s} value={s}>{s}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className={labelClass}>Full Address</label>
                                    <textarea id="reg-address" placeholder="House no, Street, Area..." value={form.address}
                                        onChange={(e) => update("address", e.target.value)} rows={2}
                                        className={inputClass + " resize-none"} />
                                </div>
                            </div>
                        )}

                        {/* ── STEP 3: Account Setup ── */}
                        {step === 2 && (
                            <div className="space-y-4">
                                <div className="bg-[#366861]/10 border border-[#366861]/20 rounded-xl p-4 mb-2">
                                    <p className="text-white/60 text-xs text-center">
                                        Creating account for <span className="text-white font-semibold">{form.name}</span> · <span className="text-[#d4868e]">{form.email}</span>
                                    </p>
                                </div>
                                <div>
                                    <label className={labelClass}>Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                                        <input id="reg-password" type={showPassword ? "text" : "password"}
                                            placeholder="Min 8 characters" value={form.password}
                                            onChange={(e) => update("password", e.target.value)}
                                            className={inputClass + " pl-11 pr-12"} />
                                        <button type="button" onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60">
                                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                    {form.password && (
                                        <div className="mt-1.5 flex gap-1">
                                            {[1,2,3,4].map((i) => (
                                                <div key={i} className={`h-1 flex-1 rounded-full transition-all ${
                                                    form.password.length >= i * 3
                                                        ? i <= 1 ? "bg-red-400" : i <= 2 ? "bg-yellow-400" : i <= 3 ? "bg-blue-400" : "bg-green-400"
                                                        : "bg-white/10"
                                                }`} />
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <label className={labelClass}>Confirm Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                                        <input id="reg-confirm" type={showConfirm ? "text" : "password"}
                                            placeholder="Re-enter your password" value={form.confirmPassword}
                                            onChange={(e) => update("confirmPassword", e.target.value)}
                                            className={inputClass + " pl-11 pr-12"} />
                                        <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60">
                                            {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                    {form.confirmPassword && (
                                        <p className={`text-xs mt-1 ${form.password === form.confirmPassword ? "text-green-400" : "text-red-400"}`}>
                                            {form.password === form.confirmPassword ? "✓ Passwords match" : "✗ Passwords do not match"}
                                        </p>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Navigation Buttons */}
                        <div className="flex gap-3 mt-7">
                            {step > 0 && (
                                <button type="button" onClick={back}
                                    className="flex-1 py-3.5 bg-white/5 border border-white/10 text-white/70 font-semibold rounded-xl hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                                    <ChevronLeft className="w-4 h-4" /> Back
                                </button>
                            )}
                            {step < 2 ? (
                                <button type="button" onClick={next}
                                    className="flex-1 py-3.5 bg-gradient-to-r from-[#366861] to-[#2a5048] text-white font-bold rounded-xl hover:opacity-90 transition-all hover:shadow-lg hover:shadow-[#366861]/30 hover:-translate-y-0.5 flex items-center justify-center gap-2">
                                    Continue <ChevronRight className="w-4 h-4" />
                                </button>
                            ) : (
                                <button id="reg-submit" type="submit" disabled={loading}
                                    className="flex-1 py-3.5 bg-gradient-to-r from-[#d4868e] to-[#c06870] text-white font-bold rounded-xl hover:opacity-90 transition-all hover:shadow-lg hover:shadow-[#d4868e]/30 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                                    {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Creating Account...</> : "🎉 Create Account"}
                                </button>
                            )}
                        </div>
                    </form>

                    <p className="text-center text-white/40 text-sm mt-5">
                        Already have an account?{" "}
                        <Link href="/auth/login" className="text-[#d4868e] hover:text-[#e09aa2] font-semibold transition-colors">
                            Sign in
                        </Link>
                    </p>
                </div>

                <p className="text-center text-white/20 text-xs mt-6">
                    <Link href="/" className="hover:text-white/40 transition-colors">← Back to SR Welfare Trust</Link>
                </p>
            </div>
        </div>
    );
}
