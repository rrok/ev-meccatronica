import { Component } from '@angular/core';
import { HERO } from '../../data/site-data';

@Component({
  selector: 'ev-hero',
  standalone: true,
  templateUrl: './hero.html',
})
export class HeroComponent {
  readonly hero = HERO;

  scrollTo(id: string): void {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }
}
