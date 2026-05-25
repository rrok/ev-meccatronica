import { Component, HostListener, signal } from '@angular/core';

@Component({
  selector: 'ev-navbar',
  standalone: true,
  templateUrl: './navbar.html',
})
export class NavbarComponent {
  scrolled   = signal(false);
  collapsed  = signal(true);

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 60);
  }

  toggle(): void {
    this.collapsed.update(v => !v);
  }

  scrollTo(id: string): void {
    this.collapsed.set(true);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }
}
