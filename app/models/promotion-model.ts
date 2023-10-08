export class PromotionServiceApiResponse {
  status = '';
  message = '';
  promotions: Promotion[] = [];
}
export class PromotionServiceDetailApiResponse {
  status = '';
  message = '';
  promotion: Promotion = {
    promotionID: 0,
    month: 0,
    price: 0,
  };
}
export class Promotion {
  promotionID = 0;
  month = 0;
  price = 0;
}
