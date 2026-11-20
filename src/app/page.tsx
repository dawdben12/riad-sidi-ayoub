"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Clock,
  Info,
  Phone,
  Mail,
  MapPin,
  Sparkles,
  Check,
  ArrowRight,
  Instagram,
  Camera,
  Heart,
  Send,
  Menu,
  X,
} from "lucide-react";
import {
  Language,
  uiTranslations,
  lallaCard,
  startersList,
  menuSet1Mains,
  menuSet2SignatureMains,
  dessertsList,
  drinksList,
  wellnessList,
  wellnessComboItem,
  excursionsList,
  officialWelcomePost,
  GuestbookEntry,
  WHATSAPP_NUMBER,
  CONTACT_PHONE_DISPLAY,
  CONTACT_EMAIL,
  INSTAGRAM_URL,
  DishItem,
  DrinkItem,
  WellnessItem,
  ExcursionItem,
} from "@/data/conciergeData";
import BookingModal, { BookingPayload } from "@/components/BookingModal";

export default function ConciergePage() {
  const [lang, setLang] = useState<Language>("en");
  const [modalOpen, setModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bookingPayload, setBookingPayload] = useState<BookingPayload | null>(
    null
  );

  // Guestbook state: only real user-submitted posts + 1 official Riad Sidi Ayoub welcome post
  const [userGuestbookEntries, setUserGuestbookEntries] = useState<
    GuestbookEntry[]
  >([]);
  const [gbName, setGbName] = useState("");
  const [gbNote, setGbNote] = useState("");
  const [gbPhotoData, setGbPhotoData] = useState<string | undefined>(undefined);
  const [gbPhotoName, setGbPhotoName] = useState<string>("");
  const [gbSubmittedNotice, setGbSubmittedNotice] = useState(false);

  const t = uiTranslations[lang];
  const lc = lallaCard[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = "ltr";
  }, [lang]);

  useEffect(() => {
    try {
      localStorage.removeItem("riad_sidi_ayoub_guestbook_v1");
      const saved = localStorage.getItem("riad_sidi_ayoub_user_memories_v2");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setUserGuestbookEntries(parsed);
        }
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setGbPhotoData(undefined);
      setGbPhotoName("");
      return;
    }
    setGbPhotoName(file.name);
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setGbPhotoData(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleGuestbookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gbName.trim() || !gbNote.trim()) return;

    const now = new Date();
    const monthYear = now.toLocaleDateString(
      lang === "fr" ? "fr-FR" : lang === "es" ? "es-ES" : "en-US",
      { month: "long", year: "numeric" }
    );

    const newEntry: GuestbookEntry = {
      id: `gb-${Date.now()}`,
      name: gbName.trim(),
      date: monthYear,
      text: gbNote.trim(),
      photo: gbPhotoData,
    };

    const updated = [newEntry, ...userGuestbookEntries];
    setUserGuestbookEntries(updated);
    try {
      localStorage.setItem(
        "riad_sidi_ayoub_user_memories_v2",
        JSON.stringify(updated)
      );
    } catch {
      // Ignore quota errors if large photo
    }

    setGbName("");
    setGbNote("");
    setGbPhotoData(undefined);
    setGbPhotoName("");
    setGbSubmittedNotice(true);
    setTimeout(() => setGbSubmittedNotice(false), 5000);
  };

  const openMenuSet1Booking = (opts?: {
    starterId?: string;
    mainId?: string;
    dessertId?: string;
  }) => {
    setBookingPayload({
      kind: "menu_set_1",
      title: t.menu1Title,
      subtitle: t.menu1Subtitle,
      preselectedStarterId: opts?.starterId,
      preselectedMainId: opts?.mainId,
      preselectedDessertId: opts?.dessertId,
    });
    setModalOpen(true);
  };

  const openMenuSet2Booking = (opts?: {
    starterId?: string;
    mainId?: string;
    dessertId?: string;
  }) => {
    setBookingPayload({
      kind: "menu_set_2",
      title: t.menu2Title,
      subtitle: t.menu2Subtitle,
      preselectedStarterId: opts?.starterId,
      preselectedMainId: opts?.mainId,
      preselectedDessertId: opts?.dessertId,
    });
    setModalOpen(true);
  };

  const openDrinkBooking = (drink: DrinkItem) => {
    setBookingPayload({
      kind: "drink",
      title: `${drink.name[lang]} — ${drink.priceMad} MAD`,
      subtitle: drink.originalFr,
      drinkItem: drink,
    });
    setModalOpen(true);
  };

  const openWellnessBooking = (item: WellnessItem) => {
    setBookingPayload({
      kind: "wellness",
      title: `${item.name[lang]} (${item.duration[lang]} — ${item.priceMad} MAD)`,
      subtitle: item.tagline[lang],
      wellnessItem: item,
    });
    setModalOpen(true);
  };

  const openExcursionBooking = (exc: ExcursionItem) => {
    setBookingPayload({
      kind: "excursion",
      title: exc.name[lang],
      subtitle: `${exc.schedule[lang]} • ${exc.priceDisplay[lang]}`,
      excursionItem: exc,
    });
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#1A1A1A] font-sans">
      {/* STICKY QUIET LUXURY HEADER */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-[#E6E4DF]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
          <a
            href="#top"
            onClick={() => setMobileMenuOpen(false)}
            className="font-serif text-2xl sm:text-[26px] font-semibold tracking-tight text-[#1A1A1A]"
          >
            {t.riadName}
          </a>

          <div className="flex items-center gap-3">
            {/* Language Switcher: EN | FR | ES */}
            <div
              className="flex items-center text-xs font-medium tracking-wider text-[#63615C]"
              role="group"
              aria-label="Language Switcher"
            >
              {(["en", "fr", "es"] as Language[]).map((code, index) => {
                const active = lang === code;
                return (
                  <React.Fragment key={code}>
                    {index > 0 && (
                      <span className="mx-1.5 sm:mx-2 text-[#E6E4DF] select-none">
                        |
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => setLang(code)}
                      className={`px-1.5 py-1 transition-colors ${
                        active
                          ? "text-[#1A1A1A] font-semibold underline underline-offset-4"
                          : "text-[#63615C] hover:text-[#1A1A1A]"
                      }`}
                    >
                      {code.toUpperCase()}
                    </button>
                  </React.Fragment>
                );
              })}
            </div>

            {/* Mobile Hamburger Menu Button (md:hidden) */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-lg border border-[#E6E4DF] bg-[#FAF9F6] text-[#1A1A1A] hover:border-[#9A5B3A] transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Desktop Navigation Bar (hidden on mobile) */}
        <nav
          aria-label="Desktop section navigation"
          className="hidden md:block bg-white border-t border-[#E6E4DF]"
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4 h-12 text-xs sm:text-sm font-medium text-[#1A1A1A]">
            <div className="flex items-center gap-7">
              <a
                href="#top"
                className="whitespace-nowrap py-2.5 border-b-2 border-transparent hover:border-[#9A5B3A] transition-colors"
              >
                {t.tabWelcomeLalla}
              </a>
              <a
                href="#dining"
                className="whitespace-nowrap py-2.5 border-b-2 border-transparent hover:border-[#9A5B3A] transition-colors"
              >
                {t.tabMenu}
              </a>
              <a
                href="#wellness"
                className="whitespace-nowrap py-2.5 border-b-2 border-transparent hover:border-[#9A5B3A] transition-colors"
              >
                {t.tabWellness}
              </a>
              <a
                href="#excursions"
                className="whitespace-nowrap py-2.5 border-b-2 border-transparent hover:border-[#9A5B3A] transition-colors"
              >
                {t.tabExcursions}
              </a>
              <a
                href="#guestbook"
                className="whitespace-nowrap py-2.5 border-b-2 border-transparent hover:border-[#9A5B3A] transition-colors"
              >
                {t.guestbookWallTitle}
              </a>
            </div>

            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FAF9F6] hover:bg-[#9A5B3A] text-[#1A1A1A] hover:text-white border border-[#E6E4DF] hover:border-[#9A5B3A] text-xs font-medium whitespace-nowrap transition-all shrink-0 shadow-sm"
            >
              <Instagram className="w-3.5 h-3.5 text-[#9A5B3A] group-hover:text-white group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300" />
              <span>{t.instagramBtnLabel}</span>
            </a>
          </div>
        </nav>

        {/* Mobile Dropdown Drawer Menu (md:hidden) */}
        {mobileMenuOpen && (
          <nav
            aria-label="Mobile section navigation"
            className="md:hidden bg-white border-t border-[#E6E4DF] px-4 py-4 shadow-lg space-y-1.5"
          >
            <a
              href="#top"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3.5 py-2.5 rounded-lg text-sm font-medium text-[#1A1A1A] hover:bg-[#FAF9F6] transition-colors"
            >
              {t.tabWelcomeLalla}
            </a>
            <a
              href="#dining"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3.5 py-2.5 rounded-lg text-sm font-medium text-[#1A1A1A] hover:bg-[#FAF9F6] transition-colors"
            >
              {t.tabMenu}
            </a>
            <a
              href="#wellness"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3.5 py-2.5 rounded-lg text-sm font-medium text-[#1A1A1A] hover:bg-[#FAF9F6] transition-colors"
            >
              {t.tabWellness}
            </a>
            <a
              href="#excursions"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3.5 py-2.5 rounded-lg text-sm font-medium text-[#1A1A1A] hover:bg-[#FAF9F6] transition-colors"
            >
              {t.tabExcursions}
            </a>
            <a
              href="#guestbook"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3.5 py-2.5 rounded-lg text-sm font-medium text-[#1A1A1A] hover:bg-[#FAF9F6] transition-colors"
            >
              {t.guestbookTitle}
            </a>
            <div className="pt-2 border-t border-[#E6E4DF]">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="group flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg bg-[#9A5B3A] hover:bg-[#824A2D] text-white text-xs font-medium transition-colors"
              >
                <Instagram className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>{t.instagramBtnLabel}</span>
              </a>
            </div>
          </nav>
        )}
      </header>

      {/* QUIET LUXURY HERO & WELCOME SECTION */}
      <section id="top" className="bg-white border-b border-[#E6E4DF]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7 space-y-4">
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#63615C] font-medium">
                {t.citySubtitle}
              </p>
              <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-[#1A1A1A] leading-[1.15]">
                {t.heroTitle}
              </h1>
              <p className="text-sm sm:text-base text-[#63615C] leading-relaxed max-w-xl">
                {t.heroSubtitle}
              </p>
            </div>
            <div className="md:col-span-5">
              <div className="aspect-[16/11] w-full overflow-hidden rounded-xl border border-[#E6E4DF] bg-[#FAF9F6] shadow-quiet">
                <img
                  src="/images/riad-patio.jpg"
                  alt="Riad Sidi Ayoub Courtyard Patio"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* LALLA'S OFFICIAL FELINE ID CARD */}
          <div className="max-w-md mx-auto my-6 rounded-2xl border-2 border-amber-800/20 bg-amber-50 shadow-lg p-6 relative overflow-hidden">
            {/* Top Moroccan Red-Green-Red Ribbon Accent */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-600 via-green-600 to-red-600" />

            {/* Official Card Header */}
            <div className="text-center border-b border-amber-800/15 pb-3 mb-4">
              <p className="text-[10px] font-bold tracking-[0.22em] text-amber-900/75 uppercase">
                {lc.header}
              </p>
              <h2 className="font-serif text-lg sm:text-xl font-bold tracking-wide text-amber-950 mt-0.5">
                {lc.subHeader}
              </h2>
              <p className="text-[11px] italic text-amber-800/80">
                {lc.tagline}
              </p>
            </div>

            {/* Portrait & Details Body */}
            <div className="flex items-start gap-4">
              {/* Lalla Portrait with Approved Stamp */}
              <div className="relative flex-shrink-0">
                <div className="w-28 h-36 rounded-lg border-2 border-amber-800 overflow-hidden shadow-inner flex-shrink-0 bg-amber-100">
                  <img
                    src="/images/lalla.jpg"
                    alt="Lalla — Riad Sidi Ayoub Cat"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="absolute -bottom-2 -right-2 -rotate-12 px-2 py-0.5 rounded border border-green-700 bg-green-50/95 text-[9px] font-extrabold tracking-widest text-green-800 shadow-sm">
                  APPROVED
                </span>
              </div>

              {/* Dynamic Multilingual Attributes */}
              <div className="flex-1 min-w-0 space-y-2 text-xs text-amber-950">
                <div>
                  <span className="font-semibold text-amber-900/75">
                    {lc.nameLabel}{" "}
                  </span>
                  <span className="font-serif text-base font-bold text-amber-950">
                    {lc.nameValue}
                  </span>
                </div>

                <div>
                  <span className="font-semibold text-amber-900/75">
                    {lc.ageLabel}{" "}
                  </span>
                  <span className="font-medium">{lc.ageValue}</span>
                </div>

                <div>
                  <span className="font-semibold text-amber-900/75 block">
                    {lc.roleLabel}
                  </span>
                  <span className="font-semibold text-amber-900">
                    {lc.roleValue}
                  </span>
                </div>

                <div>
                  <span className="font-semibold text-amber-900/75 block">
                    {lc.missionsLabel}
                  </span>
                  <p className="text-[11px] text-amber-900/90 leading-snug mt-0.5">
                    {lc.missionsValue}
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Barcode & Paw Signature */}
            <div className="mt-5 pt-3 border-t border-amber-800/15 flex items-end justify-between gap-4">
              <div>
                <div
                  aria-hidden="true"
                  className="flex items-center gap-[2px] h-5 opacity-75"
                >
                  {[2, 1, 3, 1, 2, 1, 4, 1, 2, 3, 1, 2, 1, 3, 2, 1, 2, 3, 1, 2].map(
                    (w, i) => (
                      <span
                        key={i}
                        style={{ width: `${w}px` }}
                        className="h-full bg-amber-950 inline-block"
                      />
                    )
                  )}
                </div>
                <p className="font-mono text-[10px] tracking-wider text-amber-900/80 mt-1">
                  ID: SIDI-AYOUB-LALLA-06
                </p>
              </div>

              <div className="text-right">
                <span className="text-lg leading-none block select-none">
                  🐾
                </span>
                <span className="text-[10px] uppercase tracking-wider text-amber-900/70 font-medium">
                  {lc.signatureLabel}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-12 space-y-20">
        {/* =========================================================
            SECTION 1: DINING & MENU
        ========================================================= */}
        <section id="dining" className="scroll-mt-28 space-y-12">
          <div className="border-b border-[#E6E4DF] pb-4">
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1A1A1A]">
              {t.menuSectionTitle}
            </h2>
            <p className="mt-1.5 text-sm text-[#63615C]">
              {t.menuSectionSubtitle}
            </p>
          </div>

          {/* Important Schedule & Booking Rules Box */}
          <div className="rounded-xl bg-white border border-[#E6E4DF] p-6 shadow-quiet">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#1A1A1A] mb-4">
              <Clock className="w-4 h-4 text-[#9A5B3A]" />
              <span>{t.rulesBoxTitle}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-lg bg-[#FAF9F6] border border-[#E6E4DF]">
                <div className="flex items-baseline justify-between gap-2">
                  <p className="font-semibold text-[#1A1A1A]">
                    {t.breakfastLabel}
                  </p>
                  <span className="text-xs font-medium text-[#1A1A1A]">
                    {t.breakfastTime}
                  </span>
                </div>
                <p className="text-[#63615C] mt-1.5 leading-relaxed text-xs">
                  {t.breakfastText}
                </p>
              </div>

              <div className="p-4 rounded-lg bg-[#FAF9F6] border border-[#E6E4DF]">
                <div className="flex items-baseline justify-between gap-2">
                  <p className="font-semibold text-[#1A1A1A]">
                    {t.dinnerLabel}
                  </p>
                  <span className="text-xs font-medium text-[#1A1A1A]">
                    {t.dinnerTime}
                  </span>
                </div>
                <p className="text-[#63615C] mt-1.5 leading-relaxed text-xs">
                  {t.dinnerText}
                </p>
              </div>

              <div className="p-4 rounded-lg bg-[#FAF9F6] border border-[#E6E4DF]">
                <div className="flex items-baseline justify-between gap-2">
                  <p className="font-semibold text-[#1A1A1A]">
                    {t.advanceOrderLabel}
                  </p>
                  <span className="text-xs font-semibold text-[#9A5B3A]">
                    {t.advanceOrderBadge}
                  </span>
                </div>
                <p className="text-[#63615C] mt-1.5 leading-relaxed text-xs">
                  {t.advanceOrderText}
                </p>
              </div>
            </div>
          </div>

          {/* Menu Formula Summary Cards (Menu 1: 190 MAD & Menu 2: 320 MAD) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl bg-white border border-[#E6E4DF] p-6 shadow-quiet hover:shadow-quietHover transition-shadow flex flex-col justify-between gap-5">
              <div>
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="font-serif text-2xl font-semibold text-[#1A1A1A]">
                    {t.menu1Title}
                  </h3>
                  <span className="text-xs font-medium text-[#63615C]">
                    {t.menu1Subtitle}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#63615C] mt-2.5 leading-relaxed">
                  {t.menu1Desc}
                </p>
              </div>
              <button
                type="button"
                onClick={() => openMenuSet1Booking()}
                className="w-full py-2.5 px-4 rounded-lg bg-[#9A5B3A] hover:bg-[#824A2D] text-white text-xs sm:text-sm font-medium transition-colors"
              >
                {t.bookBtn} — 190 MAD
              </button>
            </div>

            <div className="rounded-xl bg-white border border-[#E6E4DF] p-6 shadow-quiet hover:shadow-quietHover transition-shadow flex flex-col justify-between gap-5">
              <div>
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="font-serif text-2xl font-semibold text-[#1A1A1A]">
                    {t.menu2Title}
                  </h3>
                  <span className="text-xs font-medium text-[#63615C]">
                    {t.menu2Subtitle}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#63615C] mt-2.5 leading-relaxed">
                  {t.menu2Desc}
                </p>
              </div>
              <button
                type="button"
                onClick={() => openMenuSet2Booking()}
                className="w-full py-2.5 px-4 rounded-lg bg-[#9A5B3A] hover:bg-[#824A2D] text-white text-xs sm:text-sm font-medium transition-colors"
              >
                {t.bookBtn} — 320 MAD
              </button>
            </div>
          </div>

          {/* Starters (Entrées) */}
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 border-b border-[#E6E4DF] pb-2.5">
              <h3 className="font-serif text-2xl font-semibold text-[#1A1A1A]">
                {t.startersTitle}
              </h3>
              <span className="text-xs text-[#63615C]">{t.startersNote}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {startersList.map((starter: DishItem) => (
                <div
                  key={starter.id}
                  className="rounded-xl bg-white border border-[#E6E4DF] shadow-quiet hover:shadow-quietHover transition-shadow overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    <div className="aspect-[4/3] w-full bg-[#FAF9F6] border-b border-[#E6E4DF]">
                      <img
                        src={starter.image}
                        alt={starter.name[lang]}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="font-serif text-lg font-semibold text-[#1A1A1A]">
                        {starter.name[lang]}
                      </h4>
                      <p className="mt-1.5 text-xs text-[#63615C] leading-relaxed">
                        {starter.description[lang]}
                      </p>
                    </div>
                  </div>
                  <div className="px-4 pb-4">
                    <button
                      type="button"
                      onClick={() =>
                        openMenuSet1Booking({ starterId: starter.id })
                      }
                      className="w-full py-2.5 px-3 rounded-lg bg-[#9A5B3A] hover:bg-[#824A2D] text-white text-xs font-medium transition-colors"
                    >
                      {t.bookBtn}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main Courses — Menu 1 (190 MAD) */}
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 border-b border-[#E6E4DF] pb-2.5">
              <h3 className="font-serif text-2xl font-semibold text-[#1A1A1A]">
                {t.mains1Title}
              </h3>
              <span className="text-xs text-[#63615C]">{t.mains1Note}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {menuSet1Mains.map((main: DishItem) => (
                <div
                  key={main.id}
                  className="rounded-xl bg-white border border-[#E6E4DF] shadow-quiet hover:shadow-quietHover transition-shadow overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    <div className="aspect-[4/3] w-full bg-[#FAF9F6] border-b border-[#E6E4DF]">
                      <img
                        src={main.image}
                        alt={main.name[lang]}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex items-baseline justify-between gap-2">
                        <h4 className="font-serif text-lg font-semibold text-[#1A1A1A]">
                          {main.name[lang]}
                        </h4>
                        <span className="text-xs font-semibold text-[#1A1A1A] shrink-0">
                          190 MAD
                        </span>
                      </div>
                      {lang !== "fr" && (
                        <p className="text-[11px] text-[#63615C] italic mt-0.5">
                          {main.originalFr}
                        </p>
                      )}
                      <p className="mt-1.5 text-xs text-[#63615C] leading-relaxed">
                        {main.description[lang]}
                      </p>
                    </div>
                  </div>
                  <div className="px-4 pb-4">
                    <button
                      type="button"
                      onClick={() => openMenuSet1Booking({ mainId: main.id })}
                      className="w-full py-2.5 px-3 rounded-lg bg-[#9A5B3A] hover:bg-[#824A2D] text-white text-xs font-medium transition-colors"
                    >
                      {t.bookBtn}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Signature Main Courses — Menu 2 (320 MAD) */}
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 border-b border-[#E6E4DF] pb-2.5">
              <h3 className="font-serif text-2xl font-semibold text-[#1A1A1A]">
                {t.mains2Title}
              </h3>
              <span className="text-xs text-[#63615C]">{t.mains2Note}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {menuSet2SignatureMains.map((sig: DishItem) => (
                <div
                  key={sig.id}
                  className="rounded-xl bg-white border border-[#E6E4DF] shadow-quiet hover:shadow-quietHover transition-shadow overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    <div className="aspect-[4/3] w-full bg-[#FAF9F6] border-b border-[#E6E4DF]">
                      <img
                        src={sig.image}
                        alt={sig.name[lang]}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex items-baseline justify-between gap-2">
                        <h4 className="font-serif text-lg font-semibold text-[#1A1A1A]">
                          {sig.name[lang]}
                        </h4>
                        <span className="text-xs font-semibold text-[#1A1A1A] shrink-0">
                          320 MAD
                        </span>
                      </div>
                      {lang !== "fr" && (
                        <p className="text-[11px] text-[#63615C] italic mt-0.5">
                          {sig.originalFr}
                        </p>
                      )}
                      <p className="mt-1.5 text-xs text-[#63615C] leading-relaxed">
                        {sig.description[lang]}
                      </p>
                    </div>
                  </div>
                  <div className="px-4 pb-4">
                    <button
                      type="button"
                      onClick={() => openMenuSet2Booking({ mainId: sig.id })}
                      className="w-full py-2.5 px-3 rounded-lg bg-[#9A5B3A] hover:bg-[#824A2D] text-white text-xs font-medium transition-colors"
                    >
                      {t.bookBtn}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Desserts */}
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 border-b border-[#E6E4DF] pb-2.5">
              <h3 className="font-serif text-2xl font-semibold text-[#1A1A1A]">
                {t.dessertsTitle}
              </h3>
              <span className="text-xs text-[#63615C]">{t.dessertsNote}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {dessertsList.map((dessert: DishItem) => (
                <div
                  key={dessert.id}
                  className="rounded-xl bg-white border border-[#E6E4DF] shadow-quiet hover:shadow-quietHover transition-shadow overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    <div className="aspect-[4/3] w-full bg-[#FAF9F6] border-b border-[#E6E4DF]">
                      <img
                        src={dessert.image}
                        alt={dessert.name[lang]}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="font-serif text-lg font-semibold text-[#1A1A1A]">
                        {dessert.name[lang]}
                      </h4>
                      <p className="mt-1.5 text-xs text-[#63615C] leading-relaxed">
                        {dessert.description[lang]}
                      </p>
                    </div>
                  </div>
                  <div className="px-4 pb-4">
                    <button
                      type="button"
                      onClick={() =>
                        openMenuSet1Booking({ dessertId: dessert.id })
                      }
                      className="w-full py-2.5 px-3 rounded-lg bg-[#9A5B3A] hover:bg-[#824A2D] text-white text-xs font-medium transition-colors"
                    >
                      {t.bookBtn}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Drinks (Boissons) */}
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 border-b border-[#E6E4DF] pb-2.5">
              <h3 className="font-serif text-2xl font-semibold text-[#1A1A1A]">
                {t.drinksTitle}
              </h3>
              <span className="text-xs text-[#63615C]">{t.drinksNote}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
              {drinksList.map((drink: DrinkItem) => (
                <div
                  key={drink.id}
                  className="rounded-xl bg-white border border-[#E6E4DF] shadow-quiet hover:shadow-quietHover transition-shadow overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    <div className="aspect-[4/3] w-full bg-[#FAF9F6] border-b border-[#E6E4DF]">
                      <img
                        src={drink.image}
                        alt={drink.name[lang]}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex items-baseline justify-between gap-2">
                        <h4 className="font-serif text-base font-semibold text-[#1A1A1A] leading-snug">
                          {drink.name[lang]}
                        </h4>
                        <span className="text-xs font-semibold text-[#1A1A1A] shrink-0">
                          {drink.priceMad} MAD
                        </span>
                      </div>
                      <p className="mt-1.5 text-xs text-[#63615C] leading-relaxed">
                        {drink.description[lang]}
                      </p>
                    </div>
                  </div>
                  <div className="px-4 pb-4">
                    <button
                      type="button"
                      onClick={() => openDrinkBooking(drink)}
                      className="w-full py-2.5 px-3 rounded-lg bg-[#9A5B3A] hover:bg-[#824A2D] text-white text-xs font-medium transition-colors"
                    >
                      {t.bookBtn}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 2: HAMMAM & MASSAGE (+ 350 MAD COMBO PACK)
        ========================================================= */}
        <section id="wellness" className="scroll-mt-28 space-y-8">
          <div className="border-b border-[#E6E4DF] pb-4 flex flex-col md:flex-row md:items-end justify-between gap-3">
            <div>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1A1A1A]">
                {t.wellnessSectionTitle}
              </h2>
              <p className="mt-1.5 text-sm text-[#63615C]">
                {t.wellnessSectionSubtitle}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white border border-[#E6E4DF] text-xs font-semibold text-[#1A1A1A]">
                <Clock className="w-4 h-4 text-[#9A5B3A] shrink-0" />
                <span>{t.wellnessOpeningHours}</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white border border-[#E6E4DF] text-xs font-medium text-[#1A1A1A]">
                <Info className="w-4 h-4 text-[#9A5B3A] shrink-0" />
                <span>{t.wellnessRuleText}</span>
              </div>
            </div>
          </div>

          {/* FEATURED HAMMAM + MASSAGE COMBO PACK (350 MAD) */}
          <div className="rounded-xl bg-white border border-[#E6E4DF] shadow-quiet hover:shadow-quietHover transition-shadow overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-12">
              <div className="md:col-span-5 relative bg-[#FAF9F6] border-b md:border-b-0 md:border-r border-[#E6E4DF]">
                <img
                  src={wellnessComboItem.image}
                  alt={wellnessComboItem.name[lang]}
                  className="w-full h-full min-h-[240px] object-cover"
                />
              </div>
              <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-5">
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF9F6] border border-[#E6E4DF] text-[11px] uppercase tracking-wider font-semibold text-[#9A5B3A]">
                      <Sparkles className="w-3.5 h-3.5" />
                      {t.comboBadge}
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs line-through text-[#63615C]">
                        400 MAD
                      </span>
                      <span className="font-serif text-2xl font-semibold text-[#1A1A1A]">
                        350 MAD
                      </span>
                    </div>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1A1A1A]">
                    {wellnessComboItem.name[lang]}
                  </h3>

                  <p className="text-xs font-medium text-[#9A5B3A] flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 shrink-0" />
                    <span>{t.wellnessOpeningHours}</span>
                  </p>

                  <p className="text-xs sm:text-sm text-[#63615C] leading-relaxed">
                    {wellnessComboItem.description[lang]}
                  </p>

                  <ul className="space-y-1.5 pt-2">
                    {wellnessComboItem.highlights[lang].map((hl, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-xs text-[#1A1A1A]"
                      >
                        <Check className="w-3.5 h-3.5 text-[#9A5B3A] shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => openWellnessBooking(wellnessComboItem)}
                    className="flex-1 py-3 px-5 rounded-lg bg-[#9A5B3A] hover:bg-[#824A2D] text-white text-xs sm:text-sm font-medium transition-colors"
                  >
                    {t.comboBookCta}
                  </button>
                  <Link
                    href="/wellness/combo"
                    className="inline-flex items-center justify-center gap-1.5 py-3 px-4 rounded-lg border border-[#E6E4DF] bg-[#FAF9F6] hover:bg-white text-[#1A1A1A] text-xs sm:text-sm font-medium transition-colors"
                  >
                    <span>{t.viewDetailsBtn}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Individual Treatments: Traditional Hammam (200 MAD) & Relaxing Massage (200 MAD) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {wellnessList.map((item: WellnessItem) => (
              <div
                key={item.id}
                className="rounded-xl bg-white border border-[#E6E4DF] shadow-quiet hover:shadow-quietHover transition-shadow overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <Link
                    href={`/wellness/${item.slug}`}
                    className="block aspect-[16/10] w-full bg-[#FAF9F6] border-b border-[#E6E4DF] overflow-hidden"
                  >
                    <img
                      src={item.image}
                      alt={item.name[lang]}
                      className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-500"
                    />
                  </Link>
                  <div className="p-6">
                    <div className="flex items-baseline justify-between gap-2">
                      <Link
                        href={`/wellness/${item.slug}`}
                        className="hover:underline"
                      >
                        <h3 className="font-serif text-2xl font-semibold text-[#1A1A1A]">
                          {item.name[lang]}
                        </h3>
                      </Link>
                      <span className="text-sm font-semibold text-[#1A1A1A] shrink-0">
                        {item.duration[lang]} — {item.priceMad} MAD
                      </span>
                    </div>
                    <p className="text-xs text-[#63615C] mt-0.5">
                      {item.tagline[lang]}
                    </p>
                    <p className="text-xs font-medium text-[#9A5B3A] mt-1 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 shrink-0" />
                      <span>{t.wellnessOpeningHours}</span>
                    </p>
                    <p className="mt-2.5 text-xs sm:text-sm text-[#63615C] leading-relaxed">
                      {item.description[lang]}
                    </p>
                  </div>
                </div>
                <div className="px-6 pb-6 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => openWellnessBooking(item)}
                    className="flex-1 py-2.5 px-4 rounded-lg bg-[#9A5B3A] hover:bg-[#824A2D] text-white text-xs sm:text-sm font-medium transition-colors"
                  >
                    {t.bookBtn}
                  </button>
                  <Link
                    href={`/wellness/${item.slug}`}
                    className="inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-lg border border-[#E6E4DF] bg-[#FAF9F6] hover:bg-white text-[#1A1A1A] text-xs sm:text-sm font-medium transition-colors"
                  >
                    <span>{t.viewDetailsBtn}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================
            SECTION 3: EXCURSIONS & EXPERIENCES
        ========================================================= */}
        <section id="excursions" className="scroll-mt-28 space-y-8">
          <div className="border-b border-[#E6E4DF] pb-4">
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1A1A1A]">
              {t.excursionsSectionTitle}
            </h2>
            <p className="mt-1.5 text-sm text-[#63615C]">
              {t.excursionsSectionSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {excursionsList.map((exc: ExcursionItem) => (
              <div
                key={exc.id}
                className="rounded-xl bg-white border border-[#E6E4DF] shadow-quiet hover:shadow-quietHover transition-shadow overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <Link
                    href={`/excursions/${exc.slug}`}
                    className="block aspect-[16/10] w-full bg-[#FAF9F6] border-b border-[#E6E4DF] overflow-hidden"
                  >
                    <img
                      src={exc.image}
                      alt={exc.name[lang]}
                      className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-500"
                    />
                  </Link>
                  <div className="p-6 space-y-3">
                    <div className="flex items-baseline justify-between gap-3 flex-wrap">
                      <Link
                        href={`/excursions/${exc.slug}`}
                        className="hover:underline"
                      >
                        <h3 className="font-serif text-2xl font-semibold text-[#1A1A1A]">
                          {exc.name[lang]}
                        </h3>
                      </Link>
                      <span className="text-xs sm:text-sm font-semibold text-[#1A1A1A]">
                        {exc.priceDisplay[lang]}
                      </span>
                    </div>

                    <p className="text-xs text-[#63615C] flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#9A5B3A] shrink-0" />
                      <span>
                        <strong className="text-[#1A1A1A]">
                          {t.timeLabel}:
                        </strong>{" "}
                        {exc.schedule[lang]}
                      </span>
                    </p>

                    <p className="text-xs sm:text-sm text-[#63615C] leading-relaxed">
                      {exc.description[lang]}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => openExcursionBooking(exc)}
                    className="flex-1 py-2.5 px-4 rounded-lg bg-[#9A5B3A] hover:bg-[#824A2D] text-white text-xs sm:text-sm font-medium transition-colors"
                  >
                    {t.bookBtn}
                  </button>
                  <Link
                    href={`/excursions/${exc.slug}`}
                    className="inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-lg border border-[#E6E4DF] bg-[#FAF9F6] hover:bg-white text-[#1A1A1A] text-xs sm:text-sm font-medium transition-colors"
                  >
                    <span>{t.viewDetailsBtn}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================
            SECTION 4: OFFICIAL INSTAGRAM WIDGET BANNER
        ========================================================= */}
        <section className="rounded-2xl bg-white border border-[#E6E4DF] shadow-quiet p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-3">
              <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold text-[#9A5B3A]">
                <Instagram className="w-4 h-4" />
                {t.instagramBannerTag}
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1A1A1A]">
                {t.instagramBannerTitle}
              </h2>
              <p className="text-xs sm:text-sm text-[#63615C] leading-relaxed max-w-xl">
                {t.instagramBannerDesc}
              </p>
              <div className="pt-2">
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2.5 py-3 px-6 rounded-xl bg-[#9A5B3A] hover:bg-[#824A2D] text-white text-xs sm:text-sm font-medium shadow-sm transition-all"
                >
                  <Instagram className="w-4 h-4 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300" />
                  <span>{t.instagramBtnLabel}</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 grid grid-cols-4 gap-2.5">
              {[
                { src: "/images/riad-patio.jpg", alt: "Riad Patio" },
                { src: "/images/lalla.jpg", alt: "Lalla the Riad Cat" },
                {
                  src: "/images/menu/dates-walnuts-tajine.jpg",
                  alt: "Dates & Walnuts Tajine",
                },
                {
                  src: "/images/wellness/hammam.jpg",
                  alt: "Traditional Moroccan Hammam",
                },
              ].map((photo, idx) => (
                <a
                  key={idx}
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block aspect-square rounded-lg overflow-hidden border border-[#E6E4DF] bg-[#FAF9F6]"
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 5: GUESTBOOK / VOICE OF OUR GUESTS
        ========================================================= */}
        <section id="guestbook" className="scroll-mt-28 space-y-10">
          <div className="border-b border-[#E6E4DF] pb-4">
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1A1A1A]">
              {t.guestbookTitle}
            </h2>
            <p className="mt-1.5 text-sm text-[#63615C]">
              {t.guestbookSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Interactive Guestbook Form */}
            <div className="lg:col-span-5 rounded-2xl bg-white border border-[#E6E4DF] p-6 shadow-quiet">
              <form onSubmit={handleGuestbookSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="gb-name"
                    className="block text-xs font-semibold text-[#1A1A1A] mb-1.5"
                  >
                    {t.guestbookNameLabel} *
                  </label>
                  <input
                    id="gb-name"
                    type="text"
                    required
                    value={gbName}
                    onChange={(e) => setGbName(e.target.value)}
                    placeholder={t.guestbookNamePlaceholder}
                    className="w-full rounded-lg border border-[#E6E4DF] bg-[#FAF9F6] px-3.5 py-2.5 text-sm text-[#1A1A1A] focus:bg-white focus:border-[#9A5B3A] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="gb-note"
                    className="block text-xs font-semibold text-[#1A1A1A] mb-1.5"
                  >
                    {t.guestbookNoteLabel} *
                  </label>
                  <textarea
                    id="gb-note"
                    rows={4}
                    required
                    value={gbNote}
                    onChange={(e) => setGbNote(e.target.value)}
                    placeholder={t.guestbookNotePlaceholder}
                    className="w-full rounded-lg border border-[#E6E4DF] bg-[#FAF9F6] p-3.5 text-sm text-[#1A1A1A] focus:bg-white focus:border-[#9A5B3A] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="gb-photo"
                    className="block text-xs font-semibold text-[#1A1A1A] mb-1.5"
                  >
                    {t.guestbookPhotoLabel}
                  </label>
                  <label
                    htmlFor="gb-photo"
                    className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg border border-dashed border-[#E6E4DF] hover:border-[#9A5B3A] bg-[#FAF9F6] text-xs font-medium text-[#63615C] hover:text-[#1A1A1A] cursor-pointer transition-colors"
                  >
                    <Camera className="w-4 h-4 text-[#9A5B3A]" />
                    <span className="truncate">
                      {gbPhotoName || t.guestbookPhotoLabel}
                    </span>
                  </label>
                  <input
                    id="gb-photo"
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />

                  {gbPhotoData && (
                    <div className="mt-2.5 relative w-24 h-24 rounded-lg overflow-hidden border border-[#E6E4DF]">
                      <img
                        src={gbPhotoData}
                        alt="Upload preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>

                {gbSubmittedNotice && (
                  <p className="text-xs font-medium text-green-800 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
                    {t.guestbookSuccessMsg}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full py-3 px-5 rounded-lg bg-[#9A5B3A] hover:bg-[#824A2D] text-white text-xs sm:text-sm font-medium inline-flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{t.guestbookSubmitBtn}</span>
                </button>
              </form>
            </div>

            {/* Polaroid-Style "Wall of Memories" */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-xl font-semibold text-[#1A1A1A] flex items-center gap-2">
                  <Heart className="w-4 h-4 text-[#9A5B3A]" />
                  <span>{t.guestbookWallTitle}</span>
                </h3>
                <span className="text-xs text-[#63615C]">
                  {userGuestbookEntries.length + 1}{" "}
                  {userGuestbookEntries.length === 0 ? "post" : "posts"}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Real Guest-Submitted Entries */}
                {userGuestbookEntries.map((entry, idx) => (
                  <div
                    key={entry.id}
                    className={`rounded-xl bg-white border border-[#E6E4DF] p-4 shadow-md transition-transform duration-300 hover:rotate-0 ${
                      idx % 2 === 0 ? "sm:-rotate-1" : "sm:rotate-1"
                    }`}
                  >
                    {entry.photo && (
                      <div className="aspect-[4/3] w-full rounded-lg overflow-hidden bg-[#FAF9F6] border border-[#E6E4DF] mb-3.5">
                        <img
                          src={entry.photo}
                          alt={`Memory shared by ${entry.name}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <p className="text-xs sm:text-sm text-[#1A1A1A] leading-relaxed italic">
                      &ldquo;{entry.text}&rdquo;
                    </p>
                    <div className="mt-3 pt-2.5 border-t border-[#E6E4DF] flex items-center justify-between gap-2">
                      <span className="font-serif text-sm font-semibold text-[#1A1A1A]">
                        {entry.name}
                      </span>
                      <span className="text-[11px] text-[#63615C]">
                        {entry.date}
                      </span>
                    </div>
                  </div>
                ))}

                {/* Single Pre-loaded Pinned Official Welcome Post by Riad Sidi Ayoub */}
                <div className="rounded-xl bg-white border border-[#E6E4DF] p-4 shadow-md transition-transform duration-300 hover:rotate-0 sm:-rotate-1">
                  <div className="aspect-[4/3] w-full rounded-lg overflow-hidden bg-[#FAF9F6] border border-[#E6E4DF] mb-3.5">
                    <img
                      src={officialWelcomePost.photo}
                      alt="Riad Sidi Ayoub Welcome"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-xs sm:text-sm text-[#1A1A1A] leading-relaxed italic">
                    &ldquo;{officialWelcomePost.text[lang]}&rdquo;
                  </p>
                  <div className="mt-3 pt-2.5 border-t border-[#E6E4DF] flex items-center justify-between gap-2">
                    <span className="font-serif text-sm font-semibold text-[#1A1A1A]">
                      {officialWelcomePost.name}
                    </span>
                    <span className="text-[11px] text-[#9A5B3A] font-medium">
                      {officialWelcomePost.date[lang]}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* MINIMAL QUIET LUXURY FOOTER */}
      <footer className="bg-white border-t border-[#E6E4DF] py-10 mt-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs sm:text-sm text-[#63615C]">
          <div className="flex items-center gap-2 font-serif text-lg font-semibold text-[#1A1A1A]">
            <MapPin className="w-4 h-4 text-[#9A5B3A]" />
            <span>Riad Sidi Ayoub — Marrakech</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-[#1A1A1A] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#9A5B3A]" />
              <span>WhatsApp / Phone: {CONTACT_PHONE_DISPLAY}</span>
            </a>

            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex items-center gap-1.5 hover:text-[#1A1A1A] transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#9A5B3A]" />
              <span>{CONTACT_EMAIL}</span>
            </a>
          </div>
        </div>
      </footer>

      {/* BOOKING MODAL */}
      <BookingModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        lang={lang}
        payload={bookingPayload}
      />
    </div>
  );
}
