import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Member } from '../models/member-model';
import { MemberService } from '../services/member.service';
import { AlertController } from '@ionic/angular';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  memberCheckEmail: Member = {
    MemberID: 0,
    Username: '',
    Password: '',
    Email: '',
    Start_date: new Date(),
    profilePicture: '',
    type: '',
  };
  memberCheckUsername: Member = {
    MemberID: 0,
    Username: '',
    Password: '',
    Email: '',
    Start_date: new Date(),
    profilePicture: '',
    type: '',
  };
  member: Member = {
    MemberID: 0,
    Username: '',
    Password: '',
    Email: '',
    Start_date: new Date(),
    profilePicture: '',
    type: '',
  };
  singupForm: FormGroup;

  constructor(
    private router: Router,
    private memberService: MemberService,
    private alertController: AlertController,
    private formBuilder: FormBuilder
  ) {
    this.singupForm = new FormGroup({
      email: new FormControl(),
      username: new FormControl(),
      password: new FormControl(),
    });
  }

  ngOnInit() {
    this.singupForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
      username: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  get errorControl() {
    return this.singupForm.controls;
  }
  submitForm = () => {
    if (this.singupForm.valid) {
      console.log(this.singupForm.value);
      return false;
    } else {
      return console.log('กรุณากรอกข้อมูลให้ครบถ้วน');
    }
  };

  async onClickSignUpButton(member: Member) {
    this.memberService.forgetPassByEmail(member.Email).subscribe((response) => {
      if (response.status !== 'success') {
        return;
      }
      this.memberCheckEmail = response.member;
    });

    this.memberService
      .forgetPassByUsername(member.Username)
      .subscribe((response) => {
        if (response.status !== 'success') {
          return;
        }
        this.memberCheckUsername = response.member;
      });

    if (this.member.Email === '') {
      const alert = await this.alertController.create({
        header: 'กรุณากรอกอีเมลของคุณ',
        message: '',
        buttons: ['ตกลง'],
      });
      await alert.present();
      return;
    }
    if (this.member.Username === '') {
      const alert = await this.alertController.create({
        header: 'กรุณากรอกชื่อผู้ใช้ของคุณ',
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
    this.memberService.addMember(member).subscribe(async (response) => {
      if (response.status !== 'success') {
        const alert = await this.alertController.create({
          header: 'สมัครสมาชิกไม่สำเร็จ',
          message: 'ไม่สามารถสมัครสมาชิกได้! กรุณาตรวจสอบข้อมูลให้ถูกต้อง',
          buttons: ['ตกลง'],
        });
        await alert.present();
        return;
      }
      const alert = await this.alertController.create({
        header: 'สมัครสมาชิกสำเร็จ',
        message:
          'การสมัครสมาชิกของคุณสำเร็จแล้ว! กรุณาทำการเข้าสู่ระบบใหม่อีกครั้ง',
        buttons: ['ตกลง'],
      });
      await alert.present();
      this.router.navigate(['/home']);
      this.resetForm();
    });
  }
  onClickback() {
    // window.location.reload();
    this.router.navigate(['/home']);
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
}
