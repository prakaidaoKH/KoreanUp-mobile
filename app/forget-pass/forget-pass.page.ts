import { Component, OnInit } from '@angular/core';
import { MemberService } from '../services/member.service';
import { Member } from '../models/member-model';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

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
    private router: Router,
    private alert: AlertController
  ) {}

  async ngOnInit() {
    this.storage.create();
  }

  fineAccountByEmail(email: string) {
    this.memberService.forgetPassByEmail(email).subscribe(async (response) => {
      if (response.status !== 'success') {
        return;
      }
      if (response.member === null) {
        const alert = await this.alert.create({
          header: 'ไม่พบบัญชี',
          subHeader: '',
          message: 'ไม่มีบัญชีจากอีเมลนี้',
          buttons: [
            {
              text: 'ตกลง',
              role: 'confirm',
              handler: () => {},
            },
          ],
        });

        await alert.present();
        return;
      }
      this.member = response.member;
      this.storage.set('forgetPass', this.member);
      this.router.navigate(['/confirm-acc']);
    });
  }
}
