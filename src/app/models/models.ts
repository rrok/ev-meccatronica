// ═══════════════════════════════════════════════════════════
// EV MECCATRONICA — Modelli TypeScript
// ═══════════════════════════════════════════════════════════

export interface GalleryImage {
  src: string;
  alt: string;
}

export interface GalleryFilter {
  key: string;
  label: string;
}

export interface Service {
  icon: string;
  title: string;
  desc: string;
}

export interface Equipment {
  icon: string;
  label: string;
  detail: string;
}

export interface Client {
  src: string;
  alt: string;
}
