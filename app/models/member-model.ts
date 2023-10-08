export class MemberServiceApiResponse {
  status = '';
  message = '';
  members: Member[] = [];
}

export class MemberForgetPassServiceApiResponse {
  status = '';
  message = '';
  memberForgetPass: MemberForgetPass[] = [];
}
export class MemberDetailServiceApiResponse {
  status = '';
  message = '';
  member: Member = {
    MemberID: 0,
    Username: '',
    Password: '',
    Email: '',
    Start_date: new Date(),
    profilePicture: '',
    type: '',
  };
}

export class Member {
  MemberID = 0;
  Username = '';
  Password = '';
  Email = '';
  Start_date: Date = new Date();
  profilePicture: any = '';
  type = '';
}

export class MemberForgetPassDetailServiceApiResponse {
  status = '';
  message = '';
  memberForgetPasss: MemberForgetPass = {
    forgetPassID: 0,
    memberID: 0,
    email: '',
    username: '',
    confirmPass: '',
  };
}
export class MemberForgetPass {
  forgetPassID = 0;
  memberID = 0;
  email = '';
  username = '';
  confirmPass = '';
}

export class MemberLoginDetailServiceApiResponse {
  status = '';
  message = '';
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
}
export class MemberLogin {
  MemberID = 0;
  Username = '';
  Password = '';
  Email = '';
  Start_date: Date = new Date();
  profilePicture: any = '';
  status = '';
  type = '';
}
