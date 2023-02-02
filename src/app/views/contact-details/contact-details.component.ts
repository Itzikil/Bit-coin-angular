import { Component, Input, OnInit } from '@angular/core';
import { lastValueFrom, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from 'src/app/model/contact.model';
import { ContactService } from 'src/app/service/contact.service';
import { UserService } from 'src/app/service/user.service';
import { Move, User } from 'src/app/model/user.model';

@Component({
  selector: 'contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent implements OnInit {

  constructor(
    private contactService: ContactService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  subscription!: Subscription
  @Input() contactId!: string

  amount!: number
  contact!: Contact
  moves!: any
  user!: User


  async ngOnInit(): Promise<void> {
    this.subscription = this.route.params.subscribe(async params => {
      const contactId = params['id']
      const contact = await lastValueFrom(this.contactService.getContactById(contactId))
      this.contact = contact
      this.user = await lastValueFrom(this.userService.getUser())
      this.contactTransfers()
    })
  }

  async contactTransfers() {
    const moves = await lastValueFrom(this.userService.getUserMoves())
    if (moves) {
      const contactMoves = moves.filter((move: any) =>
        move.toId === this.contact._id && move.fromId === this.user._id)
      this.moves = contactMoves
      console.log(moves);
      console.log(this.contact);
    }else this.moves = []
  }

  async onTransfer() {
    console.log(this.amount);
    const move = await this.userService.addMove(this.contact, this.amount)
    this.moves.unshift(move)
  }

  onBack() {
    this.router.navigateByUrl('/contact')
  }
}
