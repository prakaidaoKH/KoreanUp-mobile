import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MemberService } from '../services/member.service';
import { Member, MemberLogin } from '../models/member-model';
import { Storage } from '@ionic/storage-angular';
import { PremiumService } from '../services/premium.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  memberLogin: MemberLogin = {
    MemberID: 0,
    Username: '',
    Password: '',
    Email: '',
    Start_date: new Date(),
    profilePicture: '',
    status: '',
    type: '',
  };

  statusP = '';
  start_date = new Date();
  end_date = new Date();
  premiumDays: any;
  premiumID: any;
  notic: any;

  constructor(
    private memberService: MemberService,
    private router: Router,
    private storage: Storage,
    private premiumService: PremiumService,
    private alertController: AlertController
  ) {}

  async ngOnInit() {
    await this.storage.create();
  }
  async ionViewWillEnter() {
    this.loadMemberData();
    this.memberLogin = await this.storage.get('loginProfile');

    this.premiumService
      .statusApply(this.memberLogin.MemberID)
      .subscribe(async (response) => {
        this.statusP = response.statusP;
        this.start_date = response.start_date;
        this.end_date = response.end_date;
        this.premiumID = response.premiumID;
        this.notic = response.notic;
        console.log(this.notic);

        if (this.notic === '1') {
          const alert = await this.alertController.create({
            header: 'สมัครสมาชิกพรีเมียมสำเร็จแล้ว',
            message: 'กรุณาเข้าสู่ระบบใหม่อีกครั้ง',
            buttons: [
              {
                text: 'ตกลง',
                role: 'confirm',
                handler: () => {
                  this.premiumService
                    .updateNotic(this.memberLogin.MemberID)
                    .subscribe(async (response) => {
                      if (response.status !== 'success') {
                        return;
                      }
                      await this.storage.clear();
                      this.router.navigate(['/home']);
                    });
                },
              },
            ],
          });
          await alert.present();
        }

        if (this.statusP === 'สมัครสมาชิกพรีเมียมไม่สำเร็จ') {
          this.premiumService
            .deletePremiumMember(this.memberLogin.MemberID)
            .subscribe(async (response) => {
              if (response.status !== 'success') {
                // display alert
                return;
              }
              const alert = await this.alertController.create({
                header: 'สมัครสมาชิกพรีเมียมไม่สำเร็จ',
                message: 'กรุณาตรวจสอบข้อมูลการโอนของคุณ',
                buttons: [
                  {
                    text: 'ตกลง',
                    role: 'confirm',
                    handler: () => {
                      this.loadMemberData();
                    },
                  },
                ],
              });
              await alert.present();
            });
        }

        let nowDate = new Date();
        let endDate = new Date(this.end_date);

        if (this.premiumID !== null && nowDate > endDate) {
          const alert = await this.alertController.create({
            header: 'สมาชิกพรีเมียมหมดอายุ',
            message:
              'สมาชิกพรีเมียมของคุณหมดอายุแล้วต้องการสมัครสมาชิกพรีเมียม ใช่ หริอ ไม่',
            buttons: [
              {
                text: 'ไม่',
                role: 'cancel',
                handler: () => {},
              },
              {
                text: 'ใช่',
                role: 'confirm',
                handler: () => {
                  this.router.navigate(['/pre-apply']);
                },
              },
            ],
          });
          await alert.present();
          this.premiumService
            .deletePremiumMember(this.memberLogin.MemberID)
            .subscribe((response) => {
              if (response.status !== 'success') {
                // display alert
                return;
              }
              console.log(response);
            });
        }

        if (this.start_date !== null && nowDate <= endDate) {
          //calculate days of premium
          let diffTime = Math.abs(endDate.getTime() - nowDate.getTime());
          let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          // bug when start_date as end_date will calculate diffDays as 2
          console.log(diffDays);
          this.premiumDays = diffDays;
          if (diffDays === 1) {
            const alert = await this.alertController.create({
              header: 'พรีเมียมกำลังจะหมดอายุ',
              message: 'พรีเมียมของคุณจะหมดอายุภายในวันนี้',
              buttons: ['ตกลง'],
            });
            await alert.present();
          }
        }
        if (response.status !== 'success') {
          return;
        }
      });
  }
  async loadMemberData() {
    this.memberService
      .memberByEmailAndPassword(this.memberLogin)
      .subscribe(async (response) => {
        if (response.status !== 'success') {
          return;
        }
        this.memberLogin = response.memberLogin;
      });
    this.premiumService
      .statusApply(this.memberLogin.MemberID)
      .subscribe(async (response) => {
        this.statusP = response.statusP;
        this.start_date = response.start_date;
        this.end_date = response.end_date;
        this.premiumID = response.premiumID;
        this.notic = response.notic;
        if (response.status !== 'success') {
          return;
        }
      });
  }

  onClickEditProfile() {
    this.router.navigate(['/edit-profile']);
  }

  async onClickLogoutButton() {
    const alert = await this.alertController.create({
      header: 'ออกจากระบบ',
      message: 'ต้องการออกจากระบบ ใช่ หรือ ไม่',
      buttons: [
        {
          text: 'ไม่',
          role: 'cancel',
          handler: () => {},
        },
        {
          text: 'ใช่',
          role: 'confirm',
          handler: async () => {
            await this.storage.clear();
            this.router.navigate(['/home']);
          },
        },
      ],
    });

    await alert.present();
  }
}
