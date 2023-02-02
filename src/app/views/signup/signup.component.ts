import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  constructor(private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  username!: string

  async onSubmit(form: NgForm) {
    console.log('form.value:', form.value)
    this.username = form.value.name
    console.log(this.username);
    
    await this.userService.signup(this.username)
    this.router.navigateByUrl('/')
  }
}
