"use client";

import React, { useState, useEffect } from "react";
import { X, Info, Users, MessageCircle } from "lucide-react";
import {
  Language,
  uiTranslations,
  startersList,
  menuSet1Mains,
  menuSet2SignatureMains,
  dessertsList,
  drinksList,
  ExcursionItem,
  WellnessItem,
  DrinkItem,
  WHATSAPP_NUMBER,
  RIAD_ROOMS,
  HAMMAM_TIME_SLOTS,
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
  initialGuestsCount?: number;
  initialIsGroupOver5?: boolean;
  drinkItem?: DrinkItem;
  wellnessItem?: WellnessItem;
  excursionItem?: ExcursionItem;
}

export interface GuestMenuSelection {
  menuTier: "menu_set_1" | "menu_set_2";
  starterId: string;
  mainId: string;
  dessertId: string;
  drinkId: string;
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
  const [roomName, setRoomName] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [guestsCount, setGuestsCount] = useState(2);
  const [isGroupOver5, setIsGroupOver5] = useState(false);
  const [notes, setNotes] = useState("");

  // Independent selections for up to 5 guests
  const [guestSelections, setGuestSelections] = useState<GuestMenuSelection[]>(
    () =>
      Array.from({ length: 5 }, () => ({
        menuTier: "menu_set_1",
        starterId: startersList[0].id,
        mainId: menuSet1Mains[0].id,
        dessertId: dessertsList[0].id,
        drinkId: drinksList[0].id,
      }))
  );

  // Excursion options
  const [tourFormat, setTourFormat] = useState<"group" | "private">("group");
  const [hoursCount, setHoursCount] = useState(1);

  const isMenuOrDrink =
    payload?.kind === "menu_set_1" ||
    payload?.kind === "menu_set_2" ||
    payload?.kind === "drink";

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
      setPreferredTime("11:00");
    } else if (payload.kind === "excursion") {
      setPreferredTime("08:00");
    }

    const defaultTier: "menu_set_1" | "menu_set_2" =
      payload.kind === "menu_set_2" ? "menu_set_2" : "menu_set_1";
    const defaultStarter = payload.preselectedStarterId || startersList[0].id;
    const defaultMain =
      payload.kind === "menu_set_2"
        ? payload.preselectedMainId || menuSet2SignatureMains[0].id
        : payload.preselectedMainId || menuSet1Mains[0].id;
    const defaultDessert = payload.preselectedDessertId || dessertsList[0].id;
    const defaultDrink = payload.drinkItem?.id || drinksList[0].id;

    setGuestSelections(
      Array.from({ length: 5 }, () => ({
        menuTier: defaultTier,
        starterId: defaultStarter,
        mainId: defaultMain,
        dessertId: defaultDessert,
        drinkId: defaultDrink,
      }))
    );

    if (payload.initialIsGroupOver5) {
      setIsGroupOver5(true);
      setGuestsCount(6);
    } else {
      setIsGroupOver5(false);
      setGuestsCount(payload.initialGuestsCount || 2);
    }

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

  const updateGuestSelection = (
    guestIndex: number,
    updates: Partial<GuestMenuSelection>
  ) => {
    setGuestSelections((prev) =>
      prev.map((item, idx) => {
        if (idx !== guestIndex) return item;
        const next = { ...item, ...updates };
        // If menuTier changed, ensure mainId belongs to that tier
        if (updates.menuTier && updates.menuTier !== item.menuTier) {
          next.mainId =
            updates.menuTier === "menu_set_2"
              ? menuSet2SignatureMains[0].id
              : menuSet1Mains[0].id;
        }
        return next;
      })
    );
  };

  const handleSelectGuestCount = (count: number | "group") => {
    if (count === "group") {
      setIsGroupOver5(true);
      setGuestsCount(6);
    } else {
      setIsGroupOver5(false);
      setGuestsCount(count);
    }
  };

  const handleIncrementGuests = () => {
    if (isMenuOrDrink) {
      if (isGroupOver5) return;
      if (guestsCount >= 5) {
        setIsGroupOver5(true);
        setGuestsCount(6);
      } else {
        setGuestsCount(guestsCount + 1);
      }
    } else {
      setGuestsCount(guestsCount + 1);
    }
  };

  const handleDecrementGuests = () => {
    if (isMenuOrDrink && isGroupOver5) {
      setIsGroupOver5(false);
      setGuestsCount(5);
      return;
    }
    setGuestsCount(Math.max(1, guestsCount - 1));
  };

  const activeGuestSelections = guestSelections.slice(
    0,
    Math.min(5, guestsCount)
  );

  const calculateTotalDisplay = (): string => {
    if (isMenuOrDrink && isGroupOver5) {
      return t.moreThan5Label;
    }
    if (payload.kind === "menu_set_1" || payload.kind === "menu_set_2") {
      const prices = activeGuestSelections.map((g) =>
        g.menuTier === "menu_set_2" ? 320 : 190
      );
      const total = prices.reduce((acc, p) => acc + p, 0);
      if (prices.length === 1) {
        return `${total} MAD`;
      }
      const allSame = prices.every((p) => p === prices[0]);
      if (allSame) {
        return `${total} MAD (${prices.length} × ${prices[0]} MAD)`;
      }
      return `${total} MAD (${prices.join(" + ")} MAD)`;
    }
    if (payload.kind === "drink") {
      const prices = activeGuestSelections.map((g) => {
        const d =
          drinksList.find((dr) => dr.id === g.drinkId) || payload.drinkItem;
        return d ? d.priceMad : 20;
      });
      const total = prices.reduce((acc, p) => acc + p, 0);
      if (prices.length === 1) {
        return `${total} MAD`;
      }
      return `${total} MAD (${prices.join(" + ")} MAD)`;
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

  const buildGroupOver5WhatsAppUrl = (): string => {
    const lines: string[] = [];
    if (lang === "fr") {
      lines.push(`*Riad Sidi Ayoub — Demande Repas de Groupe (5+ Convives)*`);
      lines.push(
        `Bonjour, nous sommes un groupe de plus de 5 personnes et souhaitons organiser notre commande avec le Riad.`
      );
      if (guestName.trim()) lines.push(`Nom : ${guestName.trim()}`);
      if (roomName) lines.push(`Chambre : ${roomName}`);
      if (preferredDate)
        lines.push(`Date & Heure : ${preferredDate} ${preferredTime}`);
      if (notes.trim()) lines.push(`Notes : ${notes.trim()}`);
    } else if (lang === "es") {
      lines.push(`*Riad Sidi Ayoub — Solicitud de Grupo (5+ Huéspedes)*`);
      lines.push(
        `Hola, somos un grupo de más de 5 personas y nos gustaría organizar nuestro pedido directamente con el Riad.`
      );
      if (guestName.trim()) lines.push(`Nombre: ${guestName.trim()}`);
      if (roomName) lines.push(`Habitación: ${roomName}`);
      if (preferredDate)
        lines.push(`Fecha y Hora: ${preferredDate} ${preferredTime}`);
      if (notes.trim()) lines.push(`Notas: ${notes.trim()}`);
    } else {
      lines.push(`*Riad Sidi Ayoub — Group Dining Request (5+ Guests)*`);
      lines.push(
        `Hello, we are a group of more than 5 guests and would like to arrange our dinner/menu order directly with the Riad.`
      );
      if (guestName.trim()) lines.push(`Name: ${guestName.trim()}`);
      if (roomName) lines.push(`Room: ${roomName}`);
      if (preferredDate)
        lines.push(`Date & Time: ${preferredDate} ${preferredTime}`);
      if (notes.trim()) lines.push(`Notes: ${notes.trim()}`);
    }
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      lines.join("\n")
    )}`;
  };

  const buildWhatsAppUrl = (): string => {
    if (isMenuOrDrink && isGroupOver5) {
      return buildGroupOver5WhatsAppUrl();
    }

    const totalStr = calculateTotalDisplay();
    const lines: string[] = [];

    if (lang === "fr") {
      lines.push(`*Riad Sidi Ayoub — Réservation*`);
      if (payload.kind === "menu_set_1" || payload.kind === "menu_set_2") {
        lines.push(`Prestation : Commande Dîner (${guestsCount} convive(s))`);
        activeGuestSelections.forEach((g, idx) => {
          const st = startersList.find((s) => s.id === g.starterId);
          const mainsPool =
            g.menuTier === "menu_set_2" ? menuSet2SignatureMains : menuSet1Mains;
          const mn = mainsPool.find((m) => m.id === g.mainId) || mainsPool[0];
          const ds = dessertsList.find((d) => d.id === g.dessertId);
          const tierPrice = g.menuTier === "menu_set_2" ? "320 MAD" : "190 MAD";
          lines.push(
            `• *${t.guestLabel} ${idx + 1} (${tierPrice}) :* ${
              st?.name.fr || ""
            } + ${mn?.name.fr || ""} + ${ds?.name.fr || ""}`
          );
        });
      } else if (payload.kind === "drink") {
        lines.push(`Prestation : Boissons (${guestsCount} convive(s))`);
        activeGuestSelections.forEach((g, idx) => {
          const dr =
            drinksList.find((d) => d.id === g.drinkId) || drinksList[0];
          lines.push(
            `• *${t.guestLabel} ${idx + 1} :* ${dr.name.fr} (${dr.priceMad} MAD)`
          );
        });
      } else {
        lines.push(`Prestation : ${payload.title}`);
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
      lines.push(`Nom : ${guestName.trim()}`);
      if (roomName) {
        lines.push(`Chambre : ${roomName}`);
      }
      lines.push(`Personnes : ${guestsCount}`);
      lines.push(`Date & Heure : ${preferredDate} ${preferredTime}`);
      if (notes.trim()) lines.push(`Notes : ${notes.trim()}`);
    } else if (lang === "es") {
      lines.push(`*Riad Sidi Ayoub — Solicitud de Reserva*`);
      if (payload.kind === "menu_set_1" || payload.kind === "menu_set_2") {
        lines.push(`Servicio: Pedido de Cena (${guestsCount} huésped(es))`);
        activeGuestSelections.forEach((g, idx) => {
          const st = startersList.find((s) => s.id === g.starterId);
          const mainsPool =
            g.menuTier === "menu_set_2" ? menuSet2SignatureMains : menuSet1Mains;
          const mn = mainsPool.find((m) => m.id === g.mainId) || mainsPool[0];
          const ds = dessertsList.find((d) => d.id === g.dessertId);
          const tierPrice = g.menuTier === "menu_set_2" ? "320 MAD" : "190 MAD";
          lines.push(
            `• *${t.guestLabel} ${idx + 1} (${tierPrice}):* ${
              st?.name.es || ""
            } + ${mn?.name.es || ""} + ${ds?.name.es || ""}`
          );
        });
      } else if (payload.kind === "drink") {
        lines.push(`Servicio: Bebidas (${guestsCount} huésped(es))`);
        activeGuestSelections.forEach((g, idx) => {
          const dr =
            drinksList.find((d) => d.id === g.drinkId) || drinksList[0];
          lines.push(
            `• *${t.guestLabel} ${idx + 1}:* ${dr.name.es} (${dr.priceMad} MAD)`
          );
        });
      } else {
        lines.push(`Servicio: ${payload.title}`);
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
      lines.push(`Nombre: ${guestName.trim()}`);
      if (roomName) {
        lines.push(`Habitación: ${roomName}`);
      }
      lines.push(`Personas: ${guestsCount}`);
      lines.push(`Fecha y Hora: ${preferredDate} ${preferredTime}`);
      if (notes.trim()) lines.push(`Notas: ${notes.trim()}`);
    } else {
      lines.push(`*Riad Sidi Ayoub — Booking Request*`);
      if (payload.kind === "menu_set_1" || payload.kind === "menu_set_2") {
        lines.push(`Item: Dinner Order (${guestsCount} guest(s))`);
        activeGuestSelections.forEach((g, idx) => {
          const st = startersList.find((s) => s.id === g.starterId);
          const mainsPool =
            g.menuTier === "menu_set_2" ? menuSet2SignatureMains : menuSet1Mains;
          const mn = mainsPool.find((m) => m.id === g.mainId) || mainsPool[0];
          const ds = dessertsList.find((d) => d.id === g.dessertId);
          const tierPrice = g.menuTier === "menu_set_2" ? "320 MAD" : "190 MAD";
          lines.push(
            `• *${t.guestLabel} ${idx + 1} (${tierPrice}):* ${
              st?.name.en || ""
            } + ${mn?.name.en || ""} + ${ds?.name.en || ""}`
          );
        });
      } else if (payload.kind === "drink") {
        lines.push(`Item: Drinks Order (${guestsCount} guest(s))`);
        activeGuestSelections.forEach((g, idx) => {
          const dr =
            drinksList.find((d) => d.id === g.drinkId) || drinksList[0];
          lines.push(
            `• *${t.guestLabel} ${idx + 1}:* ${dr.name.en} (${dr.priceMad} MAD)`
          );
        });
      } else {
        lines.push(`Item: ${payload.title}`);
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
      lines.push(`Name: ${guestName.trim()}`);
      if (roomName) {
        lines.push(`Room: ${roomName}`);
      }
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
      <div className="w-full max-w-xl max-h-[92vh] overflow-y-auto bg-white border border-[#E6E4DF] rounded-t-2xl sm:rounded-xl shadow-xl font-sans">
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

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Selected Item & Live Total Summary */}
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

          {/* =========================================================
              MENU / DINNER ORDERING: GUEST COUNT SELECTOR (1..5 or 5+ Group)
          ========================================================= */}
          {isMenuOrDrink && (
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#1A1A1A] flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-[#9A5B3A]" />
                  <span>{t.guestCountLabel} *</span>
                </label>
                {/* Stepper (− / +) that also transitions > 5 into More than 5 (Group) */}
                <div className="inline-flex items-center rounded-lg border border-[#E6E4DF] bg-white overflow-hidden">
                  <button
                    type="button"
                    onClick={handleDecrementGuests}
                    aria-label="Decrease guests"
                    className="px-2.5 py-1 bg-[#FAF9F6] hover:bg-[#E6E4DF] text-[#1A1A1A] text-xs font-semibold transition-colors"
                  >
                    −
                  </button>
                  <span className="px-3 text-xs font-semibold text-[#1A1A1A]">
                    {isGroupOver5 ? "5+" : guestsCount}
                  </span>
                  <button
                    type="button"
                    onClick={handleIncrementGuests}
                    aria-label="Increase guests"
                    className="px-2.5 py-1 bg-[#FAF9F6] hover:bg-[#E6E4DF] text-[#1A1A1A] text-xs font-semibold transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Pill Buttons: 1, 2, 3, 4, 5, More than 5 (Group) */}
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {([1, 2, 3, 4, 5] as const).map((num) => {
                  const active = !isGroupOver5 && guestsCount === num;
                  return (
                    <button
                      key={num}
                      type="button"
                      onClick={() => handleSelectGuestCount(num)}
                      className={`py-2.5 px-3 rounded-lg border text-xs font-semibold transition-all ${
                        active
                          ? "border-[#1A1A1A] bg-[#1A1A1A] text-white shadow-sm"
                          : "border-[#E6E4DF] bg-white text-[#1A1A1A] hover:bg-[#FAF9F6]"
                      }`}
                    >
                      {num}
                    </button>
                  );
                })}
                <button
                  type="button"
                  onClick={() => handleSelectGuestCount("group")}
                  className={`col-span-3 sm:col-span-1 py-2.5 px-2.5 rounded-lg border text-xs font-semibold transition-all ${
                    isGroupOver5
                      ? "border-[#9A5B3A] bg-[#9A5B3A] text-white shadow-sm"
                      : "border-[#E6E4DF] bg-white text-[#1A1A1A] hover:bg-[#FAF9F6]"
                  }`}
                >
                  {t.moreThan5Label}
                </button>
              </div>
            </div>
          )}

          {/* =========================================================
              GROUP LIMIT (> 5 GUESTS) AUTOMATIC WHATSAPP NOTICE
          ========================================================= */}
          {isMenuOrDrink && isGroupOver5 && (
            <div className="space-y-4 rounded-xl bg-[#FAF9F6] border-2 border-[#9A5B3A]/40 p-5">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-[#9A5B3A]/15 text-[#9A5B3A] flex items-center justify-center shrink-0 mt-0.5">
                  <Users className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif text-lg font-semibold text-[#1A1A1A]">
                    {t.groupNoticeTitle}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#63615C] leading-relaxed">
                    {t.groupNoticeText}
                  </p>
                </div>
              </div>

              {/* Optional Name & Room Selector inside Group Notice so pre-filled WhatsApp message includes Room Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-xs font-medium text-[#63615C] mb-1">
                    {t.modalName}
                  </label>
                  <input
                    type="text"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder={t.modalNamePlaceholder}
                    className="w-full rounded-lg border border-[#E6E4DF] bg-white px-3 py-2 text-sm text-[#1A1A1A] focus:border-[#1A1A1A] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#63615C] mb-1">
                    {t.modalRoom}
                  </label>
                  <select
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                    className="w-full rounded-lg border border-[#E6E4DF] bg-white px-3 py-2 text-sm text-[#1A1A1A] focus:border-[#1A1A1A] focus:outline-none"
                  >
                    <option value="">{t.modalRoomPlaceholder}</option>
                    {RIAD_ROOMS.map((room) => (
                      <option key={room} value={room}>
                        {room}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <a
                href={buildGroupOver5WhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-5 rounded-lg bg-[#9A5B3A] hover:bg-[#824A2D] text-white text-xs sm:text-sm font-medium inline-flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{t.groupWhatsAppBtn}</span>
              </a>
            </div>
          )}

          {/* =========================================================
              DYNAMIC PER-GUEST CHOICES (1 TO 5 GUESTS)
          ========================================================= */}
          {(payload.kind === "menu_set_1" || payload.kind === "menu_set_2") &&
            !isGroupOver5 && (
              <div className="space-y-3.5">
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1A1A1A]">
                    {t.perGuestMenuHeading}
                  </h4>
                  <p className="text-[11px] text-[#63615C] mt-0.5">
                    {t.perGuestMenuSub}
                  </p>
                </div>

                <div className="space-y-3.5">
                  {activeGuestSelections.map((guestSel, idx) => {
                    const guestMains =
                      guestSel.menuTier === "menu_set_2"
                        ? menuSet2SignatureMains
                        : menuSet1Mains;
                    const guestPrice =
                      guestSel.menuTier === "menu_set_2"
                        ? "320 MAD"
                        : "190 MAD";

                    return (
                      <div
                        key={idx}
                        className="p-4 rounded-xl border border-[#E6E4DF] bg-[#FAF9F6]/60 space-y-3"
                      >
                        <div className="flex items-center justify-between border-b border-[#E6E4DF] pb-2">
                          <span className="font-serif text-base font-semibold text-[#1A1A1A]">
                            {t.guestLabel} {idx + 1}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full bg-white border border-[#E6E4DF] text-xs font-semibold text-[#9A5B3A]">
                            {guestPrice}
                          </span>
                        </div>

                        {/* Menu Tier Formula Selector (190 MAD vs 320 MAD) */}
                        <div>
                          <label className="block text-[11px] font-medium text-[#63615C] mb-1">
                            {t.chooseMenuFormula}
                          </label>
                          <select
                            value={guestSel.menuTier}
                            onChange={(e) =>
                              updateGuestSelection(idx, {
                                menuTier: e.target.value as
                                  | "menu_set_1"
                                  | "menu_set_2",
                              })
                            }
                            className="w-full rounded-lg border border-[#E6E4DF] bg-white px-3 py-2 text-xs sm:text-sm font-medium text-[#1A1A1A] focus:border-[#1A1A1A] focus:outline-none"
                          >
                            <option value="menu_set_1">
                              {t.menu1Title} ({t.menu1Subtitle})
                            </option>
                            <option value="menu_set_2">
                              {t.menu2Title} ({t.menu2Subtitle})
                            </option>
                          </select>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                          <div>
                            <label className="block text-[11px] font-medium text-[#63615C] mb-1">
                              {t.modalChooseStarter}
                            </label>
                            <select
                              value={guestSel.starterId}
                              onChange={(e) =>
                                updateGuestSelection(idx, {
                                  starterId: e.target.value,
                                })
                              }
                              className="w-full rounded-lg border border-[#E6E4DF] bg-white px-2.5 py-2 text-xs sm:text-sm text-[#1A1A1A] focus:border-[#1A1A1A] focus:outline-none"
                            >
                              {startersList.map((st) => (
                                <option key={st.id} value={st.id}>
                                  {st.name[lang]}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-[11px] font-medium text-[#63615C] mb-1">
                              {t.modalChooseMain}
                            </label>
                            <select
                              value={guestSel.mainId}
                              onChange={(e) =>
                                updateGuestSelection(idx, {
                                  mainId: e.target.value,
                                })
                              }
                              className="w-full rounded-lg border border-[#E6E4DF] bg-white px-2.5 py-2 text-xs sm:text-sm text-[#1A1A1A] focus:border-[#1A1A1A] focus:outline-none"
                            >
                              {guestMains.map((m) => (
                                <option key={m.id} value={m.id}>
                                  {m.name[lang]}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-[11px] font-medium text-[#63615C] mb-1">
                              {t.modalChooseDessert}
                            </label>
                            <select
                              value={guestSel.dessertId}
                              onChange={(e) =>
                                updateGuestSelection(idx, {
                                  dessertId: e.target.value,
                                })
                              }
                              className="w-full rounded-lg border border-[#E6E4DF] bg-white px-2.5 py-2 text-xs sm:text-sm text-[#1A1A1A] focus:border-[#1A1A1A] focus:outline-none"
                            >
                              {dessertsList.map((d) => (
                                <option key={d.id} value={d.id}>
                                  {d.name[lang]}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

          {/* Per-Guest Drink Choices (1 to 5 Guests) */}
          {payload.kind === "drink" && !isGroupOver5 && (
            <div className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1A1A1A]">
                {t.perGuestMenuHeading}
              </h4>
              <div className="space-y-2.5">
                {activeGuestSelections.map((guestSel, idx) => {
                  const selectedDrink =
                    drinksList.find((d) => d.id === guestSel.drinkId) ||
                    drinksList[0];
                  return (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl border border-[#E6E4DF] bg-[#FAF9F6]/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5"
                    >
                      <div className="flex items-center justify-between sm:justify-start gap-2">
                        <span className="font-serif text-base font-semibold text-[#1A1A1A]">
                          {t.guestLabel} {idx + 1}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-white border border-[#E6E4DF] text-xs font-semibold text-[#9A5B3A]">
                          {selectedDrink.priceMad} MAD
                        </span>
                      </div>
                      <select
                        value={guestSel.drinkId}
                        onChange={(e) =>
                          updateGuestSelection(idx, { drinkId: e.target.value })
                        }
                        className="sm:w-72 rounded-lg border border-[#E6E4DF] bg-white px-3 py-2 text-xs sm:text-sm text-[#1A1A1A] focus:border-[#1A1A1A] focus:outline-none"
                      >
                        {drinksList.map((dr) => (
                          <option key={dr.id} value={dr.id}>
                            {dr.name[lang]} ({dr.priceMad} MAD)
                          </option>
                        ))}
                      </select>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Group vs Private Toggle for Excursions */}
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

          {/* Standard Booking Fields (Hidden when Group > 5 notice is active) */}
          {!(isMenuOrDrink && isGroupOver5) && (
            <>
              {/* Guest Name (Required) & Room Name Selector (Optional) */}
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
                    {t.modalRoom}
                  </label>
                  <select
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                    className="w-full rounded-lg border border-[#E6E4DF] bg-white px-3.5 py-2.5 text-sm text-[#1A1A1A] focus:border-[#1A1A1A] focus:outline-none"
                  >
                    <option value="">{t.modalRoomPlaceholder}</option>
                    {RIAD_ROOMS.map((room) => (
                      <option key={room} value={room}>
                        {room}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Preferred Date, Preferred Time & Number of Guests (for Wellness/Excursions) */}
              <div
                className={`grid grid-cols-1 ${
                  isMenuOrDrink ? "sm:grid-cols-2" : "sm:grid-cols-3"
                } gap-3.5`}
              >
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
                  {payload.kind === "wellness" ? (
                    <select
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      className="w-full rounded-lg border border-[#E6E4DF] bg-white px-3 py-2.5 text-sm text-[#1A1A1A] focus:border-[#1A1A1A] focus:outline-none"
                    >
                      {HAMMAM_TIME_SLOTS.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="time"
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      className="w-full rounded-lg border border-[#E6E4DF] bg-white px-3 py-2.5 text-sm text-[#1A1A1A] focus:border-[#1A1A1A] focus:outline-none"
                    />
                  )}
                </div>

                {!isMenuOrDrink && (
                  <div>
                    <label className="block text-xs font-medium text-[#63615C] mb-1">
                      {t.modalGuests} *
                    </label>
                    <div className="flex items-center rounded-lg border border-[#E6E4DF] bg-white overflow-hidden">
                      <button
                        type="button"
                        onClick={handleDecrementGuests}
                        className="px-3.5 py-2.5 bg-[#FAF9F6] hover:bg-[#E6E4DF] text-[#1A1A1A] text-sm font-medium transition-colors"
                      >
                        −
                      </button>
                      <span className="flex-1 text-center text-sm font-medium text-[#1A1A1A]">
                        {guestsCount}
                      </span>
                      <button
                        type="button"
                        onClick={handleIncrementGuests}
                        className="px-3.5 py-2.5 bg-[#FAF9F6] hover:bg-[#E6E4DF] text-[#1A1A1A] text-sm font-medium transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                )}
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
            </>
          )}
        </form>
      </div>
    </div>
  );
}
