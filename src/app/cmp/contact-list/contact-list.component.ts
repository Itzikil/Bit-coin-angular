import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Contact } from 'src/app/model/contact.model';
import { ContactService } from 'src/app/service/contact.service';

@Component({
  selector: 'contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {
  constructor(private contactService: ContactService) { }

  @Input() contacts!: Contact[] | null
  @Output() onSelect = new EventEmitter<string>()

  subscription!: Subscription


  ngOnInit(): void {
    this.contactService.loadContacts({ term: '' })
    this.subscription = this.contactService.contacts$.subscribe(contacts => {
      this.contacts = contacts
    })
    // this.contacts$ = this.contactService.contacts$
    // this.contacts = this.contacts$
  }


}
