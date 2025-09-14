"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

interface ConsentState {
  essential: true; // always true
  analytics: boolean;
  preferences: boolean;
  affiliate: boolean;
  timestamp?: string;
}

const STORAGE_KEY = "tth_cookie_consent_v1";

export default function CookieConsentBanner() {
  const [open, setOpen] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);
  const [consent, setConsent] = useState<ConsentState | null>(null);

  useEffect(() => {
    // Only run client side
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as ConsentState;
        setConsent(parsed);
        setOpen(false);
      } else {
        setOpen(true);
      }
    } catch {
      setOpen(true);
    }
  }, []);

  const persist = (data: ConsentState) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    setConsent(data);
  };

  const acceptAll = () => {
    const data: ConsentState = {
      essential: true,
      analytics: true,
      preferences: true,
      affiliate: true,
      timestamp: new Date().toISOString(),
    };
    persist(data);
    setOpen(false);
  };

  const rejectNonEssential = () => {
    const data: ConsentState = {
      essential: true,
      analytics: false,
      preferences: false,
      affiliate: false,
      timestamp: new Date().toISOString(),
    };
    persist(data);
    setOpen(false);
  };

  const savePreferences = () => {
    if (!consent) return;
    persist({ ...consent, timestamp: new Date().toISOString() });
    setShowPrefs(false);
    setOpen(false);
  };

  if (consent && !open) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 pb-4 sm:px-6">
      <div className="w-full max-w-4xl rounded-xl shadow-lg border border-gray-200 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 p-5 md:p-6">
        {!showPrefs && (
          <div className="flex flex-col md:flex-row md:items-center gap-5">
            <div className="text-sm text-gray-600 md:flex-1">
              <p className="font-medium text-gray-900 mb-1">We use cookies & minimal tracking</p>
              <p>
                We use essential cookies for site reliability plus optional analytics, preference, and affiliate attribution cookies. See our {" "}
                <Link href="/privacy" className="text-blue-600 hover:text-blue-700 underline">Privacy Policy</Link>.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
              <button onClick={rejectNonEssential} className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition">
                Essential Only
              </button>
              <button onClick={() => setShowPrefs(true)} className="px-4 py-2 text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg text-sm font-medium transition">
                Customize
              </button>
              <button onClick={acceptAll} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold shadow-sm transition">
                Accept All
              </button>
            </div>
          </div>
        )}
        {showPrefs && (
          <div className="space-y-5">
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Cookie Preferences</h3>
              <p className="text-xs text-gray-500 mt-1">Enable or disable optional categories. Essential cookies are always active.</p>
            </div>
            <div className="space-y-4">
              <ToggleRow
                label="Analytics"
                description="Anonymous usage metrics to improve article quality."
                value={consent?.analytics ?? false}
                onChange={v => setConsent(prev => ({ ...(prev || { essential: true, analytics: false, preferences: false, affiliate: false }), analytics: v }))}
              />
              <ToggleRow
                label="Preferences"
                description="Save UI choices like theme or dismissed tips."
                value={consent?.preferences ?? false}
                onChange={v => setConsent(prev => ({ ...(prev || { essential: true, analytics: false, preferences: false, affiliate: false }), preferences: v }))}
              />
              <ToggleRow
                label="Affiliate Attribution"
                description="Helps vendors know a signup came from us; no personal profile building."
                value={consent?.affiliate ?? false}
                onChange={v => setConsent(prev => ({ ...(prev || { essential: true, analytics: false, preferences: false, affiliate: false }), affiliate: v }))}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:justify-end">
              <button onClick={() => setShowPrefs(false)} className="px-4 py-2 text-gray-600 hover:text-gray-800 rounded-lg text-sm font-medium">
                Back
              </button>
              <button onClick={rejectNonEssential} className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition">
                Essential Only
              </button>
              <button onClick={savePreferences} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold shadow-sm transition">
                Save Preferences
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

interface ToggleRowProps {
  label: string;
  description: string;
  value: boolean;
  onChange: (v: boolean) => void;
}

function ToggleRow({ label, description, value, onChange }: ToggleRowProps) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900">{label}</p>
        <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{description}</p>
      </div>
      <button
        type="button"
        aria-pressed={value}
        onClick={() => onChange(!value)}
        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${value ? 'bg-blue-600' : 'bg-gray-300'}`}
      >
        <span
          className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition ${value ? 'translate-x-5' : 'translate-x-1'}`}
        />
        <span className="sr-only">Toggle {label}</span>
      </button>
    </div>
  );
}