"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
    ChevronRight, ChevronLeft, CheckCircle, Loader2,
    Home, Award, User, MapPin, BookOpen, Info,
    GraduationCap, FileText
} from "lucide-react";

const BRAND = "#366861";
const BRAND_DARK = "#2a5048";
const BRAND_LIGHT = "#e8f2f0";

const STATES = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
    "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
    "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
    "Delhi", "Jammu & Kashmir", "Ladakh",
];

const steps = [
    { id: 1, label: "Personal", icon: User },
    { id: 2, label: "Address", icon: MapPin },
    { id: 3, label: "Academic", icon: BookOpen },
    { id: 4, label: "Review", icon: FileText },
];

const initialForm = {
    name: "", fatherName: "", dob: "", gender: "", category: "",
    phone: "", email: "", street: "", city: "", district: "", state: "", pincode: "",
    studentClass: "", board: "", schoolName: "", neetAttempt: "",
    paymentProof: "",
};
type FormState = typeof initialForm;

export default function ScholarshipTestPage() {
    const [step, setStep] = useState(1);
    const [form, setForm] = useState<FormState>(initialForm);
    const [errors, setErrors] = useState<Partial<FormState>>({});
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [submitError, setSubmitError] = useState("");

    const set = (field: keyof FormState, value: string) => {
        setForm(prev => ({ ...prev, [field]: value }));
        setErrors(prev => ({ ...prev, [field]: "" }));
    };

    const inputClass = (field: keyof FormState) =>
        `w-full px-3.5 py-2.5 bg-white border rounded-lg text-gray-800 placeholder:text-gray-400 focus:outline-none text-sm transition-all ${errors[field]
            ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
            : "border-gray-200 focus:border-[#366861] focus:ring-2 focus:ring-[#366861]/10"
        }`;

    const selectClass = (field: keyof FormState) =>
        `w-full px-3.5 py-2.5 bg-white border rounded-lg text-gray-800 focus:outline-none text-sm transition-all appearance-none cursor-pointer ${errors[field]
            ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
            : "border-gray-200 focus:border-[#366861] focus:ring-2 focus:ring-[#366861]/10"
        }`;

    const validateStep = (s: number): boolean => {
        const errs: Partial<FormState> = {};
        if (s === 1) {
            if (!form.name.trim()) errs.name = "This field is required";
            if (!form.fatherName.trim()) errs.fatherName = "This field is required";
            if (!form.studentClass) errs.studentClass = "Please select an option";
            if (!form.dob) errs.dob = "This field is required";
            if (!form.gender) errs.gender = "Please select an option";
            if (!form.category) errs.category = "Please select an option";
            if (!form.phone || !/^\d{10}$/.test(form.phone)) errs.phone = "Enter a valid 10-digit number";
        }
        if (s === 2) {
            if (!form.street.trim()) errs.street = "This field is required";
            if (!form.city.trim()) errs.city = "This field is required";
            if (!form.district.trim()) errs.district = "This field is required";
            if (!form.state) errs.state = "Please select a state";
            if (!form.pincode || !/^\d{6}$/.test(form.pincode)) errs.pincode = "Enter a valid 6-digit pincode";
        }
        if (s === 3) {
            if (!form.board) errs.board = "Please select an option";
            if (!form.schoolName.trim()) errs.schoolName = "This field is required";
            if (!form.neetAttempt) errs.neetAttempt = "Please select an option";
        }
        // Step 4 is review only — no validation needed
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const nextStep = () => { if (validateStep(step)) setStep(s => s + 1); };
    const prevStep = () => setStep(s => s - 1);

    const handleSubmit = async () => {
        if (!form.paymentProof) {
            setSubmitError("PAYMENT_MISSING");
            return;
        }
        setSubmitting(true);
        setSubmitError("");
        try {
            const res = await fetch("/api/scholarship-student", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (!res.ok) { setSubmitError(data.error || "Submission failed"); return; }
            setSubmitted(true);
        } catch {
            setSubmitError("Network error. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-[#f5faf9] flex items-center justify-center px-4 py-12">
                <div className="w-full max-w-lg">
                    <div className="bg-white rounded-2xl shadow-sm border border-[#366861]/15 overflow-hidden">
                        <div className="h-2 bg-[#366861]" />
                        <div className="p-8 text-center">
                            <div className="w-20 h-20 bg-[#366861]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle className="w-10 h-10 text-[#366861]" />
                            </div>
                            <h1 className="text-2xl font-bold text-gray-800 mb-2">Application Submitted! 🎉</h1>
                            <p className="text-gray-600 text-sm mb-1">
                                Thank you, <span className="font-semibold text-[#366861]">{form.name}</span>!
                            </p>
                            <p className="text-gray-500 text-sm mb-5">
                                Our team will reach out to you on <span className="font-semibold text-gray-700">{form.phone}</span> with exam center details, date, and further instructions.
                            </p>
                            <div className="bg-[#f5faf9] border border-[#366861]/15 rounded-xl p-4 text-left mb-5">
                                <p className="text-xs font-semibold text-[#366861]/60 uppercase tracking-wider mb-3">Application Summary</p>
                                <div className="space-y-2">
                                    {[
                                        ["Student Name", form.name],
                                        ["Father's Name", form.fatherName],
                                        ["Class", form.studentClass],
                                        ["Board", form.board],
                                        ["Category", form.category],
                                        ["City", form.city + ", " + form.state],
                                    ].map(([k, v]) => (
                                        <div key={k} className="flex justify-between text-sm gap-4">
                                            <span className="text-gray-500 shrink-0">{k}</span>
                                            <span className="text-gray-800 font-medium text-right">{v}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-5 text-left">
                                <p className="text-amber-800 text-xs font-semibold mb-1">📅 Expected Exam Date</p>
                                <p className="text-amber-700 text-sm font-bold">26 July 2026</p>
                                <p className="text-amber-600 text-xs mt-1">Exact venue & time will be shared via call/SMS</p>
                            </div>
                            <Link href="/"
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#366861] hover:bg-[#2a5048] text-white text-sm font-semibold rounded-lg transition-colors">
                                <Home className="w-4 h-4" /> Back to Home
                            </Link>
                        </div>
                    </div>
                    <p className="text-center text-gray-400 text-xs mt-4">SR Welfare Trust · All data is kept confidential</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f5faf9]">

            {/* ── Image Strip ─────────────────────────────── */}
            <div className="relative w-full h-28 sm:h-36 overflow-hidden">
                <Image
                    src="/education-banner.png"
                    alt="Education"
                    fill
                    className="object-cover object-center"
                    priority
                />
                {/* Green overlay tint */}
                <div className="absolute inset-0 bg-[#366861]/55" />
            </div>

            {/* ── Form Info Card ───────────────────────────── */}
            <div className="max-w-2xl mx-auto px-4 sm:px-6 -mt-6 relative z-10">
                <div className="bg-white rounded-2xl shadow-sm border border-[#366861]/12 p-5">
                    {/* Title block */}
                    <div className="flex items-start gap-3 mb-4">
                        <div className="w-16 h-16 flex-shrink-0 overflow-hidden flex items-center justify-center">
                            <Image
                                src="/logo2.svg"
                                alt="SR Welfare Trust"
                                width={80}
                                height={80}
                                className="w-[80px] h-[80px] object-contain scale-[2.8] origin-center"
                            />
                        </div>
                        <div>
                            <h1 className="text-gray-900 font-bold text-lg leading-tight">
                                NEET Scholarship Test — Registration Form
                            </h1>
                            <p className="text-gray-500 text-xs mt-1 leading-relaxed">
                                SR Welfare Trust is conducting an <span className="text-[#366861] font-medium">offline NEET Scholarship Test</span> for meritorious students. Selected candidates receive a scholarship of <span className="text-[#366861] font-semibold">up to ₹40,000</span>, full study material support &amp; personal mentorship.
                            </p>
                            <div className="flex items-center gap-3 mt-2">
                                <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#366861] bg-[#366861]/8 border border-[#366861]/15 rounded-full px-2.5 py-1">
                                    📅 Expected Exam: 26 July 2026
                                </span>
                                <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 rounded-full px-2.5 py-1">
                                    🏆 Up to ₹40,000 Scholarship
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* ── Compact Step Progress ────────────────── */}
                    <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center justify-between relative">
                            {/* connecting line */}
                            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-gray-200 z-0 mx-5" />
                            {steps.map((s) => {
                                const Icon = s.icon;
                                const isDone = step > s.id;
                                const isActive = step === s.id;
                                return (
                                    <div key={s.id} className="flex flex-col items-center gap-1 z-10 flex-1">
                                        <div className={`w-7 h-7 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${isDone
                                            ? "bg-[#366861] border-[#366861]"
                                            : isActive
                                                ? "bg-white border-[#366861]"
                                                : "bg-white border-gray-200"
                                            }`}>
                                            {isDone
                                                ? <CheckCircle className="w-3.5 h-3.5 text-white" />
                                                : <Icon className={`w-3 h-3 ${isActive ? "text-[#366861]" : "text-gray-300"}`} />
                                            }
                                        </div>
                                        <span className={`text-[10px] font-medium ${isActive ? "text-[#366861]" : isDone ? "text-[#366861]/60" : "text-gray-300"}`}>
                                            {s.label}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                        {/* thin progress bar */}
                        <div className="mt-3 h-1 bg-gray-100 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-[#366861] rounded-full transition-all duration-500"
                                style={{ width: `${(step / steps.length) * 100}%` }}
                            />
                        </div>
                        <p className="text-right text-[10px] text-gray-400 mt-1">Step {step} of {steps.length}</p>
                    </div>
                </div>

                {/* ── Form Fields Card ─────────────────────── */}
                <div className="bg-white rounded-2xl border border-[#366861]/12 shadow-sm mt-3 overflow-hidden">
                    <div className="px-6 py-5 space-y-5">

                        {/* STEP 1 – Personal Info */}
                        {step === 1 && (
                            <>
                                <SectionTitle icon={<User className="w-3.5 h-3.5" />} title="Personal Information" />
                                <Field label="Full Name" required error={errors.name}>
                                    <input id="name" type="text" placeholder="Enter student's full name"
                                        value={form.name} onChange={e => set("name", e.target.value)} className={inputClass("name")} />
                                </Field>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <Field label="Father's Name" required error={errors.fatherName}>
                                    <input id="fatherName" type="text" placeholder="Father's full name"
                                        value={form.fatherName} onChange={e => set("fatherName", e.target.value)} className={inputClass("fatherName")} />
                                </Field>
                                    <Field label="Current Class" required error={errors.studentClass}>
                                        <select id="studentClass" value={form.studentClass} onChange={e => set("studentClass", e.target.value)} className={selectClass("studentClass")}>
                                            <option value="">Select class</option>
                                            {["10th", "11th", "12th", "Dropper"].map(c => <option key={c} value={c}>{c}</option>)}
                                        </select>
                                    </Field>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <Field label="Date of Birth" required error={errors.dob}>
                                        <input id="dob" type="date" value={form.dob}
                                            onChange={e => set("dob", e.target.value)} className={inputClass("dob")} />
                                    </Field>
                                    <Field label="Mobile Number" required error={errors.phone}>
                                        <input id="phone" type="tel" placeholder="10-digit mobile" maxLength={10}
                                            value={form.phone} onChange={e => set("phone", e.target.value.replace(/\D/, ""))} className={inputClass("phone")} />
                                    </Field>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <Field label="Gender" required error={errors.gender}>
                                        <select id="gender" value={form.gender} onChange={e => set("gender", e.target.value)} className={selectClass("gender")}>
                                            <option value="">Select gender</option>
                                            {["Male", "Female", "Other"].map(g => <option key={g} value={g}>{g}</option>)}
                                        </select>
                                    </Field>
                                    <Field label="Category" required error={errors.category}>
                                        <select id="category" value={form.category} onChange={e => set("category", e.target.value)} className={selectClass("category")}>
                                            <option value="">Select category</option>
                                            {["General", "OBC", "SC", "ST", "EWS"].map(c => <option key={c} value={c}>{c}</option>)}
                                        </select>
                                    </Field>
                                </div>
                                <Field label="Email Address (Optional)" error={errors.email}>
                                    <input id="email" type="email" placeholder="student@email.com"
                                        value={form.email} onChange={e => set("email", e.target.value)} className={inputClass("email")} />
                                </Field>
                            </>
                        )}

                        {/* STEP 2 – Address */}
                        {step === 2 && (
                            <>
                                <SectionTitle icon={<MapPin className="w-3.5 h-3.5" />} title="Address Details" />
                                <Field label="Street / Village / Locality" required error={errors.street}>
                                    <input id="street" type="text" placeholder="e.g. 12, Gandhi Nagar, Near SBI Bank"
                                        value={form.street} onChange={e => set("street", e.target.value)} className={inputClass("street")} />
                                </Field>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <Field label="City / Town" required error={errors.city}>
                                        <input id="city" type="text" placeholder="e.g. Jaipur"
                                            value={form.city} onChange={e => set("city", e.target.value)} className={inputClass("city")} />
                                    </Field>
                                    <Field label="District" required error={errors.district}>
                                        <input id="district" type="text" placeholder="e.g. Jaipur"
                                            value={form.district} onChange={e => set("district", e.target.value)} className={inputClass("district")} />
                                    </Field>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <Field label="State" required error={errors.state}>
                                        <select id="state" value={form.state} onChange={e => set("state", e.target.value)} className={selectClass("state")}>
                                            <option value="">Select state</option>
                                            {STATES.map(s => <option key={s} value={s}>{s}</option>)}
                                        </select>
                                    </Field>
                                    <Field label="Pincode" required error={errors.pincode}>
                                        <input id="pincode" type="text" placeholder="6-digit pincode" maxLength={6}
                                            value={form.pincode} onChange={e => set("pincode", e.target.value.replace(/\D/, ""))} className={inputClass("pincode")} />
                                    </Field>
                                </div>

                                {/* ── Registration Fee QR ── */}
                                <div className="mt-2 border border-[#366861]/20 rounded-xl overflow-hidden">
                                    <div className="bg-[#366861] px-4 py-2.5 flex items-center gap-2">
                                        <span className="text-white text-sm font-semibold">💳 Registration Fee — ₹100</span>
                                        <span className="ml-auto text-white/70 text-xs">Scan &amp; Pay · Upload Proof</span>
                                    </div>
                                    <div className="p-4 bg-[#f5faf9] flex flex-col sm:flex-row gap-5 items-start">
                                        {/* QR */}
                                        <div className="flex flex-col items-center gap-1.5 flex-shrink-0 mx-auto sm:mx-0">
                                            <div className="border-2 border-[#366861]/25 rounded-xl p-1.5 bg-white shadow-sm">
                                                <Image
                                                    src="/qr.jpeg"
                                                    alt="UPI QR Code — ₹100 Registration Fee"
                                                    width={130}
                                                    height={130}
                                                    className="w-[130px] h-[130px] object-contain rounded-lg"
                                                />
                                            </div>
                                            <p className="text-[11px] font-semibold text-[#366861]">Scan to Pay ₹100</p>
                                            <p className="text-[10px] text-gray-400">UPI · Canara Bank</p>
                                            <a
                                                href="/qr.jpeg"
                                                download="SR-Welfare-UPI-QR.jpeg"
                                                className="mt-1 flex items-center gap-1 px-3 py-1.5 bg-[#366861] hover:bg-[#2a5048] text-white text-[10px] font-semibold rounded-lg transition-colors"
                                            >
                                                ⬇ Download QR
                                            </a>
                                        </div>
                                        {/* Steps + Upload */}
                                        <div className="flex-1 space-y-3">
                                            <div className="text-xs text-gray-600 space-y-1.5">
                                                <p className="font-semibold text-gray-800">Steps to pay:</p>
                                                <p>1️⃣ Scan the QR with GPay, PhonePe, Paytm or any UPI app</p>
                                                <p>2️⃣ Pay exactly <span className="font-bold text-[#366861]">₹100</span> as registration fee</p>
                                                <p>3️⃣ Screenshot the payment confirmation</p>
                                                <p>4️⃣ Upload the screenshot below</p>
                                            </div>
                                            <div>
                                                <p className="text-xs font-semibold text-gray-700 mb-1.5">
                                                    Upload Payment Screenshot
                                                    <span className="text-gray-400 font-normal ml-1">(optional)</span>
                                                </p>
                                                {form.paymentProof ? (
                                                    <div className="relative inline-block w-full">
                                                        <img src={form.paymentProof} alt="Payment proof" className="w-full max-h-40 object-contain border border-[#366861]/20 rounded-lg bg-white" />
                                                        <button type="button" onClick={() => set("paymentProof", "")}
                                                            className="absolute top-1.5 right-1.5 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full text-xs font-bold flex items-center justify-center shadow transition-colors">
                                                            ✕
                                                        </button>
                                                        <p className="text-[10px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">✓ Screenshot uploaded</p>
                                                    </div>
                                                ) : (
                                                    <label className="flex flex-col items-center justify-center gap-1.5 border-2 border-dashed border-[#366861]/30 hover:border-[#366861]/60 hover:bg-[#366861]/5 rounded-xl p-5 cursor-pointer transition-all">
                                                        <span className="text-3xl">📸</span>
                                                        <span className="text-xs font-medium text-gray-600">Click to upload screenshot</span>
                                                        <span className="text-[10px] text-gray-400">JPG, PNG, WEBP · Max 2MB</span>
                                                        <input type="file" accept="image/*" className="hidden"
                                                            onChange={(e) => {
                                                                const file = e.target.files?.[0];
                                                                if (!file) return;
                                                                
                                                                if (file.size > 2 * 1024 * 1024) { 
                                                                    alert("File is too large. Max 2MB limit for payment proofs."); 
                                                                    return; 
                                                                }
                                                                
                                                                const reader = new FileReader();
                                                                reader.onload = () => set("paymentProof", reader.result as string);
                                                                reader.readAsDataURL(file);
                                                            }}
                                                        />
                                                    </label>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}

                        {/* STEP 3 – Academic */}
                        {step === 3 && (
                            <>
                                <SectionTitle icon={<BookOpen className="w-3.5 h-3.5" />} title="Academic Information" />
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <Field label="Board" required error={errors.board}>
                                        <select id="board" value={form.board} onChange={e => set("board", e.target.value)} className={selectClass("board")}>
                                            <option value="">Select board</option>
                                            {["CBSE", "State Board", "ICSE", "Other"].map(b => <option key={b} value={b}>{b}</option>)}
                                        </select>
                                    </Field>
                                    <Field label="NEET Attempt" required error={errors.neetAttempt}>
                                        <select id="neetAttempt" value={form.neetAttempt} onChange={e => set("neetAttempt", e.target.value)} className={selectClass("neetAttempt")}>
                                            <option value="">Select attempt</option>
                                            {["1st", "2nd", "3rd+"].map(a => <option key={a} value={a}>{a} Attempt</option>)}
                                        </select>
                                    </Field>
                                </div>
                                <Field label="School / College Name" required error={errors.schoolName}>
                                    <input id="schoolName" type="text" placeholder="e.g. Delhi Public School, Jaipur"
                                        value={form.schoolName} onChange={e => set("schoolName", e.target.value)} className={inputClass("schoolName")} />
                                </Field>
                            </>
                        )}

                        {/* STEP 4 – Review & Submit */}
                        {step === 4 && (
                            <>
                                <SectionTitle icon={<FileText className="w-3.5 h-3.5" />} title="Review Your Application" />
                                <div className="bg-[#f5faf9] border border-[#366861]/15 rounded-xl p-4">
                                    <div className="grid grid-cols-2 gap-x-6 gap-y-2.5">
                                        {[
                                            ["Name", form.name], ["Father", form.fatherName],
                                            ["Phone", form.phone], ["Gender", form.gender],
                                            ["Category", form.category], ["Class", form.studentClass],
                                            ["Board", form.board], ["Attempt", form.neetAttempt],
                                            ["School", form.schoolName], ["City", form.city],
                                            ["District", form.district], ["State", form.state],
                                            ["Pincode", form.pincode],
                                        ].filter(([, v]) => v).map(([k, v]) => (
                                            <div key={k} className="flex gap-1 text-xs">
                                                <span className="text-gray-400 shrink-0 w-16">{k}:</span>
                                                <span className="text-gray-700 font-medium truncate">{v}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-start gap-2">
                                    <span className="text-lg">📅</span>
                                    <div>
                                        <p className="text-amber-800 text-xs font-semibold">Expected Exam Date: <span className="text-amber-900">26 July 2026</span></p>
                                        <p className="text-amber-600 text-xs mt-0.5">Our team will contact you with exact venue &amp; timing after registration.</p>
                                    </div>
                                </div>

                                {/* Payment proof status */}
                                {form.paymentProof ? (
                                    <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2.5">
                                        <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                                        <p className="text-emerald-700 text-xs font-medium">Payment screenshot attached ✔</p>
                                    </div>
                                ) : (
                                    <div className="bg-red-50 border border-red-300 rounded-xl p-4">
                                        <div className="flex items-start gap-2.5 mb-3">
                                            <span className="text-xl flex-shrink-0">💳</span>
                                            <div>
                                                <p className="text-red-700 text-sm font-semibold">Payment Proof Required</p>
                                                <p className="text-red-500 text-xs mt-0.5">You must pay the ₹100 registration fee and upload the payment screenshot before submitting.</p>
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => { setSubmitError(""); setStep(2); }}
                                            className="w-full flex items-center justify-center gap-2 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-lg transition-colors"
                                        >
                                            <ChevronLeft className="w-4 h-4" /> Go back &amp; upload payment proof
                                        </button>
                                    </div>
                                )}

                                {submitError && submitError !== "PAYMENT_MISSING" && (
                                    <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg px-4 py-3 text-sm">
                                        {submitError}
                                    </div>
                                )}
                            </>
                        )}
                    </div>

                    {/* ── Footer Nav ──────────────────────────── */}
                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                        {step > 1
                            ? <button onClick={prevStep}
                                className="flex items-center gap-1.5 px-4 py-2 border border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg text-sm font-medium transition-colors">
                                <ChevronLeft className="w-4 h-4" /> Back
                            </button>
                            : <div />
                        }
                        {step < 4
                            ? <button onClick={nextStep}
                                className="flex items-center gap-1.5 px-5 py-2 bg-[#366861] hover:bg-[#2a5048] text-white rounded-lg text-sm font-semibold shadow-sm transition-colors">
                                Next <ChevronRight className="w-4 h-4" />
                            </button>
                            : <button onClick={handleSubmit} disabled={submitting}
                                className="flex items-center gap-1.5 px-5 py-2 bg-[#366861] hover:bg-[#2a5048] text-white rounded-lg text-sm font-semibold shadow-sm transition-colors disabled:opacity-60">
                                {submitting
                                    ? <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</>
                                    : <><CheckCircle className="w-4 h-4" /> Submit Application</>
                                }
                            </button>
                        }
                    </div>
                </div>

                <div className="text-center my-6 space-y-1.5">
                    <p className="text-gray-500 text-xs font-medium">
                        Need help? Call us: <a href="tel:+918920233946" className="text-[#366861] font-semibold hover:underline">+91 89202 33946</a>
                    </p>
                    <p className="text-gray-400 text-xs">© SR Welfare Trust · NEET Scholarship Test 2025–26 · All submissions are confidential</p>
                </div>
            </div>
        </div>
    );
}

function SectionTitle({ icon, title }: { icon: React.ReactNode; title: string }) {
    return (
        <div className="flex items-center gap-2 pb-1 border-b border-[#366861]/10 mb-1">
            <div className="w-6 h-6 bg-[#366861]/10 rounded-md flex items-center justify-center text-[#366861]">
                {icon}
            </div>
            <h2 className="text-gray-700 font-semibold text-sm">{title}</h2>
        </div>
    );
}

function Field({ label, required, error, children }: {
    label: string; required?: boolean; error?: string; children: React.ReactNode;
}) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                {label}{required && <span className="text-red-500 ml-0.5">*</span>}
            </label>
            {children}
            {error && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <span className="inline-block w-3.5 h-3.5 bg-red-100 text-red-500 rounded-full text-[9px] font-bold text-center leading-[14px]">!</span>
                    {error}
                </p>
            )}
        </div>
    );
}
