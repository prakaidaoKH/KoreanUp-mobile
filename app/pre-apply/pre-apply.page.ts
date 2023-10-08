import { Component, OnInit } from '@angular/core';
import { PromotionService } from '../services/promotion.service';
import { Promotion } from '../models/promotion-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pre-apply',
  templateUrl: './pre-apply.page.html',
  styleUrls: ['./pre-apply.page.scss'],
})
export class PreApplyPage implements OnInit {
  promotion_radio: any = false;
  promotions: Promotion[] = [];

  constructor(
    private promotionService: PromotionService,
    private router: Router
  ) {}

  ngOnInit() {}
  ionViewWillEnter() {
    this.promotionService.promotion().subscribe((response) => {
      if (response.status !== 'success') {
        return;
      }
      this.promotions = response.promotions;
    });
  }
  onClickButton() {
    console.log('radio: ', this.promotion_radio);
    this.router.navigate(['send-slip/', this.promotion_radio]);
  }
}
