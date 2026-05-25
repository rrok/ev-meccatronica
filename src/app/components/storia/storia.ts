import { Component } from '@angular/core';
import { STORIA } from '../../data/site-data';

@Component({
  selector: 'ev-storia',
  standalone: true,
  templateUrl: './storia.html',
})
export class StoriaComponent {
  readonly storia = STORIA;
}
