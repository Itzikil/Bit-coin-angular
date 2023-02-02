import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Move, User } from 'src/app/model/user.model';
import { lastValueFrom } from 'rxjs';
import { UserService } from 'src/app/service/user.service';
import { BitcoinService } from 'src/app/service/bitcoin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  constructor(
    private userService: UserService,
    private bitcoinService: BitcoinService,
    private router: Router,
  ) { }

  user!: User
  title = 'MR-bitcoin';
  bts!: any
  moves!: any
  displayedMoves!: any

  subscription!: Subscription

  async ngOnInit(): Promise<void> {
    const user = await lastValueFrom(this.userService.getUser())
    this.user = user

    if (!user) {
      this.router.navigateByUrl('/signup')
      return
    }

    var moves = await lastValueFrom(this.userService.getUserMoves())
    if (moves) {
      this.moves = moves.filter((move: any) => move.fromId === this.user._id)
      this.loadDisplayedMOves(5)
    }

    // this.getRate()
  }

  loadDisplayedMOves(amount: number ) {
    // console.log(amount);
    
    // this.displayedMoves = this.moves.sort((a: any, b: any) =>  b.at - a.at)
    this.displayedMoves = this.moves.slice(0 , amount)
    console.log(this.displayedMoves);
  }

  getRate() {
    this.bts = this.bitcoinService.getRate('100')
  }
}
