import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Contact } from 'src/app/model/contact.model';

@Component({
  selector: 'contact-preview',
  templateUrl: './contact-preview.component.html',
  styleUrls: ['./contact-preview.component.scss']
})
export class ContactPreviewComponent {

  @Input() contact!: Contact
  @Output() onSelect = new EventEmitter<string>()

  onSelectContactId() {
    this.onSelect.emit(this.contact._id)
  }

}
