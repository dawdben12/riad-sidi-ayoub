"use client";

import React, { useState, useEffect } from "react";
import { X, Info } from "lucide-react";
import {
  Language,
  uiTranslations,
  startersList,
  menuSet1Mains,
  menuSet2SignatureMains,
  dessertsList,
  ExcursionItem,
  WellnessItem,
  DrinkItem,
  WHATSAPP_NUMBER,
} from "@/data/conciergeData";

export type BookingKind =
  | "menu_set_1"
  | "menu_set_2"
  | "drink"
  | "wellness"
  | "excursion";

export interface BookingPayload {
  kind: BookingKind;
  title: string;
  subtitle?: string;
  preselectedStarterId?: string;
  preselectedMainId?: string;
  preselectedDessertId?: string;
  drinkItem?: DrinkItem;
  wellnessItem?: WellnessItem;
  excursionItem?: ExcursionItem;
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  payload: BookingPayload | null;
}

export default function BookingModal({
  isOpen,
  onClose,
  lang,
  payload,
}: BookingModalProps) {
  const t = uiTranslations[lang];

  const [guestName, setGuestName] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [guestsCount, setGuestsCount] = useState(2);
  const [notes, setNotes] = useState("");

  // Course selections for Menu 1 (190 MAD) & Menu 2 (320 MAD)
  const [selectedStarterId, setSelectedStarterId] = useState(
    startersList[0].id
  );
  const [selectedMainId, setSelectedMainId] = useState(menuSet1Mains[0].id);
  const [selectedDessertId, setSelectedDessertId] = useState(
    dessertsList[0].id
  );

  // Excursion options
  const [tourFormat, setTourFormat] = useState<"group" | "private">("group");
  const [hoursCount, setHoursCount] = useState(1);

  useEffect(() => {
    if (!payload) return;

    const now = new Date();
    if (payload.kind === "wellness" || payload.kind === "excursion") {
      now.setDate(now.getDate() + 1);
    }
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const dd = String(now.getDate()).padStart(2, "0");
    setPreferredDate(`${yyyy}-${mm}-${dd}`);

    if (payload.kind === "menu_set_1" || payload.kind === "menu_set_2") {
      setPreferredTime("19:00");
    } else if (payload.kind === "drink") {
      setPreferredTime("17:00");
    } else if (payload.kind === "wellness") {
      setPreferredTime("16:00");
    } else if (payload.kind === "excursion") {
      setPreferredTime("08:00");
    }

    setSelectedStarterId(payload.preselectedStarterId || startersList[0].id);
    if (payload.kind === "menu_set_2") {
      setSelectedMainId(
        payload.preselectedMainId || menuSet2SignatureMains[0].id
      );
    } else {
      setSelectedMainId(payload.preselectedMainId || menuSet1Mains[0].id);
    }
    setSelectedDessertId(payload.preselectedDessertId || dessertsList[0].id);

    if (payload.excursionItem) {
      if (payload.excursionItem.pricingMode === "private_only") {
        setTourFormat("private");
      } else {
        setTourFormat("group");
      }
      setHoursCount(1);
    }
  }, [payload]);

  if (!isOpen || !payload) return null;

  const availableMains =
    payload.kind === "menu_set_2" ? menuSet2SignatureMains : menuSet1Mains;

  const calculateTotalDisplay = (): string => {
    if (payload.kind === "menu_set_1") {
      return `${190 * guestsCount} MAD (${guestsCount} × 190 MAD)`;
    }
    if (payload.kind === "menu_set_2") {
      return `${320 * guestsCount} MAD (${guestsCount} × 320 MAD)`;
    }
    if (payload.kind === "drink" && payload.drinkItem) {
      const p = payload.drinkItem.priceMad;
      return `${p * guestsCount} MAD (${guestsCount} × ${p} MAD)`;
    }
    if (payload.kind === "wellness" && payload.wellnessItem) {
      const p = payload.wellnessItem.priceMad;
      return `${p * guestsCount} MAD (${guestsCount} × ${p} MAD)`;
    }
    if (payload.kind === "excursion" && payload.excursionItem) {
      const exc = payload.excursionItem;
      if (exc.pricingMode === "per_person" && exc.groupPriceEur) {
        return `${exc.groupPriceEur * guestsCount} € (${guestsCount} × ${exc.groupPriceEur} €)`;
      }
      if (exc.pricingMode === "private_only" && exc.privatePriceEur) {
        return `${exc.privatePriceEur} € (${t.modalPrivate})`;
      }
      if (exc.pricingMode === "group_or_private") {
        if (tourFormat === "private" && exc.privatePriceEur) {
          return `${exc.privatePriceEur} € (${t.modalPrivate})`;
        }
        const gp = exc.groupPriceEur || 0;
        return `${gp * guestsCount} € (${guestsCount} × ${gp} € - ${t.modalGroup})`;
      }
      if (exc.pricingMode === "per_hour" && exc.hourlyPriceEur) {
        const total = exc.hourlyPriceEur * hoursCount * guestsCount;
        return `${total} € (${guestsCount} × ${hoursCount}h × ${exc.hourlyPriceEur} €)`;
      }
    }
    return "";
  };

  const buildWhatsAppUrl = (): string => {
    const starterObj = startersList.find((s) => s.id === selectedStarterId);
    const mainObj = availableMains.find((m) => m.id === selectedMainId);
    const dessertObj = dessertsList.find((d) => d.id === selectedDessertId);
    const totalStr = calculateTotalDisplay();

    const lines: string[] = [];

    if (lang === "fr") {
      lines.push(`*Riad Sidi Ayoub — Réservation*`);
      lines.push(`Prestation : ${payload.title}`);
      if (payload.kind === "menu_set_1" || payload.kind === "menu_set_2") {
        lines.push(`Entrée : ${starterObj?.name.fr || ""}`);
        lines.push(`Plat : ${mainObj?.name.fr || ""}`);
        lines.push(`Dessert : ${dessertObj?.name.fr || ""}`);
      }
      if (payload.kind === "excursion" && payload.excursionItem) {
        const exc = payload.excursionItem;
        if (exc.pricingMode === "group_or_private") {
          lines.push(
            `Formule : ${tourFormat === "private" ? "Privé" : "Groupe"}`
          );
        } else if (exc.pricingMode === "private_only") {
          lines.push(`Formule : Privé uniquement`);
        } else if (exc.pricingMode === "per_hour") {
          lines.push(`Durée : ${hoursCount}h`);
        }
      }
      lines.push(`Total : ${totalStr}`);
      lines.push(`Nom : ${guestName}`);
      lines.push(`Chambre : ${roomNumber}`);
      lines.push(`Personnes : ${guestsCount}`);
      lines.push(`Date & Heure : ${preferredDate} ${preferredTime}`);
      if (notes.trim()) lines.push(`Notes : ${notes.trim()}`);
    } else if (lang === "es") {
      lines.push(`*Riad Sidi Ayoub — Solicitud de Reserva*`);
      lines.push(`Servicio: ${payload.title}`);
      if (payload.kind === "menu_set_1" || payload.kind === "menu_set_2") {
        lines.push(`Entrante: ${starterObj?.name.es || ""}`);
        lines.push(`Plato Principal: ${mainObj?.name.es || ""}`);
        lines.push(`Postre: ${dessertObj?.name.es || ""}`);
      }
      if (payload.kind === "excursion" && payload.excursionItem) {
        const exc = payload.excursionItem;
        if (exc.pricingMode === "group_or_private") {
          lines.push(
            `Modalidad: ${tourFormat === "private" ? "Privado" : "Grupo"}`
          );
        } else if (exc.pricingMode === "private_only") {
          lines.push(`Modalidad: Solo Privado`);
        } else if (exc.pricingMode === "per_hour") {
          lines.push(`Duración: ${hoursCount} hora(s)`);
        }
      }
      lines.push(`Total: ${totalStr}`);
      lines.push(`Huésped: ${guestName}`);
      lines.push(`Habitación: ${roomNumber}`);
      lines.push(`Personas: ${guestsCount}`);
      lines.push(`Fecha y Hora: ${preferredDate} ${preferredTime}`);
      if (notes.trim()) lines.push(`Notas: ${notes.trim()}`);
    } else {
      lines.push(`*Riad Sidi Ayoub — Booking Request*`);
      lines.push(`Item: ${payload.title}`);
      if (payload.kind === "menu_set_1" || payload.kind === "menu_set_2") {
        lines.push(`Starter: ${starterObj?.name.en || ""}`);
        lines.push(`Main Course: ${mainObj?.name.en || ""}`);
        lines.push(`Dessert: ${dessertObj?.name.en || ""}`);
      }
      if (payload.kind === "excursion" && payload.excursionItem) {
        const exc = payload.excursionItem;
        if (exc.pricingMode === "group_or_private") {
          lines.push(
            `Option: ${tourFormat === "private" ? "Private" : "Group"}`
          );
        } else if (exc.pricingMode === "private_only") {
          lines.push(`Option: Private Only`);
        } else if (exc.pricingMode === "per_hour") {
          lines.push(`Duration: ${hoursCount} hour(s)`);
        }
      }
      lines.push(`Total: ${totalStr}`);
      lines.push(`Guest Name: ${guestName}`);
      lines.push(`Room Number: ${roomNumber}`);
      lines.push(`Guests: ${guestsCount}`);
      lines.push(`Date & Time: ${preferredDate} ${preferredTime}`);
      if (notes.trim()) lines.push(`Notes: ${notes.trim()}`);
    }

    const encoded = encodeURIComponent(lines.join("\n"));
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.open(buildWhatsAppUrl(), "_blank", "noopener,noreferrer");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-[2px] p-0 sm:p-4 transition-opacity">
      <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white border border-[#E6E4DF] rounded-t-2xl sm:rounded-xl shadow-xl font-sans">
        {/* Quiet Luxury Modal Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-white border-b border-[#E6E4DF]">
          <h3 className="font-serif text-xl font-semibold text-[#1A1A1A]">
            {t.modalTitle}
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="p-1.5 rounded-lg text-[#63615C] hover:text-[#1A1A1A] hover:bg-[#FAF9F6] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Selected Item Summary */}
          <div className="p-4 rounded-lg bg-[#FAF9F6] border border-[#E6E4DF] flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] uppercase tracking-wider text-[#63615C]">
                {t.modalItemLabel}
              </p>
              <p className="font-serif text-lg font-semibold text-[#1A1A1A] mt-0.5">
                {payload.title}
              </p>
              {payload.subtitle && (
                <p className="text-xs text-[#63615C] mt-0.5">
                  {payload.subtitle}
                </p>
              )}
            </div>
            <div className="text-right shrink-0">
              <p className="text-[11px] uppercase tracking-wider text-[#63615C]">
                {t.modalTotal}
              </p>
              <p className="text-sm font-semibold text-[#1A1A1A] mt-0.5">
                {calculateTotalDisplay()}
              </p>
            </div>
          </div>

          {/* Contextual Booking Rule Reminders */}
          {(payload.kind === "menu_set_1" || payload.kind === "menu_set_2") && (
            <div className="flex items-start gap-2.5 p-3.5 rounded-lg bg-[#FAF9F6] border border-[#E6E4DF] text-xs text-[#1A1A1A]">
              <Info className="w-4 h-4 text-[#9A5B3A] shrink-0 mt-0.5" />
              <p className="leading-relaxed">{t.modalDinnerReminder}</p>
            </div>
          )}

          {payload.kind === "wellness" && (
            <div className="flex items-start gap-2.5 p-3.5 rounded-lg bg-[#FAF9F6] border border-[#E6E4DF] text-xs text-[#1A1A1A]">
              <Info className="w-4 h-4 text-[#9A5B3A] shrink-0 mt-0.5" />
              <p className="leading-relaxed">{t.modalWellnessReminder}</p>
            </div>
          )}

          {payload.kind === "excursion" && (
            <div className="flex items-start gap-2.5 p-3.5 rounded-lg bg-[#FAF9F6] border border-[#E6E4DF] text-xs text-[#1A1A1A]">
              <Info className="w-4 h-4 text-[#9A5B3A] shrink-0 mt-0.5" />
              <p className="leading-relaxed">{t.modalExcursionReminder}</p>
            </div>
          )}

          {/* 3-Course Selectors for Menu 1 & Menu 2 */}
          {(payload.kind === "menu_set_1" || payload.kind === "menu_set_2") && (
            <div className="space-y-3 p-4 rounded-lg border border-[#E6E4DF] bg-white">
              <div>
                <label className="block text-xs font-medium text-[#63615C] mb-1">
                  {t.modalChooseStarter}
                </label>
                <select
                  value={selectedStarterId}
                  onChange={(e) => setSelectedStarterId(e.target.value)}
                  className="w-full rounded-lg border border-[#E6E4DF] bg-white px-3 py-2 text-sm text-[#1A1A1A] focus:border-[#1A1A1A] focus:outline-none"
                >
                  {startersList.map((st) => (
                    <option key={st.id} value={st.id}>
                      {st.name[lang]}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#63615C] mb-1">
                  {t.modalChooseMain}
                </label>
                <select
                  value={selectedMainId}
                  onChange={(e) => setSelectedMainId(e.target.value)}
                  className="w-full rounded-lg border border-[#E6E4DF] bg-white px-3 py-2 text-sm text-[#1A1A1A] focus:border-[#1A1A1A] focus:outline-none"
                >
                  {availableMains.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name[lang]}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#63615C] mb-1">
                  {t.modalChooseDessert}
                </label>
                <select
                  value={selectedDessertId}
                  onChange={(e) => setSelectedDessertId(e.target.value)}
                  className="w-full rounded-lg border border-[#E6E4DF] bg-white px-3 py-2 text-sm text-[#1A1A1A] focus:border-[#1A1A1A] focus:outline-none"
                >
                  {dessertsList.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name[lang]}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Group vs Private Toggle */}
          {payload.kind === "excursion" &&
            payload.excursionItem?.pricingMode === "group_or_private" && (
              <div>
                <label className="block text-xs font-medium text-[#63615C] mb-1.5">
                  {t.modalTourFormat}
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setTourFormat("group")}
                    className={`py-2.5 px-3 rounded-lg border text-xs font-medium transition-colors ${
                      tourFormat === "group"
                        ? "border-[#1A1A1A] bg-[#1A1A1A] text-white"
                        : "border-[#E6E4DF] bg-white text-[#1A1A1A] hover:bg-[#FAF9F6]"
                    }`}
                  >
                    {t.modalGroup} ({payload.excursionItem.groupPriceEur} € / pers.)
                  </button>
                  <button
                    type="button"
                    onClick={() => setTourFormat("private")}
                    className={`py-2.5 px-3 rounded-lg border text-xs font-medium transition-colors ${
                      tourFormat === "private"
                        ? "border-[#1A1A1A] bg-[#1A1A1A] text-white"
                        : "border-[#E6E4DF] bg-white text-[#1A1A1A] hover:bg-[#FAF9F6]"
                    }`}
                  >
                    {t.modalPrivate} ({payload.excursionItem.privatePriceEur} €)
                  </button>
                </div>
              </div>
            )}

          {/* Hours selector for Palmeraie Camel Ride */}
          {payload.kind === "excursion" &&
            payload.excursionItem?.pricingMode === "per_hour" && (
              <div>
                <label className="block text-xs font-medium text-[#63615C] mb-1.5">
                  {t.modalHours}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3].map((hr) => (
                    <button
                      key={hr}
                      type="button"
                      onClick={() => setHoursCount(hr)}
                      className={`py-2 rounded-lg border text-xs font-medium transition-colors ${
                        hoursCount === hr
                          ? "border-[#1A1A1A] bg-[#1A1A1A] text-white"
                          : "border-[#E6E4DF] bg-white text-[#1A1A1A]"
                      }`}
                    >
                      {hr}h
                    </button>
                  ))}
                </div>
              </div>
            )}

          {/* Guest Name & Room Number */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-medium text-[#63615C] mb-1">
                {t.modalName} *
              </label>
              <input
                type="text"
                required
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder={t.modalNamePlaceholder}
                className="w-full rounded-lg border border-[#E6E4DF] bg-white px-3.5 py-2.5 text-sm text-[#1A1A1A] focus:border-[#1A1A1A] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#63615C] mb-1">
                {t.modalRoom} *
              </label>
              <input
                type="text"
                required
                value={roomNumber}
                onChange={(e) => setRoomNumber(e.target.value)}
                placeholder={t.modalRoomPlaceholder}
                className="w-full rounded-lg border border-[#E6E4DF] bg-white px-3.5 py-2.5 text-sm text-[#1A1A1A] focus:border-[#1A1A1A] focus:outline-none"
              />
            </div>
          </div>

          {/* Preferred Date, Preferred Time & Number of Guests */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div>
              <label className="block text-xs font-medium text-[#63615C] mb-1">
                {t.modalDate} *
              </label>
              <input
                type="date"
                required
                value={preferredDate}
                onChange={(e) => setPreferredDate(e.target.value)}
                className="w-full rounded-lg border border-[#E6E4DF] bg-white px-3 py-2.5 text-sm text-[#1A1A1A] focus:border-[#1A1A1A] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#63615C] mb-1">
                {t.modalTime}
              </label>
              <input
                type="time"
                value={preferredTime}
                onChange={(e) => setPreferredTime(e.target.value)}
                className="w-full rounded-lg border border-[#E6E4DF] bg-white px-3 py-2.5 text-sm text-[#1A1A1A] focus:border-[#1A1A1A] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#63615C] mb-1">
                {t.modalGuests} *
              </label>
              <div className="flex items-center rounded-lg border border-[#E6E4DF] bg-white overflow-hidden">
                <button
                  type="button"
                  onClick={() => setGuestsCount(Math.max(1, guestsCount - 1))}
                  className="px-3.5 py-2.5 bg-[#FAF9F6] hover:bg-[#E6E4DF] text-[#1A1A1A] text-sm font-medium transition-colors"
                >
                  −
                </button>
                <span className="flex-1 text-center text-sm font-medium text-[#1A1A1A]">
                  {guestsCount}
                </span>
                <button
                  type="button"
                  onClick={() => setGuestsCount(guestsCount + 1)}
                  className="px-3.5 py-2.5 bg-[#FAF9F6] hover:bg-[#E6E4DF] text-[#1A1A1A] text-sm font-medium transition-colors"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Optional Notes */}
          <div>
            <label className="block text-xs font-medium text-[#63615C] mb-1">
              {t.modalNotes}
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={t.modalNotesPlaceholder}
              className="w-full rounded-lg border border-[#E6E4DF] bg-white px-3.5 py-2.5 text-sm text-[#1A1A1A] focus:border-[#1A1A1A] focus:outline-none"
            />
          </div>

          {/* Submit & Cancel Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              type="submit"
              className="flex-1 py-3 px-5 rounded-lg bg-[#9A5B3A] hover:bg-[#824A2D] text-white text-sm font-medium transition-colors"
            >
              {t.modalSubmit}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="py-3 px-5 rounded-lg border border-[#E6E4DF] bg-white hover:bg-[#FAF9F6] text-[#1A1A1A] text-sm font-medium transition-colors"
            >
              {t.modalCancel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
