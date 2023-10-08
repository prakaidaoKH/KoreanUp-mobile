export class PremiumApplyServiceApiResponse {
  status = '';
  message = '';
  premiumApplys: PremiumApply[] = [];
}
export class PremiumApplyDetailServiceApiResponse {
  status = '';
  message = '';
  premiumApply: PremiumApply = {
    preApplyID: 0,
    memberID: 0,
    start_date: new Date(),
    slipPic: '',
    statusP: '',
  };
}
export class PremiumApply {
  preApplyID = 0;
  memberID = 0;
  start_date = new Date();
  slipPic: any = '';
  statusP = '';
}

export class StatusPremiumApplyServiceApiResponse {
  status = '';
  message = '';
  statusP: StatusPremiumApply[] = [];
}
export class StatusPremiumApplyDetailServiceApiResponse {
  status = '';
  message = '';
  statusP = '';
  start_date = new Date();
  end_date = new Date();
  premiumID = 0;
  notic = 0;
}
export class StatusPremiumApply {
  statusP: any = '';
}
