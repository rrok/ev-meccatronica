import { Component, HostListener, signal, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { GalleryImage, GalleryFilter } from '../../models/models';

/** Estrae il nome della cartella da "images/gallery/<categoria>/foto.jpg" */
function folderOf(src: string): string {
  return decodeURIComponent(src).split('/')[2] ?? '';
}

/** Trasforma "cambi-automatici" → "Cambi Automatici" */
function toLabel(folder: string): string {
  return folder.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

@Component({
  selector: 'ev-gallery',
  standalone: true,
  templateUrl: './gallery.html',
})
export class GalleryComponent implements OnInit {
  private http = inject(HttpClient);

  private all: GalleryImage[] = [];
  filters: GalleryFilter[] = [{ key: 'all', label: 'Tutti' }];
  filtered: GalleryImage[] = [];
  activeFilter = signal('all');
  lightboxSrc  = signal<string | null>(null);

  ngOnInit(): void {
    // Carica manifest.json dalla cartella public — si aggiorna automaticamente
    // ogni volta che gira gen-gallery, senza ricompilare Angular.
    this.http.get<Record<string, GalleryImage[]>>('images/gallery/manifest.json').subscribe({
      next: manifest => {
        this.all = [];
        const cats = Object.keys(manifest);
        this.filters = [
          { key: 'all', label: 'Tutti' },
          ...cats.map(cat => ({ key: cat, label: toLabel(cat) })),
        ];
        for (const imgs of Object.values(manifest)) {
          this.all.push(...imgs);
        }
        this.filtered = [...this.all];
      },
      error: () => {
        // Fallback: importa dal file statico generato
        import('../../data/gallery-generated').then(m => {
          this.all = m.GALLERY_IMAGES;
          const cats = [...new Set(this.all.map(img => folderOf(img.src)))];
          this.filters = [
            { key: 'all', label: 'Tutti' },
            ...cats.map(cat => ({ key: cat, label: toLabel(cat) })),
          ];
          this.filtered = [...this.all];
        });
      },
    });
  }

  filter(cat: string): void {
    this.activeFilter.set(cat);
    this.filtered = cat === 'all'
      ? [...this.all]
      : this.all.filter(img => folderOf(img.src) === cat);
  }

  open(src: string): void {
    this.lightboxSrc.set(src);
  }

  close(): void {
    this.lightboxSrc.set(null);
  }

  @HostListener('document:keydown.escape')
  onEsc(): void {
    this.close();
  }
}
