import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Member } from '../models/member-model';
import { MemberService } from '../services/member.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm-acc',
  templateUrl: './confirm-acc.page.html',
  styleUrls: ['./confirm-acc.page.scss'],
})
export class ConfirmAccPage implements OnInit {
  member: Member = {
    MemberID: 0,
    Username: '',
    Password: '',
    Email: '',
    Start_date: new Date(),
    profilePicture: '',
    type: '',
  };
  constructor(
    private storage: Storage,
    private memberService: MemberService,
    private router: Router
  ) {}

  async ngOnInit() {
    await this.storage.create();
  }
  async ionViewWillEnter() {
    this.member = await this.storage.get('forgetPass');
  }
  confirmAccount() {
    this.memberService
      .addForgetPass(
        this.member.MemberID,
        this.member.Username,
        this.member.Email
      )
      .subscribe(async (response) => {
        if (response.status !== 'success') {
          return;
        }
        this.router.navigate(['/enter-confirm-pass']);
      });
  }
}
