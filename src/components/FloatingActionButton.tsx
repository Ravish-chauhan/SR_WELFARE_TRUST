"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Heart, MessageCircle, HandHeart, X } from "lucide-react";

export default function FloatingActionButton() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Add paths here if you want to hide the FAB on certain pages
  const hiddenPages: string[] = [];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const fab = document.getElementById("fab-wrapper");
      if (fab && !fab.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  if (hiddenPages.includes(pathname || "")) return null;

  return (
    <div
      id="fab-wrapper"
      className="fixed bottom-12 right-6 sm:bottom-8 sm:right-8 z-50 flex flex-col items-end pointer-events-none"
      onClick={(e) => {
        if (open) e.stopPropagation();
      }}
    >
      {/* Options */}
      <div
        className={`flex flex-col items-end mb-4 space-y-3 transition-all duration-500 ${
          open
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <button
          onClick={() => {
            const donateSection = document.getElementById("donate");
            if (donateSection) {
              donateSection.scrollIntoView({ behavior: "smooth" });
            }
            setOpen(false);
          }}
          className="option-btn donate-btn flex items-center gap-2 cursor-pointer"
        >
          <Heart size={18} className="pointer-events-none" /> Support Us
        </button>

        <button
          onClick={() => {
            const message = encodeURIComponent(
              "Hi! I would like to know more about the SR Welfare Trust and how I can help."
            );
            window.open(`https://wa.me/918920233946?text=${message}`, "_blank");
            setOpen(false);
          }}
          className="option-btn whatsapp-btn flex items-center gap-2 cursor-pointer"
        >
          <MessageCircle size={18} className="pointer-events-none" /> WhatsApp Us
        </button>
      </div>

      {/* Main Floating Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setOpen(!open);
        }}
        aria-label="Floating Action Button"
        className={`fab-bubble mobile-fab cursor-pointer ${open ? "fab-open" : ""} pointer-events-auto`}
      >
        {open ? (
          <X size={28} color="white" strokeWidth={2.5} className="pointer-events-none" />
        ) : (
          <HandHeart size={30} color="white" strokeWidth={2.2} className="pointer-events-none" />
        )}
      </button>

      <style>{`
        .fab-bubble {
          background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
          width: 70px;
          height: 70px;
          padding: 14px;
          border-radius: 50px 50px 20px 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 3px solid white;
          box-shadow: 0 10px 25px rgba(43, 122, 120, 0.3);
          transition: transform 220ms cubic-bezier(.2,.9,.3,1), box-shadow 220ms ease;
          cursor: pointer;
        }

        .fab-bubble:hover {
          transform: translateY(-4px) scale(1.04);
          box-shadow: 0 14px 30px rgba(43, 122, 120, 0.4);
        }

        @media (max-width: 480px) {
          .fab-bubble {
            width: 56px;
            height: 56px;
            padding: 8px;
            border-radius: 40px 40px 15px 40px;
          }
          .fab-bubble svg {
            width: 24px;
            height: 24px;
          }
          .mobile-fab {
            margin-right: -4px;
            margin-bottom: -4px;
          }

          .option-btn {
            margin-right: -4px;
            padding: 10px 16px !important;
            font-size: 14px !important;
          }
        }

        .fab-open {
          transform: scale(1.05);
          background: var(--accent); /* Turn accent color when open */
          box-shadow: 0 10px 25px rgba(212, 134, 142, 0.3);
        }

        .option-btn {
          background: rgba(43, 122, 120, 0.94); /* primary color transparent */
          color: #fff;
          padding: 12px 20px;
          border-radius: 14px;
          font-size: 15px;
          font-weight: 600;
          backdrop-filter: blur(6px);
          border: 1px solid rgba(255, 255, 255, 0.18);
          box-shadow: 0 6px 14px rgba(26, 58, 58, 0.18);
          transition: transform 180ms ease, background 180ms ease;
          cursor: pointer;
        }

        .option-btn:hover {
          transform: translateX(-6px);
          background: rgba(26, 58, 58, 1); /* primary-dark */
        }

        .donate-btn {
          background: linear-gradient(135deg, var(--accent) 0%, var(--accent-dark) 100%);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .donate-btn:hover {
          background: linear-gradient(135deg, var(--accent-dark) 0%, var(--accent) 100%);
          transform: translateX(-6px) scale(1.02);
        }

        .whatsapp-btn {
          background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .whatsapp-btn:hover {
          background: linear-gradient(135deg, #20BA5A 0%, #0E7A6E 100%);
          transform: translateX(-6px) scale(1.02);
        }

        /* Soft glowing pulse + gentle float */
        .fab-bubble:not(.fab-open) {
          animation: subtle-float 3.5s ease-in-out infinite, 
                     glow-pulse 4s ease-in-out infinite;
        }

        @keyframes subtle-float {
          0% { transform: translateY(0); }
          50% { transform: translateY(-4.5px); }
          100% { transform: translateY(0); }
        }

        @keyframes glow-pulse {
          0% {
            box-shadow: 0 10px 25px rgba(43, 122, 120, 0.28);
          }
          50% {
            box-shadow: 0 14px 32px rgba(43, 122, 120, 0.45);
          }
          100% {
            box-shadow: 0 10px 25px rgba(43, 122, 120, 0.28);
          }
        }
      `}</style>
    </div>
  );
}
