import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PromotionService } from '../services/promotion.service';
import { Promotion } from '../models/promotion-model';
import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from '@capacitor/camera';
import { Filesystem } from '@capacitor/filesystem';
import { PremiumApply } from '../models/premiumApply-model';
import { PremiumService } from '../services/premium.service';
import { AlertController, Platform } from '@ionic/angular';
import { Member } from '../models/member-model';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-send-slip',
  templateUrl: './send-slip.page.html',
  styleUrls: ['./send-slip.page.scss'],
})
export class SendSlipPage implements OnInit {
  promotionID: any;
  premiumApplys: PremiumApply[] = [];
  promotion: Promotion = {
    promotionID: 0,
    month: 0,
    price: 0,
  };
  premiumApply: PremiumApply = {
    preApplyID: 0,
    memberID: 0,
    start_date: new Date(),
    slipPic: '',
    statusP: '',
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
  constructor(
    private activate: ActivatedRoute,
    private promotionService: PromotionService,
    private premiumService: PremiumService,
    private plt: Platform,
    private alert: AlertController,
    private storage: Storage,
    private router: Router
  ) {
    this.promotionID = this.activate.snapshot.paramMap.get('promotionID');
  }
  async ionViewWillEnter() {
    this.promotionService
      .promotionID(this.promotionID)
      .subscribe((response) => {
        if (response.status !== 'success') {
          return;
        }
        this.promotion = response.promotion;
      });
    this.member = await this.storage.get('loginProfile');
  }

  async ngOnInit() {
    await this.storage.create();
  }

  async clickButtonSendSlip() {
    this.premiumApply.memberID = this.member.MemberID;
    console.log();
    this.premiumService.apply(this.premiumApply).subscribe(async (response) => {
      if (response.status !== 'success') {
        // display alert
        return;
      }
    });
    this.router.navigate(['tabs/profile']);
    const alert = await this.alert.create({
      header: 'ส่งสำเร็จ',
      message: 'ส่งหลักฐานการโอนของคุณสำเร็จแล้ว!',
      buttons: ['ตกลง'],
    });

    await alert.present();
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
    this.premiumApply.slipPic = base64Data;
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
