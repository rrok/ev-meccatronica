// ═══════════════════════════════════════════════════════════
// gallery.service.ts
//
// Carica le immagini scansionando le cartelle gallery in tempo reale.
// Usa un manifest JSON generato dallo script generate-gallery.mjs
// oppure legge gallery-manifest.json dalla cartella public.
// ═══════════════════════════════════════════════════════════

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import type { GalleryImage, GalleryFilter } from '../models/models';

export interface GalleryData {
  images: GalleryImage[];
  filters: GalleryFilter[];
}

@Injectable({ providedIn: 'root' })
export class GalleryService {
  private http = inject(HttpClient);

  load(): Observable<GalleryData> {
    return this.http.get<Record<string, { src: string; alt: string }[]>>('images/gallery/manifest.json').pipe(
      map(manifest => {
        const images: GalleryImage[] = [];
        const filters: GalleryFilter[] = [{ key: 'all', label: 'Tutti' }];

        for (const [cat, imgs] of Object.entries(manifest)) {
          const label = cat.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
          filters.push({ key: cat, label });
          for (const img of imgs) {
            images.push(img);
          }
        }

        return { images, filters };
      })
    );
  }
}
