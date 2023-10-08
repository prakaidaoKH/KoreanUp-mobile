import { Component, OnInit } from '@angular/core';
import { MemberService } from '../services/member.service';
import { Member } from '../models/member-model';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-pass',
  templateUrl: './forget-pass.page.html',
  styleUrls: ['./forget-pass.page.scss'],
})
export class ForgetPassPage implements OnInit {
  members: Member[] = [];
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
    private memberService: MemberService,
    private storage: Storage,
    private router: Router
  ) {}

  async ngOnInit() {
    this.storage.create();
  }

  fineAccountByEmail(email: string) {
    this.memberService.forgetPassByEmail(email).subscribe(async (response) => {
      if (response.status !== 'success') {
        return;
      }
      this.member = response.member;
      this.storage.set('forgetPass', this.member);
      this.router.navigate(['/confirm-acc']);
    });
  }
}
