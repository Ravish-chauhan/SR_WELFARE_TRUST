"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff, Mail, Lock, AlertCircle, Loader2 } from "lucide-react";

export default function LoginPage() {
    const router = useRouter();
    const [form, setForm] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (!res.ok) {
                setError(data.error || "Login failed");
                return;
            }
            if (data.user.role === "admin") {
                router.push("/admin");
            } else {
                router.push("/profile");
            }
        } catch {
            setError("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-[#0f2525] via-[#1a3a3a] to-[#0d1f1f]">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#366861]/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#d4868e]/10 rounded-full blur-[80px]" />
            </div>

            <div className="relative w-full max-w-md">
                {/* Card */}
                <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-[0_40px_100px_rgba(0,0,0,0.4)]">
                    {/* Logo */}
                    <div className="flex justify-center mb-8">
                        <Link href="/">
                            <Image
                                src="/logo2.svg"
                                alt="SR Welfare Trust"
                                width={120}
                                height={120}
                                className="w-24 h-24 object-contain"
                            />
                        </Link>
                    </div>

                    <h1 className="text-2xl font-bold text-white text-center mb-1">Welcome Back</h1>
                    <p className="text-white/50 text-sm text-center mb-8">Sign in to your SR Welfare Trust account</p>

                    {error && (
                        <div className="flex items-center gap-2 bg-red-500/10 border border-red-400/30 text-red-300 rounded-xl px-4 py-3 mb-6 text-sm">
                            <AlertCircle className="w-4 h-4 flex-shrink-0" />
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email */}
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                            <input
                                id="login-email"
                                type="email"
                                placeholder="Email address"
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                required
                                className="w-full pl-11 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-[#366861] focus:bg-white/10 transition-all text-sm"
                            />
                        </div>

                        {/* Password */}
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                            <input
                                id="login-password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                value={form.password}
                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                                required
                                className="w-full pl-11 pr-12 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-[#366861] focus:bg-white/10 transition-all text-sm"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                            >
                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>

                        {/* Submit */}
                        <button
                            id="login-submit"
                            type="submit"
                            disabled={loading}
                            className="w-full py-3.5 bg-gradient-to-r from-[#366861] to-[#2a5048] text-white font-bold rounded-xl hover:opacity-90 transition-all hover:shadow-lg hover:shadow-[#366861]/30 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Signing in...</> : "Sign In"}
                        </button>
                    </form>

                    <p className="text-center text-white/40 text-sm mt-6">
                        Don&apos;t have an account?{" "}
                        <Link href="/auth/register" className="text-[#d4868e] hover:text-[#e09aa2] font-semibold transition-colors">
                            Register here
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
