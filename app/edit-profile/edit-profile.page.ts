import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MemberService } from '../services/member.service';
import { Member } from '../models/member-model';
import { Storage } from '@ionic/storage-angular';
import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from '@capacitor/camera';
import { Filesystem } from '@capacitor/filesystem';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
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
    private activateroute: ActivatedRoute,
    private memberService: MemberService,
    private storage: Storage,
    private router: Router,
    private plt: Platform
  ) {}

  async ngOnInit() {
    await this.storage.create();
  }
  async ionViewWillEnter() {
    this.member = await this.storage.get('loginProfile');
  }
  onClickCancelButton() {
    this.router.navigate(['/tabs/']);
  }

  async onClickSaveButton() {
    console.log(this.member);
    this.memberService.updateMember(this.member).subscribe(async (response) => {
      if (response.status !== 'success') {
        // display alert
        return;
      }
      console.log(response);
      await this.storage.set('loginProfile', this.member);
      this.router.navigate(['/tabs/']);
    });
  }

  async selectImage() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos, // Camera, Photos or Prompt!
    });

    console.log(image);
    if (image) {
      this.saveImage(image);
    }
  }

  async saveImage(photo: Photo) {
    const base64Data = await this.readAsBase64(photo);
    console.log(base64Data);
    this.member.profilePicture = base64Data;
  }
  private async readAsBase64(photo: Photo) {
    if (this.plt.is('hybrid')) {
      const file = await Filesystem.readFile({
        path: photo.path!,
      });

      return file.data;
    } else {
      // Fetch the photo, read as a blob, then convert to base64 format
      const response = await fetch(photo.webPath!);
      const blob = await response.blob();

      return (await this.convertBlobToBase64(blob)) as string;
    }
  }
  // Helper function
  convertBlobToBase64 = (blob: Blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });
}
