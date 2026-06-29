"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
    Users, CreditCard, LogOut, Plus, X, Search,
    CheckCircle, XCircle, Loader2, Home,
    Shield, Calendar, Phone, Mail, GraduationCap,
    MapPin, BookOpen, Award, ChevronDown, ChevronUp,
    User, LayoutDashboard, TrendingUp, FileText, Settings
} from "lucide-react";

interface UserData {
    _id: string;
    name: string;
    email: string;
    phone: string;
    city: string;
    state: string;
    gender: string;
    age: number;
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
    userId: { _id: string; name: string; email: string; phone: string } | string;
}

interface StudentData {
    _id: string;
    name: string;
    fatherName: string;
    dob: string;
    gender: string;
    category: string;
    phone: string;
    email?: string;
    street: string;
    city: string;
    district: string;
    state: string;
    pincode: string;
    studentClass: string;
    board: string;
    schoolName: string;
    neetAttempt: string;
    paymentProof?: string;
    createdAt: string;
}

interface LeadData {
    _id: string;
    name: string;
    fatherName: string;
    phone: string;
    studentClass: string;
    category: string;
    email?: string;
    createdAt: string;
    isConverted: boolean;
}
export default function AdminPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState<UserData[]>([]);
    const [cards, setCards] = useState<CardData[]>([]);
    const [students, setStudents] = useState<StudentData[]>([]);
    const [leads, setLeads] = useState<LeadData[]>([]);
    const [search, setSearch] = useState("");
    const [studentSearch, setStudentSearch] = useState("");
    const [activeTab, setActiveTab] = useState<"overview" | "users" | "cards" | "students">("overview");
    const [expandedStudent, setExpandedStudent] = useState<string | null>(null);
    const [showPartialLeads, setShowPartialLeads] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
    const [cardForm, setCardForm] = useState({ discountPercent: "", hospitalName: "", validUntil: "" });
    const [assigning, setAssigning] = useState(false);
    const [assignMsg, setAssignMsg] = useState("");

    useEffect(() => {
        Promise.all([
            fetch("/api/admin/users").then((r) => {
                if (r.status === 403 || r.status === 401) { router.push("/auth/login"); return null; }
                return r.json();
            }),
            fetch("/api/admin/assign-card").then((r) => r.json()),
            fetch("/api/admin/scholarship-students").then((r) => r.json()),
            fetch("/api/admin/scholarship-leads").then((r) => r.json()),
        ]).then(([userData, cardData, studentData, leadData]) => {
            if (userData) setUsers(userData.users || []);
            if (cardData) setCards(cardData.cards || []);
            if (studentData) setStudents(studentData.students || []);
            if (leadData) setLeads(leadData.leads || []);
        }).finally(() => setLoading(false));
    }, [router]);

    const handleLogout = async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        router.push("/");
    };

    const openAssignModal = (user: UserData) => {
        setSelectedUser(user);
        setCardForm({ discountPercent: "", hospitalName: "", validUntil: "" });
        setAssignMsg("");
        setShowModal(true);
    };

    const handleAssignCard = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedUser) return;
        setAssigning(true);
        setAssignMsg("");
        try {
            const res = await fetch("/api/admin/assign-card", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: selectedUser._id, ...cardForm }),
            });
            const data = await res.json();
            if (!res.ok) { setAssignMsg("Error: " + data.error); return; }
            setAssignMsg("✓ Card assigned successfully!");
            setCards((prev) => [data.card, ...prev]);
            setTimeout(() => setShowModal(false), 1500);
        } catch {
            setAssignMsg("Network error. Please try again.");
        } finally {
            setAssigning(false);
        }
    };

    const filtered = users.filter((u) =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase()) ||
        u.phone.includes(search)
    );

    const activeCards = cards.filter(c => c.isActive && new Date(c.validUntil) > new Date()).length;

    const inputCls = "w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/40 text-sm transition-all";

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <Loader2 className="w-7 h-7 text-indigo-400 animate-spin" />
                    <p className="text-slate-500 text-sm">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    const tabs = [
        { id: "overview", label: "Overview", icon: LayoutDashboard, count: undefined },
        { id: "users", label: "Users", icon: Users, count: users.length },
        { id: "cards", label: "Cards", icon: CreditCard, count: cards.length },
        { id: "students", label: "Scholarship", icon: GraduationCap, count: students.length },
    ] as const;

    return (
        <div className="min-h-screen bg-slate-950 text-white">

            {/* Sidebar */}
            <div className="flex">
                <aside className="hidden lg:flex flex-col w-60 min-h-screen bg-slate-900 border-r border-slate-800 fixed top-0 left-0 z-20">
                    {/* Logo */}
                    <div className="px-5 py-5 border-b border-slate-800">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                                <Shield className="w-4 h-4 text-white" />
                            </div>
                            <div>
                                <p className="text-white font-semibold text-sm leading-tight">SR Welfare</p>
                                <p className="text-indigo-400 text-xs">Admin Panel</p>
                            </div>
                        </div>
                    </div>
                    {/* Nav */}
                    <nav className="flex-1 px-3 py-4 space-y-1">
                        {tabs.map(({ id, label, icon: Icon, count }) => (
                            <button key={id} onClick={() => setActiveTab(id as typeof activeTab)}
                                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === id
                                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                                    }`}>
                                <span className="flex items-center gap-2.5">
                                    <Icon className="w-4 h-4" />
                                    {label}
                                </span>
                                {"count" in { count } && count !== undefined && (
                                    <span className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${activeTab === id ? "bg-white/20 text-white" : "bg-slate-700 text-slate-400"}`}>
                                        {count}
                                    </span>
                                )}
                            </button>
                        ))}
                    </nav>
                    {/* Bottom */}
                    <div className="px-3 py-4 border-t border-slate-800 space-y-1">
                        <Link href="/" className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-slate-800 transition-all">
                            <Home className="w-4 h-4" /> View Site
                        </Link>
                        <button onClick={handleLogout}
                            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all">
                            <LogOut className="w-4 h-4" /> Logout
                        </button>
                    </div>
                </aside>

                {/* Main content */}
                <div className="flex-1 lg:ml-60">
                    {/* Top bar */}
                    <header className="bg-slate-900 border-b border-slate-800 px-4 sm:px-6 py-4 flex items-center justify-between sticky top-0 z-10">
                        <div>
                            <h1 className="text-white font-semibold capitalize">
                                {activeTab === "overview" ? "Dashboard" : activeTab === "students" ? "Scholarship Applications" : activeTab}
                            </h1>
                            <p className="text-slate-500 text-xs">SR Welfare Trust Admin</p>
                        </div>
                        {/* Mobile tabs */}
                        <div className="flex items-center gap-2 lg:hidden">
                            {tabs.map(({ id, icon: Icon }) => (
                                <button key={id} onClick={() => setActiveTab(id as typeof activeTab)}
                                    className={`p-2 rounded-lg transition-all ${activeTab === id ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white hover:bg-slate-800"}`}>
                                    <Icon className="w-4 h-4" />
                                </button>
                            ))}
                            <button onClick={handleLogout} className="p-2 rounded-lg text-red-400 hover:bg-red-500/10">
                                <LogOut className="w-4 h-4" />
                            </button>
                        </div>
                    </header>

                    <main className="p-4 sm:p-6 max-w-6xl">

                        {/* Overview Tab */}
                        {activeTab === "overview" && (
                            <div className="space-y-6">
                                {/* Stat Cards */}
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                    {[
                                        { label: "Total Users", value: users.length, icon: Users, color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" },
                                        { label: "Cards Issued", value: cards.length, icon: CreditCard, color: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-500/20" },
                                        { label: "Active Cards", value: activeCards, icon: CheckCircle, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
                                        { label: "Scholarship Apps", value: students.length, icon: GraduationCap, color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20" },
                                        { label: "Form Leads", value: leads.length, icon: FileText, color: "text-pink-400", bg: "bg-pink-500/10", border: "border-pink-500/20" },
                                    ].map(stat => (
                                        <div key={stat.label} className={`bg-slate-900 border ${stat.border} rounded-xl p-5`}>
                                            <div className={`w-9 h-9 ${stat.bg} rounded-lg flex items-center justify-center mb-3`}>
                                                <stat.icon className={`w-4.5 h-4.5 ${stat.color}`} />
                                            </div>
                                            <div className="text-2xl font-bold text-white">{stat.value}</div>
                                            <div className="text-slate-500 text-xs mt-0.5">{stat.label}</div>
                                        </div>
                                    ))}
                                </div>

                                {/* Recent Activity */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
                                        <div className="flex items-center justify-between mb-4">
                                            <p className="text-white font-semibold text-sm">Recent Users</p>
                                            <button onClick={() => setActiveTab("users")} className="text-indigo-400 text-xs hover:text-indigo-300">View all →</button>
                                        </div>
                                        <div className="space-y-3">
                                            {users.slice(0, 5).map(u => (
                                                <div key={u._id} className="flex items-center gap-3">
                                                    <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400 font-bold text-sm flex-shrink-0">
                                                        {u.name.charAt(0)}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-white text-sm font-medium truncate">{u.name}</p>
                                                        <p className="text-slate-500 text-xs truncate">{u.email}</p>
                                                    </div>
                                                    <span className="text-slate-600 text-xs whitespace-nowrap">{new Date(u.createdAt).toLocaleDateString("en-IN")}</span>
                                                </div>
                                            ))}
                                            {users.length === 0 && <p className="text-slate-600 text-sm text-center py-4">No users yet</p>}
                                        </div>
                                    </div>
                                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
                                        <div className="flex items-center justify-between mb-4">
                                            <p className="text-white font-semibold text-sm">Recent Applications</p>
                                            <button onClick={() => setActiveTab("students")} className="text-indigo-400 text-xs hover:text-indigo-300">View all →</button>
                                        </div>
                                        <div className="space-y-3">
                                            {students.slice(0, 5).map(s => (
                                                <div key={s._id} className="flex items-center gap-3">
                                                    <div className="w-8 h-8 bg-amber-500/20 rounded-lg flex items-center justify-center text-amber-400 font-bold text-sm flex-shrink-0">
                                                        {s.name.charAt(0)}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-white text-sm font-medium truncate">{s.name}</p>
                                                        <p className="text-slate-500 text-xs">{s.studentClass} · {s.board}</p>
                                                    </div>
                                                    <span className="text-xs px-2 py-0.5 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full">{s.category}</span>
                                                </div>
                                            ))}
                                            {students.length === 0 && (
                                                <div className="text-center py-4">
                                                    <p className="text-slate-600 text-sm">No applications yet</p>
                                                    <p className="text-slate-700 text-xs mt-1">Share: <span className="text-indigo-400">/scholarship-test</span></p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Users Tab */}
                        {activeTab === "users" && (
                            <div>
                                <div className="relative mb-4">
                                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                    <input type="text" placeholder="Search users by name, email or phone..."
                                        value={search} onChange={(e) => setSearch(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 text-sm" />
                                </div>
                                <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                                    <div className="hidden sm:grid grid-cols-[1fr_1fr_120px_120px_100px] gap-4 px-5 py-3 border-b border-slate-800 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                        <span>Name</span><span>Email</span><span>Phone</span><span>Location</span><span>Action</span>
                                    </div>
                                    {filtered.length === 0 && (
                                        <div className="text-center py-12">
                                            <Users className="w-8 h-8 text-slate-700 mx-auto mb-2" />
                                            <p className="text-slate-600 text-sm">No users found</p>
                                        </div>
                                    )}
                                    {filtered.map((user, i) => (
                                        <div key={user._id} className={`flex flex-col sm:grid sm:grid-cols-[1fr_1fr_120px_120px_100px] gap-4 px-5 py-4 items-center ${i !== 0 ? "border-t border-slate-800/60" : ""} hover:bg-slate-800/40 transition-colors`}>
                                            <div className="flex items-center gap-3 w-full">
                                                <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400 font-bold text-sm flex-shrink-0">
                                                    {user.name.charAt(0)}
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="text-white text-sm font-medium truncate">{user.name}</p>
                                                    <p className="text-slate-500 text-xs">{user.gender}, {user.age}y</p>
                                                </div>
                                            </div>
                                            <p className="text-slate-400 text-sm truncate">{user.email}</p>
                                            <p className="text-slate-400 text-sm">{user.phone}</p>
                                            <p className="text-slate-400 text-sm truncate">{user.city}, {user.state}</p>
                                            <button onClick={() => openAssignModal(user)}
                                                className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold transition-colors whitespace-nowrap">
                                                <Plus className="w-3.5 h-3.5" /> Card
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Cards Tab */}
                        {activeTab === "cards" && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {cards.length === 0 && (
                                    <div className="col-span-full bg-slate-900 border border-slate-800 rounded-xl p-12 text-center">
                                        <CreditCard className="w-8 h-8 text-slate-700 mx-auto mb-2" />
                                        <p className="text-slate-600 text-sm">No cards issued yet</p>
                                    </div>
                                )}
                                {cards.map((card) => {
                                    const isExpired = new Date(card.validUntil) < new Date();
                                    const valid = card.isActive && !isExpired;
                                    const owner = typeof card.userId === "object" ? card.userId : null;
                                    return (
                                        <div key={card._id} className={`rounded-xl p-5 border ${valid ? "bg-indigo-600/10 border-indigo-500/30" : "bg-slate-900 border-slate-800 opacity-60"}`}>
                                            <div className="flex items-start justify-between mb-3">
                                                <div>
                                                    {owner && <p className="text-white font-semibold text-sm">{owner.name}</p>}
                                                    {owner && <p className="text-slate-500 text-xs">{owner.email}</p>}
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-2xl font-black text-white">{card.discountPercent}%</div>
                                                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${valid ? "bg-emerald-500/15 text-emerald-400" : "bg-red-500/15 text-red-400"}`}>
                                                        {valid ? "Active" : isExpired ? "Expired" : "Inactive"}
                                                    </span>
                                                </div>
                                            </div>
                                            <p className="text-white text-sm font-medium">{card.hospitalName}</p>
                                            <p className="text-slate-600 font-mono text-xs mt-1">{card.cardNumber}</p>
                                            <div className="flex justify-between text-xs text-slate-600 border-t border-slate-700/50 pt-3 mt-3">
                                                <span>By: {card.assignedBy}</span>
                                                <span>Until: {new Date(card.validUntil).toLocaleDateString("en-IN")}</span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        {/* Students Tab */}
                        {activeTab === "students" && (
                            <div>
                                <div className="flex flex-col sm:flex-row items-center gap-3 mb-4">
                                    <div className="relative flex-1 w-full">
                                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                        <input type="text" placeholder="Search by name, phone, school or city..."
                                            value={studentSearch} onChange={(e) => setStudentSearch(e.target.value)}
                                            className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 text-sm" />
                                    </div>
                                    <div className="bg-slate-900 border border-slate-800 p-1 rounded-lg flex shrink-0">
                                        <button onClick={() => setShowPartialLeads(false)}
                                            className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-all ${!showPartialLeads ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}>
                                            Complete ({students.length})
                                        </button>
                                        <button onClick={() => setShowPartialLeads(true)}
                                            className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-all ${showPartialLeads ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}>
                                            Partial Leads ({leads.length})
                                        </button>
                                    </div>
                                </div>

                                {showPartialLeads ? (
                                    <div className="space-y-3">
                                        {leads.length === 0 && (
                                            <div className="bg-slate-900 border border-slate-800 rounded-xl p-12 text-center">
                                                <FileText className="w-8 h-8 text-slate-700 mx-auto mb-2" />
                                                <p className="text-slate-500 text-sm">No leads captured yet</p>
                                            </div>
                                        )}
                                        {leads.map((lead) => (
                                            <div key={lead._id} className="bg-slate-900 border border-slate-800 rounded-xl px-5 py-4 flex items-center justify-between flex-wrap gap-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 bg-pink-500/15 border border-pink-500/20 rounded-xl flex items-center justify-center text-pink-400 font-bold flex-shrink-0">
                                                        {lead.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <div className="flex items-center gap-2">
                                                            <p className="text-white font-semibold text-sm">{lead.name}</p>
                                                            {lead.isConverted && (
                                                                <span className="text-[10px] px-2 py-0.5 bg-emerald-500/15 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center gap-1">
                                                                    <CheckCircle className="w-3 h-3" /> Converted
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1 text-xs text-slate-500">
                                                            <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{lead.phone}</span>
                                                            {lead.email && (
                                                                <>
                                                                    <span>•</span>
                                                                    <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{lead.email}</span>
                                                                </>
                                                            )}
                                                            <span>•</span>
                                                            <span>{lead.studentClass}</span>
                                                            <span>•</span>
                                                            <span>{lead.category}</span>
                                                            <span>•</span>
                                                            <span>{new Date(lead.createdAt).toLocaleDateString("en-IN")}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <a href={`tel:${lead.phone}`} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg text-xs font-medium transition-colors border border-slate-700 flex items-center gap-2">
                                                    <Phone className="w-3.5 h-3.5" /> Call Lead
                                                </a>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="space-y-2">
                                    {students.length === 0 && (
                                        <div className="bg-slate-900 border border-slate-800 rounded-xl p-12 text-center">
                                            <GraduationCap className="w-8 h-8 text-slate-700 mx-auto mb-2" />
                                            <p className="text-slate-500 text-sm">No applications yet</p>
                                            <p className="text-slate-700 text-xs mt-1">Share the link: <span className="text-indigo-400">/scholarship-test</span></p>
                                        </div>
                                    )}
                                    {students
                                        .filter(s =>
                                            s.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
                                            s.phone.includes(studentSearch) ||
                                            s.schoolName.toLowerCase().includes(studentSearch.toLowerCase()) ||
                                            s.city.toLowerCase().includes(studentSearch.toLowerCase())
                                        )
                                        .map((student) => {
                                            const isExpanded = expandedStudent === student._id;
                                            return (
                                                <div key={student._id} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                                                    <div className="flex items-center gap-4 px-5 py-4">
                                                        <div className="w-10 h-10 bg-amber-500/15 border border-amber-500/20 rounded-xl flex items-center justify-center text-amber-400 font-bold flex-shrink-0">
                                                            {student.name.charAt(0)}
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex items-center gap-2 flex-wrap">
                                                                <p className="text-white font-semibold text-sm">{student.name}</p>
                                                                <span className="text-xs px-2 py-0.5 bg-slate-800 border border-slate-700 text-slate-400 rounded-full">{student.studentClass}</span>
                                                                <span className="text-xs px-2 py-0.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-full">{student.category}</span>
                                                            </div>
                                                            <div className="flex flex-wrap gap-x-4 gap-y-0.5 mt-1">
                                                                <span className="text-slate-500 text-xs flex items-center gap-1"><Phone className="w-3 h-3" />{student.phone}</span>
                                                                {student.email && (
                                                                    <span className="text-slate-500 text-xs flex items-center gap-1"><Mail className="w-3 h-3" />{student.email}</span>
                                                                )}
                                                                <span className="text-slate-500 text-xs flex items-center gap-1"><BookOpen className="w-3 h-3" />{student.board} · {student.neetAttempt} attempt</span>
                                                                <span className="text-slate-500 text-xs flex items-center gap-1"><MapPin className="w-3 h-3" />{student.city}, {student.state}</span>
                                                                <span className="text-slate-500 text-xs flex items-center gap-1"><Calendar className="w-3 h-3" />{new Date(student.createdAt).toLocaleDateString("en-IN")}</span>
                                                            </div>
                                                        </div>
                                                        <button onClick={() => setExpandedStudent(isExpanded ? null : student._id)}
                                                            className="flex items-center gap-1 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-400 hover:text-white rounded-lg text-xs font-medium transition-all whitespace-nowrap">
                                                            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                                                            {isExpanded ? "Close" : "Details"}
                                                        </button>
                                                    </div>

                                                    {isExpanded && (
                                                        <div className="px-5 pb-5 pt-4 border-t border-slate-800">
                                                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                                                {[
                                                                    {
                                                                        title: "Personal", icon: <User className="w-3 h-3" />,
                                                                        rows: [
                                                                            ["Father", student.fatherName],
                                                                            ["DOB", new Date(student.dob).toLocaleDateString("en-IN")],
                                                                            ["Gender", student.gender],
                                                                            ["Category", student.category],
                                                                            ...(student.email ? [["Email", student.email]] : []),
                                                                        ]
                                                                    },
                                                                    {
                                                                        title: "Address", icon: <MapPin className="w-3 h-3" />,
                                                                        rows: [
                                                                            ["Street", student.street],
                                                                            ["City", student.city],
                                                                            ["District", student.district],
                                                                            ["State", student.state],
                                                                            ["Pincode", student.pincode],
                                                                        ]
                                                                    },
                                                                    {
                                                                        title: "Academic", icon: <BookOpen className="w-3 h-3" />,
                                                                        rows: [
                                                                            ["Class", student.studentClass],
                                                                            ["School", student.schoolName],
                                                                            ["Board", student.board],
                                                                            ["NEET Attempt", student.neetAttempt],
                                                                        ]
                                                                    }
                                                                ].map(section => (
                                                                    <div key={section.title} className="bg-slate-950/50 border border-slate-800 rounded-lg p-4">
                                                                        <p className="flex items-center gap-1.5 text-slate-500 text-xs font-semibold uppercase tracking-wider mb-3">
                                                                            {section.icon}{section.title}
                                                                        </p>
                                                                        <div className="space-y-2">
                                                                            {section.rows.map(([k, v]) => (
                                                                                <div key={k} className="flex gap-2 text-xs">
                                                                                    <span className="text-slate-600 w-20 shrink-0">{k}</span>
                                                                                    <span className="text-slate-300 break-all">{v}</span>
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>

                                                            {/* Payment Proof */}
                                                            <div className="mt-3">
                                                                {student.paymentProof ? (
                                                                    <div className="border border-slate-700 rounded-lg overflow-hidden">
                                                                        <p className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider bg-slate-800 px-4 py-2">
                                                                            <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> Payment Proof Submitted
                                                                        </p>
                                                                        <img src={student.paymentProof} alt="Payment proof" className="w-full max-h-52 object-contain bg-slate-950 p-2" />
                                                                    </div>
                                                                ) : (
                                                                    <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-lg px-4 py-2.5">
                                                                        <XCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                                                                        <p className="text-amber-400 text-xs font-medium">No payment proof submitted</p>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        )}
                    </main>
                </div>
            </div>

            {/* Assign Card Modal */}
            {showModal && selectedUser && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/70 backdrop-blur-sm">
                    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 w-full max-w-md shadow-2xl">
                        <div className="flex items-center justify-between mb-5">
                            <div>
                                <h2 className="text-white font-bold">Assign Discount Card</h2>
                                <p className="text-slate-400 text-sm mt-0.5">For: <span className="text-indigo-400 font-medium">{selectedUser.name}</span></p>
                            </div>
                            <button onClick={() => setShowModal(false)}
                                className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all">
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <form onSubmit={handleAssignCard} className="space-y-4">
                            <div>
                                <label className="block text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1.5">Hospital Name</label>
                                <input type="text" placeholder="e.g. City Care Hospital" required
                                    value={cardForm.hospitalName}
                                    onChange={(e) => setCardForm({ ...cardForm, hospitalName: e.target.value })}
                                    className={inputCls} />
                            </div>
                            <div>
                                <label className="block text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1.5">Discount Percent (%)</label>
                                <input type="number" placeholder="e.g. 20" min={1} max={100} required
                                    value={cardForm.discountPercent}
                                    onChange={(e) => setCardForm({ ...cardForm, discountPercent: e.target.value })}
                                    className={inputCls} />
                            </div>
                            <div>
                                <label className="block text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1.5">Valid Until</label>
                                <input type="date" required
                                    value={cardForm.validUntil}
                                    onChange={(e) => setCardForm({ ...cardForm, validUntil: e.target.value })}
                                    className={inputCls + " [color-scheme:dark]"} />
                            </div>

                            {assignMsg && (
                                <div className={`flex items-center gap-2 rounded-lg px-4 py-3 text-sm ${assignMsg.startsWith("✓")
                                    ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
                                    : "bg-red-500/10 border border-red-500/20 text-red-400"}`}>
                                    {assignMsg.startsWith("✓") ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                                    {assignMsg}
                                </div>
                            )}

                            <button type="submit" disabled={assigning}
                                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-60 flex items-center justify-center gap-2 text-sm">
                                {assigning ? <><Loader2 className="w-4 h-4 animate-spin" /> Assigning...</> : <><CreditCard className="w-4 h-4" /> Assign Card</>}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
