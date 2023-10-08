import { Component, OnInit } from '@angular/core';
import { Member, MemberForgetPass } from '../models/member-model';
import { Storage } from '@ionic/storage';
import { MemberService } from '../services/member.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-enter-confirm-pass',
  templateUrl: './enter-confirm-pass.page.html',
  styleUrls: ['./enter-confirm-pass.page.scss'],
})
export class EnterConfirmPassPage implements OnInit {
  member: Member = {
    MemberID: 0,
    Username: '',
    Password: '',
    Email: '',
    Start_date: new Date(),
    profilePicture: '',
    type: '',
  };
  pass: any;
  memberForgetPasss: MemberForgetPass = {
    forgetPassID: 0,
    memberID: 0,
    email: '',
    username: '',
    confirmPass: '',
  };

  constructor(
    private storage: Storage,
    private memberService: MemberService,
    private alertController: AlertController,
    private router: Router
  ) {}

  async ngOnInit() {
    await this.storage.create();
  }
  async ionViewWillEnter() {
    this.member = await this.storage.get('forgetPass');
    this.memberService
      .memberForgetPassByID(this.member.MemberID)
      .subscribe(async (response) => {
        if (response.status !== 'success') {
          return;
        }
        this.memberForgetPasss = response.memberForgetPasss;
      });
  }
  async confirm(pass: any) {
    console.log(pass);
    if (pass !== this.memberForgetPasss.confirmPass) {
      const alert = await this.alertController.create({
        header: 'รหัสไม่ถูกต้อง',
        message: 'กรุณาตรวจสอบข้อมูลให้ถูกต้อง',
        buttons: ['ตกลง'],
      });
      await alert.present();
      return;
    }
    if (pass === this.memberForgetPasss.confirmPass) {
      this.router.navigate(['/reset-password']);
    }
  }
}
