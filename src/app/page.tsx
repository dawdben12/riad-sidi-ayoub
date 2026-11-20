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
} from "lucide-react";
import {
  Language,
  uiTranslations,
  startersList,
  menuSet1Mains,
  menuSet2SignatureMains,
  dessertsList,
  drinksList,
  wellnessList,
  wellnessComboItem,
  excursionsList,
  WHATSAPP_NUMBER,
  CONTACT_PHONE_DISPLAY,
  CONTACT_EMAIL,
  DishItem,
  DrinkItem,
  WellnessItem,
  ExcursionItem,
} from "@/data/conciergeData";
import BookingModal, { BookingPayload } from "@/components/BookingModal";

export default function ConciergePage() {
  const [lang, setLang] = useState<Language>("en");
  const [modalOpen, setModalOpen] = useState(false);
  const [bookingPayload, setBookingPayload] = useState<BookingPayload | null>(
    null
  );

  const t = uiTranslations[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = "ltr";
  }, [lang]);

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
      title: `${item.name[lang]} — ${item.priceMad} MAD`,
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
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <a
            href="#top"
            className="font-serif text-2xl sm:text-[26px] font-semibold tracking-tight text-[#1A1A1A]"
          >
            {t.riadName}
          </a>

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
                    <span className="mx-2 text-[#E6E4DF] select-none">|</span>
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
        </div>

        {/* Clean Section Tabs: Dining & Menu | Hammam & Massage | Excursions */}
        <nav
          aria-label="Section navigation"
          className="bg-white border-t border-[#E6E4DF]"
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center gap-8 overflow-x-auto no-scrollbar h-11 text-xs sm:text-sm font-medium text-[#1A1A1A]">
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
          </div>
        </nav>
      </header>

      {/* QUIET LUXURY HERO SECTION */}
      <section id="top" className="bg-white border-b border-[#E6E4DF]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
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
          <div className="border-b border-[#E6E4DF] pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1A1A1A]">
                {t.wellnessSectionTitle}
              </h2>
              <p className="mt-1.5 text-sm text-[#63615C]">
                {t.wellnessSectionSubtitle}
              </p>
            </div>
            <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white border border-[#E6E4DF] text-xs font-medium text-[#1A1A1A]">
              <Info className="w-4 h-4 text-[#9A5B3A] shrink-0" />
              <span>{t.wellnessRuleText}</span>
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
                        {item.priceMad} MAD
                      </span>
                    </div>
                    <p className="text-xs text-[#63615C] mt-0.5">
                      {item.tagline[lang]} • {item.duration[lang]}
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
