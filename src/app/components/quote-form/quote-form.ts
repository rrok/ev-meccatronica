import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SERVIZI_OPTIONS, CONTACT } from '../../data/site-data';

@Component({
  selector: 'ev-quote-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './quote-form.html',
})
export class QuoteFormComponent {
  readonly options = SERVIZI_OPTIONS;
  private readonly contact = CONTACT;

  form = { nome: '', telefono: '', auto: '', servizio: '', messaggio: '' };

  submit(): void {
    const { nome, telefono, auto, servizio, messaggio } = this.form;
    if (!nome || !telefono || !auto || !servizio) {
      alert('Per favore compila tutti i campi obbligatori.');
      return;
    }

    const lines = [
      '*Nuova Richiesta Preventivo*', '',
      `👤 *Nome:* ${nome}`,
      `📞 *Telefono:* ${telefono}`,
      `🚗 *Auto/Targa:* ${auto}`,
      `🔧 *Servizio:* ${servizio}`,
    ];
    if (messaggio) lines.push(`📝 *Note:* ${messaggio}`);

    const text = encodeURIComponent(lines.join('\n'));
    window.open(`https://wa.me/${this.contact.whatsapp}?text=${text}`, '_blank');
  }
}
