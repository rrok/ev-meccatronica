import { Component, AfterViewInit } from '@angular/core';
import { NavbarComponent }          from './components/navbar/navbar';
import { HeroComponent }            from './components/hero/hero';
import { ServicesComponent }        from './components/services/services';
import { OfficinaComponent }        from './components/officina/officina';
import { ClientsComponent }         from './components/clients/clients';
import { HeadlightSliderComponent } from './components/headlight-slider/headlight-slider';
import { GalleryComponent }         from './components/gallery/gallery';
import { StoriaComponent }          from './components/storia/storia';
import { QuoteFormComponent }       from './components/quote-form/quote-form';
import { FooterComponent }          from './components/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavbarComponent,
    HeroComponent,
    ServicesComponent,
    OfficinaComponent,
    ClientsComponent,
    HeadlightSliderComponent,
    GalleryComponent,
    StoriaComponent,
    QuoteFormComponent,
    FooterComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements AfterViewInit {
  ngAfterViewInit(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.anim-fade-up, .anim-fade-left, .anim-fade-right')
      .forEach(el => observer.observe(el));

    this.scrollToFragmentWhenStable();
    window.addEventListener('hashchange', () => this.scrollToFragmentWhenStable());
  }

  /**
   * Sections below the gallery grow after it finishes loading (async manifest
   * fetch + lazy images), so the browser's one-shot fragment scroll lands
   * short. Re-scroll to the target while the page's height is still settling.
   */
  private scrollToFragmentWhenStable(): void {
    const id = location.hash.slice(1);
    if (!id) return;

    let settleTimer: ReturnType<typeof setTimeout>;
    const resizeObserver = new ResizeObserver(() => {
      document.getElementById(id)?.scrollIntoView();
      clearTimeout(settleTimer);
      settleTimer = setTimeout(() => resizeObserver.disconnect(), 400);
    });
    resizeObserver.observe(document.body);

    // Safety cap in case something keeps resizing (e.g. an autoplay slider).
    setTimeout(() => resizeObserver.disconnect(), 5000);
  }
}

