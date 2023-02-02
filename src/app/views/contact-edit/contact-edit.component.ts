import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom, Subscription } from 'rxjs';
import { Contact } from 'src/app/model/contact.model';
import { ContactService } from 'src/app/service/contact.service';


@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.scss']
})
export class ContactEditComponent implements OnInit {

  constructor(private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) { }
  contact!: Contact
  subscription!: Subscription

  ngOnInit(): void {

    this.route.params.subscribe(async ({ id }) => {
      this.contact = id
        ? await lastValueFrom(this.contactService.getContactById(id))
        : this.contactService.getEmptyContact() as Contact
    })
    // this.subscription = this.route.data.subscribe(({ contact }) => {
    //   this.contact = contact || this.contactService.getEmptyContact() as Contact
    // })
  }

  onRemove(){
    console.log('remove' , this.contact._id);
    this.contactService.deleteContact(this.contact._id!)
    this.onBack()
  }


  onSubmit(form: NgForm) {
    const contact = {...this.contact , ...form.value}
    this.contactService.saveContact(contact)
    this.router.navigateByUrl('/contact')
  }

  // ngOnDestroy(): void {
  //   this.subscription.unsubscribe()
  // }
  onBack() {
    this.router.navigateByUrl('/contact')
  }
}
