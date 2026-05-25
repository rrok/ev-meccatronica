import { Component } from '@angular/core';
import { CONTACT } from '../../data/site-data';

@Component({
  selector: 'ev-footer',
  standalone: true,
  templateUrl: './footer.html',
})
export class FooterComponent {
  readonly c = CONTACT;
  readonly year = new Date().getFullYear();
}
