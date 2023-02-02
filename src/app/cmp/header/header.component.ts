import { Component } from '@angular/core';
import { lastValueFrom, Subscription } from 'rxjs';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(
    private userService: UserService,
  ) { }

  user!: User

  subscription!: Subscription
  async ngOnInit(): Promise<void> {
    const user = await lastValueFrom(this.userService.getUser())
    this.user = user
    console.log(user);
    
  }

}
