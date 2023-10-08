import { Component } from '@angular/core';
import { initializeApp, type FirebaseOptions } from 'firebase/app';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { Member } from '../models/member-model';
import { MemberService } from '../services/member.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  firebaseConfig: FirebaseOptions = {
    apiKey: 'AIzaSyB2IHLfZocFoIr6uGrvfkxFOSpnO3aHOh4',
    authDomain: 'korean-up.firebaseapp.com',
    projectId: 'korean-up',
    storageBucket: 'korean-up.appspot.com',
    messagingSenderId: '653883090988',
    appId: '1:653883090988:web:7c5d915456be28f1544989',
    measurementId: 'G-JFT1E21ERG',
  };
  app = initializeApp(this.firebaseConfig);
  auth = getAuth(this.app);
  googleProvider = new GoogleAuthProvider();
  member: Member = {
    MemberID: 0,
    Username: '',
    Password: '',
    Email: '',
    Start_date: new Date(),
    profilePicture: '',
    type: '',
  };
  memberGoogle: Member = {
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
    private storage: Storage
  ) {}

  async ngOnInit() {
    await this.storage.create();
  }

  async singinWihtGoogle() {
    const userCredential = await signInWithPopup(
      this.auth,
      this.googleProvider
    );
    console.log(userCredential);
    this.memberGoogle.Username = userCredential.user.displayName;
    this.memberGoogle.Email = userCredential.user.email;
    this.memberGoogle.profilePicture = userCredential.user.photoURL;
    this.memberGoogle.type = 'google';
    this.memberService
      .memberByEmail(this.memberGoogle.Email)
      .subscribe(async (response) => {
        if (response.status !== 'success') {
          return;
        }
        this.member = response.member;
        if (this.member === null) {
          this.memberService
            .addMemberGoogle(this.memberGoogle)
            .subscribe(async (response) => {
              if (response.status !== 'success') {
                return;
              }
            });

          this.memberService
            .memberByEmail(this.memberGoogle.Email)
            .subscribe(async (response) => {
              if (response.status !== 'success') {
                return;
              }
              this.member = response.member;
              console.log(this.member);
              await this.storage.set('loginProfile', this.member);
              this.router.navigate(['/tabs']);
              return;
            });
        }

        await this.storage.set('loginProfile', this.member);
        this.router.navigate(['/tabs']);
      });
  }
}
