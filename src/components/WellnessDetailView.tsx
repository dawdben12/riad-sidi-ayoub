"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Clock,
  Info,
  Check,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Menu,
  X,
  Instagram,
} from "lucide-react";
import {
  Language,
  uiTranslations,
  wellnessList,
  wellnessComboItem,
  WellnessItem,
  WHATSAPP_NUMBER,
  CONTACT_PHONE_DISPLAY,
  CONTACT_EMAIL,
  INSTAGRAM_URL,
} from "@/data/conciergeData";
import BookingModal, { BookingPayload } from "@/components/BookingModal";

export default function WellnessDetailView({
  defaultSlug,
}: {
  defaultSlug?: string;
}) {
  const params = useParams();
  const slug =
    typeof params?.slug === "string" ? params.slug : defaultSlug || "combo";

  const [lang, setLang] = useState<Language>("en");
  const [modalOpen, setModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bookingPayload, setBookingPayload] = useState<BookingPayload | null>(
    null
  );

  const t = uiTranslations[lang];

  const allWellnessItems: WellnessItem[] = [wellnessComboItem, ...wellnessList];
  const currentItem =
    allWellnessItems.find((w) => w.slug === slug) || wellnessComboItem;

  const openWellnessBooking = (item: WellnessItem) => {
    setBookingPayload({
      kind: "wellness",
      title: `${item.name[lang]} (${item.duration[lang]} — ${item.priceMad} MAD)`,
      subtitle: item.tagline[lang],
      wellnessItem: item,
    });
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#1A1A1A] font-sans">
      {/* STICKY HEADER */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-[#E6E4DF]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
          <Link
            href="/"
            className="font-serif text-2xl sm:text-[26px] font-semibold tracking-tight text-[#1A1A1A]"
          >
            {t.riadName}
          </Link>

          <div className="flex items-center gap-3">
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

        {/* Desktop Sub-navigation */}
        <nav className="hidden md:block bg-white border-t border-[#E6E4DF]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4 h-11 text-xs sm:text-sm">
            <Link
              href="/#wellness"
              className="inline-flex items-center gap-1.5 text-[#63615C] hover:text-[#1A1A1A] font-medium whitespace-nowrap transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{t.backToConcierge}</span>
            </Link>

            <div className="flex items-center gap-5">
              {allWellnessItems.map((item) => {
                const isActive = item.slug === currentItem.slug;
                return (
                  <Link
                    key={item.id}
                    href={`/wellness/${item.slug}`}
                    className={`whitespace-nowrap py-2.5 border-b-2 transition-colors ${
                      isActive
                        ? "border-[#9A5B3A] text-[#1A1A1A] font-semibold"
                        : "border-transparent text-[#63615C] hover:text-[#1A1A1A]"
                    }`}
                  >
                    {item.name[lang]} ({item.priceMad} MAD)
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden bg-white border-t border-[#E6E4DF] px-4 py-4 shadow-lg space-y-1.5">
            <Link
              href="/#wellness"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3.5 py-2.5 rounded-lg text-sm font-medium text-[#9A5B3A] hover:bg-[#FAF9F6]"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t.backToConcierge}</span>
            </Link>
            {allWellnessItems.map((item) => (
              <Link
                key={item.id}
                href={`/wellness/${item.slug}`}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3.5 py-2.5 rounded-lg text-sm font-medium text-[#1A1A1A] hover:bg-[#FAF9F6]"
              >
                {item.name[lang]} ({item.priceMad} MAD)
              </Link>
            ))}
            <div className="pt-2 border-t border-[#E6E4DF]">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg bg-[#9A5B3A] text-white text-xs font-medium"
              >
                <Instagram className="w-4 h-4" />
                <span>{t.instagramBtnLabel}</span>
              </a>
            </div>
          </nav>
        )}
      </header>

      {/* MAIN DETAIL CONTENT */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-12">
        <div className="rounded-2xl bg-white border border-[#E6E4DF] shadow-quiet overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Image Column */}
            <div className="lg:col-span-6 bg-[#FAF9F6] border-b lg:border-b-0 lg:border-r border-[#E6E4DF]">
              <img
                src={currentItem.image}
                alt={currentItem.name[lang]}
                className="w-full h-full min-h-[300px] sm:min-h-[420px] object-cover"
              />
            </div>

            {/* Content Column */}
            <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF9F6] border border-[#E6E4DF] text-[11px] uppercase tracking-wider font-semibold text-[#9A5B3A]">
                    <Sparkles className="w-3.5 h-3.5" />
                    {currentItem.tagline[lang]}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs text-[#63615C]">
                    <Clock className="w-3.5 h-3.5 text-[#9A5B3A]" />
                    {currentItem.duration[lang]}
                  </span>
                </div>

                <div className="flex items-baseline justify-between gap-4 flex-wrap border-b border-[#E6E4DF] pb-4">
                  <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1A1A1A]">
                    {currentItem.name[lang]}
                  </h1>
                  <div className="flex items-baseline gap-2">
                    {currentItem.originalPriceMad && (
                      <span className="text-sm line-through text-[#63615C]">
                        {currentItem.originalPriceMad} MAD
                      </span>
                    )}
                    <span className="font-serif text-2xl sm:text-3xl font-semibold text-[#1A1A1A]">
                      {currentItem.duration[lang]} — {currentItem.priceMad} MAD
                    </span>
                  </div>
                </div>

                <p className="text-sm text-[#63615C] leading-relaxed">
                  {currentItem.longDescription[lang]}
                </p>

                <div className="pt-2 space-y-2.5">
                  <h2 className="text-xs uppercase tracking-widest font-semibold text-[#1A1A1A]">
                    {t.highlightsTitle}
                  </h2>
                  <ul className="space-y-2">
                    {currentItem.highlights[lang].map((hl, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-[#1A1A1A]"
                      >
                        <Check className="w-4 h-4 text-[#9A5B3A] shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Opening Hours & 1-Day Advance Booking Notice */}
                <div className="p-3.5 rounded-lg bg-[#FAF9F6] border border-[#E6E4DF] space-y-2 text-xs text-[#1A1A1A]">
                  <div className="flex items-center gap-2.5 font-semibold">
                    <Clock className="w-4 h-4 text-[#9A5B3A] shrink-0" />
                    <span>{t.wellnessOpeningHours}</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Info className="w-4 h-4 text-[#9A5B3A] shrink-0 mt-0.5" />
                    <span>{t.wellnessRuleText}</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => openWellnessBooking(currentItem)}
                className="w-full py-3.5 px-6 rounded-lg bg-[#9A5B3A] hover:bg-[#824A2D] text-white text-sm font-medium transition-colors"
              >
                {t.bookBtn} — {currentItem.priceMad} MAD
              </button>
            </div>
          </div>
        </div>

        {/* UPGRADE BANNER TO 350 MAD COMBO PACK WHEN VIEWING INDIVIDUAL HAMMAM OR MASSAGE */}
        {!currentItem.isCombo && (
          <div className="rounded-xl bg-white border border-[#E6E4DF] p-6 sm:p-8 shadow-quiet flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-[#9A5B3A]">
                <Sparkles className="w-3.5 h-3.5" />
                {t.comboBadge}
              </span>
              <h2 className="font-serif text-2xl font-semibold text-[#1A1A1A]">
                {wellnessComboItem.name[lang]} — 350 MAD
              </h2>
              <p className="text-xs sm:text-sm text-[#63615C] leading-relaxed">
                {wellnessComboItem.description[lang]}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full md:w-auto">
              <button
                type="button"
                onClick={() => openWellnessBooking(wellnessComboItem)}
                className="py-3 px-5 rounded-lg bg-[#9A5B3A] hover:bg-[#824A2D] text-white text-xs sm:text-sm font-medium transition-colors"
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
        )}

        {/* CROSS-NAVIGATION TO ALL WELLNESS RITUALS */}
        <section className="space-y-5">
          <h2 className="font-serif text-2xl font-semibold text-[#1A1A1A] border-b border-[#E6E4DF] pb-3">
            {t.otherWellnessTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {allWellnessItems.map((item) => {
              const isCurrent = item.slug === currentItem.slug;
              return (
                <Link
                  key={item.id}
                  href={`/wellness/${item.slug}`}
                  className={`rounded-xl border p-5 transition-all flex flex-col justify-between gap-3 ${
                    isCurrent
                      ? "bg-white border-[#9A5B3A] shadow-quiet"
                      : "bg-white border-[#E6E4DF] hover:border-[#9A5B3A]/60"
                  }`}
                >
                  <div>
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="font-serif text-xl font-semibold text-[#1A1A1A]">
                        {item.name[lang]}
                      </h3>
                      <span className="text-xs font-semibold text-[#1A1A1A] shrink-0">
                        {item.priceMad} MAD
                      </span>
                    </div>
                    <p className="mt-1.5 text-xs text-[#63615C] line-clamp-2">
                      {item.description[lang]}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-[#9A5B3A]">
                    <span>{t.viewDetailsBtn}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              );
            })}
          </div>
        </section>
      </main>

      {/* MINIMAL FOOTER */}
      <footer className="bg-white border-t border-[#E6E4DF] py-10 mt-12">
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

      <BookingModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        lang={lang}
        payload={bookingPayload}
      />
    </div>
  );
}
