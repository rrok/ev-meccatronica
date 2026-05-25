import { Component } from '@angular/core';
import { CLIENTS } from '../../data/site-data';

@Component({
  selector: 'ev-clients',
  standalone: true,
  templateUrl: './clients.html',
})
export class ClientsComponent {
  readonly clients = CLIENTS;
}
