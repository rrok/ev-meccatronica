import { Component, ViewChild, ElementRef, signal } from '@angular/core';
import { HEADLIGHT_SLIDER } from '../../data/site-data';

@Component({
  selector: 'ev-headlight-slider',
  standalone: true,
  templateUrl: './headlight-slider.html',
})
export class HeadlightSliderComponent {
  readonly images = HEADLIGHT_SLIDER;

  @ViewChild('slider') slider!: ElementRef<HTMLDivElement>;
  sliderPos = signal(50);
  private dragging = false;

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
