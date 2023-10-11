import { Component, OnInit } from '@angular/core';
import { MemberService } from '../services/member.service';
import { Member } from '../models/member-model';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-fine-by-username',
  templateUrl: './fine-by-username.page.html',
  styleUrls: ['./fine-by-username.page.scss'],
})
export class FineByUsernamePage implements OnInit {
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
    private router: Router,
    private storage: Storage,
    private alert: AlertController
  ) {}

  async ngOnInit() {
    await this.storage.create();
  }
  fineAccountByUsername(username: string) {
    this.memberService
      .forgetPassByUsername(username)
      .subscribe(async (response) => {
        if (response.status !== 'success') {
          return;
        }
        if (response.member === null) {
          const alert = await this.alert.create({
            header: 'ไม่พบบัญชี',
            subHeader: '',
            message: 'ไม่มีบัญชีจากชื่อผู้ใช้นี้',
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
        await this.storage.set('forgetPass', this.member);
        this.router.navigate(['/confirm-acc']);
      });
  }
}
