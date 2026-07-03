// ═══════════════════════════════════════════════════════════
// EV MECCATRONICA — Dati del Sito
//
// ✏️  COME MODIFICARE:
//   • Foto gallery    → GALLERY_IMAGES (aggiungi/rimuovi/cambia src)
//   • Foto prima/dopo → HEADLIGHT_SLIDER
//   • Servizi         → SERVICES
//   • Attrezzatura    → EQUIPMENT
//   • Clienti (loghi) → CLIENTS
//   • Form preventivo → SERVIZI_OPTIONS
//   • Contatti        → CONTACT
//   • Hero / Officina / Storia → HERO, OFFICINA, STORIA
// ═══════════════════════════════════════════════════════════

import type { Service, Equipment, Client } from '../models/models';

// ── HERO ─────────────────────────────────────────────────────
export const HERO = {
  backgroundImage: 'images/hero-main.jpg',
  badge1: '40 Anni di Storia',
  badge2: 'Meccanici con 25+ Anni di Esperienza',
  subtitle: 'Specialisti in Trasmissioni Automatiche e Performance dal 1986. Centro Assistenza Cambio Automatico — Forlimpopoli.',
};

// ── OFFICINA ─────────────────────────────────────────────────
export const OFFICINA = {
  image: 'images/valter-2.png',
  imageAlt: 'Elezi Valter - Titolare EV Meccatronica',
  ownerLabel: 'ELEZI VALTER — TITOLARE',
};

// ── STORIA ───────────────────────────────────────────────────
export const STORIA = {
  image: 'images/hero-main.jpg',
  imageAlt: 'EV Meccatronica - Centro Assistenza Cambio Automatico Forlimpopoli',
};

// ── BEFORE / AFTER SLIDER (Lucidatura Fari) ──────────────────
// Aggiungi altre coppie qui per farle comparire nello slider (frecce ◀ ▶)
export const HEADLIGHT_SLIDER = [
  {
    before: { src: 'images/prima.png', alt: 'Faro prima della lucidatura' },
    after:  { src: 'images/dopo.png',  alt: 'Faro dopo la lucidatura' },
  },
  {
    before: { src: 'images/prima-2.png', alt: 'Faro prima della lucidatura' },
    after:  { src: 'images/dopo-2.png',  alt: 'Faro dopo la lucidatura' },
  },
];

// ── SERVIZI ──────────────────────────────────────────────────
export const SERVICES: Service[] = [
  {
    icon: 'bi-gear-wide-connected',
    title: 'Cambi Automatici',
    desc: 'Manutenzione, lavaggio ATF, diagnosi elettronica e revisione completa di cambi automatici, robotizzati e CVT. Attrezzatura Q8 ATF dedicata.',
  },
  {
    icon: 'bi-speedometer2',
    title: 'Motorsport & Performance',
    desc: 'Preparazione sportiva, mappatura centraline ECU personalizzata e ottimizzazione parametri motore per massime prestazioni.',
  },
  {
    icon: 'bi-fan',
    title: 'Rettifica & Motori',
    desc: 'Revisione motori completa, rettifica componenti al tornio professionale, revisione turbo e rigenerazione testata.',
  },
  {
    icon: 'bi-gear-fill',
    title: 'Revisione Motore Totale',
    desc: 'Smontaggio e revisione integrale del motore: distribuzione, testate, pistoni, bielle, guarnizioni e tutti i componenti interni. Ripristino completo delle prestazioni originali.',
  },
  {
    icon: 'bi-fire',
    title: 'Carpenteria Tecnica',
    desc: 'Saldature professionali MMA, a Filo continuo e TIG. Realizzazione pezzi speciali e riparazioni strutturali.',
  },
  {
    icon: 'bi-shield-check',
    title: 'Tagliandi Certificati',
    desc: 'Manutenzione ordinaria e straordinaria per tutti i marchi in garanzia. Ricambi originali e equivalenti certificati.',
  },
  {
    icon: 'bi-lightbulb',
    title: 'Lucidatura Fari',
    desc: 'Ripristino professionale fari ingialliti e opacizzati. Risultato trasparente come nuovo, durata garantita.',
  },
];

// ── ATTREZZATURA OFFICINA ─────────────────────────────────────
export const EQUIPMENT: Equipment[] = [
  { icon: 'bi-arrows-expand', label: 'Ponti fino a 4200 kg', detail: 'Auto, furgoni e mezzi industriali' },
  { icon: 'bi-droplet-half',  label: 'Stazione ATF Q8',      detail: 'Lavaggio e sostituzione olio cambio' },
  { icon: 'bi-tools',         label: 'Tornio & Fresa',        detail: 'Lavorazioni meccaniche di precisione' },
  { icon: 'bi-cpu',           label: 'Diagnosi Multimarca',   detail: 'Strumentazione elettronica avanzata' },
];

// ── CLIENTI (loghi) ───────────────────────────────────────────
export const CLIENTS: Client[] = [
  { src: 'images/martini-gruppo.png', alt: 'Gruppo Martini' },
  { src: 'images/orogel.png',         alt: 'Orogel'         },
  { src: 'images/amadori.png',        alt: 'Amadori'        },
  { src: 'images/pf-impianti.svg',    alt: 'PF Impianti'    },
];

// ── FORM PREVENTIVO — opzioni dropdown ────────────────────────
export const SERVIZI_OPTIONS: string[] = [
  'Cambio Automatico - Manutenzione/Revisione',
  'Motorsport - Mappatura Centralina',
  'Revisione Motore',
  'Revisione Motore Totale',
  'Rettifica / Tornio',
  'Carpenteria / Saldatura TIG',
  'Tagliando Certificato',
  'Lucidatura Fari',
  'Diagnosi Elettronica',
  'Altro',
];

// ── CONTATTI ─────────────────────────────────────────────────
export const CONTACT = {
  phone:           '0543.545937',
  phoneHref:       'tel:0543545937',
  mobile:          '348.619.3795',
  mobileHref:      'tel:3486193795',
  whatsapp:        '393486193795',
  address:         'Via Emilia per Cesena, 1311 — Forlimpopoli (FC)',
  hours:           'Lun–Ven: 8:00–12:30 e 14:00–18:00',
  instagram:       'https://www.instagram.com/ev_meccatronica/',
  instagramHandle: '@ev_meccatronica',
  vatNumber:       '04683310405',
  fiscalCode:      'LZE VTR 86R01 Z100T',
  sdi:             'SUBM70N',
};
