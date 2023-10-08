import { Component, OnInit } from '@angular/core';
import { Member } from '../models/member-model';
import { MemberService } from '../services/member.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
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
  password: any;
  constructor(
    private memberService: MemberService,
    private storage: Storage,
    private router: Router,
    private alertController: AlertController
  ) {}

  async ngOnInit() {
    await this.storage.create();
  }
  async ionViewWillEnter() {
    this.member = await this.storage.get('forgetPass');
  }
  async resetPass(password: any) {
    this.memberService
      .resetPassword(this.member.MemberID, password)
      .subscribe(async (response) => {
        if (response.status !== 'success') {
          // display alert
          return;
        }
        this.memberService
          .deleteForgetPass(this.member.MemberID)
          .subscribe(async (response) => {
            if (response.status !== 'success') {
              // display alert
              return;
            }
          });
        const alert = await this.alertController.create({
          header: 'รีเซ็ตรหัสผ่านสำเร็จ',
          message: 'กรุณาเข้าสู่ระบบอีกครั้ง ด้วยรหัสผ่านใหม่ของคุณ',
          buttons: ['ตกลง'],
        });
        await alert.present();
        this.router.navigate(['login']);
      });
  }
}
