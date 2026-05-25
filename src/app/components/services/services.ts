import { Component } from '@angular/core';
import { SERVICES } from '../../data/site-data';

@Component({
  selector: 'ev-services',
  standalone: true,
  templateUrl: './services.html',
})
export class ServicesComponent {
  readonly services = SERVICES;
}
