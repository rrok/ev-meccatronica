import { Component, ViewChild, ElementRef, signal, computed } from '@angular/core';
import { HEADLIGHT_SLIDER } from '../../data/site-data';

@Component({
  selector: 'ev-headlight-slider',
  standalone: true,
  templateUrl: './headlight-slider.html',
})
export class HeadlightSliderComponent {
  private readonly pairs = HEADLIGHT_SLIDER;

  activeIndex = signal(0);
  readonly images = computed(() => this.pairs[this.activeIndex()]);
  readonly hasMultiple = this.pairs.length > 1;

  @ViewChild('slider') slider!: ElementRef<HTMLDivElement>;
  sliderPos = signal(50);
  private dragging = false;

  next(): void {
    this.activeIndex.set((this.activeIndex() + 1) % this.pairs.length);
    this.sliderPos.set(50);
  }

  prev(): void {
    this.activeIndex.set((this.activeIndex() - 1 + this.pairs.length) % this.pairs.length);
    this.sliderPos.set(50);
  }

  scrollTo(id: string): void {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  onPointerDown(e: PointerEvent): void {
    this.dragging = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    this.update(e);
  }

  onPointerMove(e: PointerEvent): void {
    if (!this.dragging) return;
    this.update(e);
  }

  onPointerUp(): void {
    this.dragging = false;
  }

  private update(e: PointerEvent): void {
    const rect = this.slider.nativeElement.getBoundingClientRect();
    const x = Math.max(2, Math.min(98, ((e.clientX - rect.left) / rect.width) * 100));
    this.sliderPos.set(x);
  }
}
