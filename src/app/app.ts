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
  }
}

