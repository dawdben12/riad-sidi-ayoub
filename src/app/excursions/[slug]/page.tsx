"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Clock,
  Check,
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
  excursionsList,
  ExcursionItem,
  WHATSAPP_NUMBER,
  CONTACT_PHONE_DISPLAY,
  CONTACT_EMAIL,
  INSTAGRAM_URL,
} from "@/data/conciergeData";
import BookingModal, { BookingPayload } from "@/components/BookingModal";

export default function ExcursionDetailPage() {
  const params = useParams();
  const slug = typeof params?.slug === "string" ? params.slug : "ourika";

  const [lang, setLang] = useState<Language>("en");
  const [modalOpen, setModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bookingPayload, setBookingPayload] = useState<BookingPayload | null>(
    null
  );

  const t = uiTranslations[lang];

  const currentExc =
    excursionsList.find((e) => e.slug === slug) || excursionsList[0];

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

        {/* Desktop Sub-navigation bar */}
        <nav className="hidden md:block bg-white border-t border-[#E6E4DF]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center gap-6 overflow-x-auto no-scrollbar h-11 text-xs sm:text-sm">
            <Link
              href="/#excursions"
              className="inline-flex items-center gap-1.5 text-[#63615C] hover:text-[#1A1A1A] font-medium whitespace-nowrap pr-3 border-r border-[#E6E4DF] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{t.backToConcierge}</span>
            </Link>

            {excursionsList.map((exc) => {
              const isActive = exc.slug === currentExc.slug;
              return (
                <Link
                  key={exc.id}
                  href={`/excursions/${exc.slug}`}
                  className={`whitespace-nowrap py-2.5 border-b-2 transition-colors ${
                    isActive
                      ? "border-[#9A5B3A] text-[#1A1A1A] font-semibold"
                      : "border-transparent text-[#63615C] hover:text-[#1A1A1A]"
                  }`}
                >
                  {exc.name[lang]}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden bg-white border-t border-[#E6E4DF] px-4 py-4 shadow-lg max-h-[75vh] overflow-y-auto space-y-1">
            <Link
              href="/#excursions"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3.5 py-2.5 rounded-lg text-sm font-medium text-[#9A5B3A] hover:bg-[#FAF9F6]"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t.backToConcierge}</span>
            </Link>
            {excursionsList.map((exc) => (
              <Link
                key={exc.id}
                href={`/excursions/${exc.slug}`}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3.5 py-2 rounded-lg text-sm font-medium text-[#1A1A1A] hover:bg-[#FAF9F6]"
              >
                {exc.name[lang]}
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

      {/* MAIN EXCURSION DETAIL */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-14">
        <div className="rounded-2xl bg-white border border-[#E6E4DF] shadow-quiet overflow-hidden">
          <div className="aspect-[16/9] sm:aspect-[21/10] w-full bg-[#FAF9F6] border-b border-[#E6E4DF]">
            <img
              src={currentExc.image}
              alt={currentExc.name[lang]}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-6 sm:p-10 space-y-8">
            {/* Title, Schedule & Price Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E6E4DF] pb-6">
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-widest text-[#63615C] font-medium">
                  {t.excursionsSectionTitle}
                </p>
                <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-[#1A1A1A]">
                  {currentExc.name[lang]}
                </h1>
                <p className="text-xs sm:text-sm text-[#63615C] flex items-center gap-2 pt-1">
                  <Clock className="w-4 h-4 text-[#9A5B3A] shrink-0" />
                  <span>
                    <strong className="text-[#1A1A1A]">{t.timeLabel}:</strong>{" "}
                    {currentExc.schedule[lang]}
                  </span>
                </p>
              </div>

              <div className="flex flex-col md:items-end gap-2 shrink-0">
                <span className="font-serif text-2xl sm:text-3xl font-semibold text-[#1A1A1A]">
                  {currentExc.priceDisplay[lang]}
                </span>
                <button
                  type="button"
                  onClick={() => openExcursionBooking(currentExc)}
                  className="py-3 px-6 rounded-lg bg-[#9A5B3A] hover:bg-[#824A2D] text-white text-sm font-medium transition-colors"
                >
                  {t.bookBtn} — {currentExc.name[lang]}
                </button>
              </div>
            </div>

            {/* Full Description */}
            <p className="text-sm sm:text-base text-[#63615C] leading-relaxed">
              {currentExc.longDescription[lang]}
            </p>

            {/* Highlights & What Is Included Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="p-6 rounded-xl bg-[#FAF9F6] border border-[#E6E4DF] space-y-3">
                <h2 className="text-xs uppercase tracking-widest font-semibold text-[#1A1A1A]">
                  {t.highlightsTitle}
                </h2>
                <ul className="space-y-2.5">
                  {currentExc.highlights[lang].map((hl, idx) => (
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

              <div className="p-6 rounded-xl bg-[#FAF9F6] border border-[#E6E4DF] space-y-3">
                <h2 className="text-xs uppercase tracking-widest font-semibold text-[#1A1A1A]">
                  {t.includedTitle}
                </h2>
                <ul className="space-y-2.5">
                  {currentExc.included[lang].map((inc, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-[#1A1A1A]"
                    >
                      <Check className="w-4 h-4 text-[#9A5B3A] shrink-0 mt-0.5" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Booking CTA */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => openExcursionBooking(currentExc)}
                className="w-full py-3.5 px-6 rounded-lg bg-[#9A5B3A] hover:bg-[#824A2D] text-white text-sm font-medium transition-colors"
              >
                {t.bookBtn} — {currentExc.priceDisplay[lang]}
              </button>
            </div>
          </div>
        </div>

        {/* NAVIGATION GRID FOR ALL EXCURSIONS */}
        <section className="space-y-6">
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1A1A1A] border-b border-[#E6E4DF] pb-3">
            {t.otherExcursionsTitle}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {excursionsList.map((exc) => {
              const isCurrent = exc.slug === currentExc.slug;
              return (
                <Link
                  key={exc.id}
                  href={`/excursions/${exc.slug}`}
                  className={`rounded-xl border overflow-hidden transition-all flex flex-col justify-between ${
                    isCurrent
                      ? "bg-white border-[#9A5B3A] shadow-quiet"
                      : "bg-white border-[#E6E4DF] hover:border-[#9A5B3A]/60"
                  }`}
                >
                  <div>
                    <div className="aspect-[16/10] w-full bg-[#FAF9F6] border-b border-[#E6E4DF]">
                      <img
                        src={exc.image}
                        alt={exc.name[lang]}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex items-baseline justify-between gap-2">
                        <h3 className="font-serif text-lg font-semibold text-[#1A1A1A]">
                          {exc.name[lang]}
                        </h3>
                        <span className="text-xs font-semibold text-[#1A1A1A] shrink-0">
                          {exc.priceDisplay[lang]}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-[#63615C] line-clamp-2">
                        {exc.description[lang]}
                      </p>
                    </div>
                  </div>
                  <div className="px-4 pb-4">
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-[#9A5B3A]">
                      <span>{t.viewDetailsBtn}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
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
