import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Member, MemberLogin } from '../models/member-model';
import { MemberService } from '../services/member.service';
import { Storage } from '@ionic/storage-angular';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  // loginEmail = '';
  // loginPassword = '';
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
  loginForm: FormGroup;

  constructor(
    private router: Router,
    private memberService: MemberService,
    private storage: Storage,
    public formBuilder: FormBuilder,
    private alertController: AlertController
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
    });
  }

  async ngOnInit() {
    await this.storage.create();
    this.loginForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }
  get errorControl() {
    return this.loginForm.controls;
  }
  submitForm = () => {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      return false;
    } else {
      return console.log('กรุณากรอกข้อมูลให้ครบถ้วน');
    }
  };
  async onClickLoginButton() {
    if (this.member.Email === '') {
      const alert = await this.alertController.create({
        header: 'กรุณากรอกอีเมลของคุณ',
        message: '',
        buttons: ['ตกลง'],
      });
      await alert.present();
      return;
    }
    if (this.member.Password === '') {
      const alert = await this.alertController.create({
        header: 'กรุณากรอกรหัสผ่านของคุณ',
        message: '',
        buttons: ['ตกลง'],
      });
      await alert.present();
      return;
    }
    this.memberLogin.Email = this.loginForm.value.email;
    this.memberLogin.Password = this.loginForm.value.password;
    this.memberService
      .memberByEmailAndPassword(this.memberLogin)
      .subscribe(async (response) => {
        this.memberLogin = response.memberLogin;
        if (response.status !== 'success') {
          const alert = await this.alertController.create({
            header: 'เข้าสู่ระบบไม่สำเร็จ',
            message: 'ไม่สามารถเข้าสู่ระบบได้! กรุณาตรวจสอบข้อมูลให้ถูกต้อง',
            buttons: ['ตกลง'],
          });
          await alert.present();
          this.loadMemberData();
          return;
        }
        await this.storage.set('loginProfile', this.memberLogin);
        this.router.navigate(['/tabs']);
        this.resetForm();
      });
  }
  loadMemberData() {
    this.memberService
      .memberByEmailAndPassword(this.memberLogin)
      .subscribe(async (response) => {
        this.memberLogin = response.memberLogin;
        if (response.status !== 'success') {
          return;
        }
      });
  }
  resetForm() {
    this.member = {
      MemberID: 0,
      Username: '',
      Password: '',
      Email: '',
      Start_date: new Date(),
      profilePicture: '',
      type: '',
    };
  }
  ionViewWillEnter() {}
}
