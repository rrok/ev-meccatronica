import { Component } from '@angular/core';
import { EQUIPMENT, OFFICINA } from '../../data/site-data';

@Component({
  selector: 'ev-officina',
  standalone: true,
  templateUrl: './officina.html',
})
export class OfficinaComponent {
  readonly equipment = EQUIPMENT;
  readonly officina  = OFFICINA;
}
