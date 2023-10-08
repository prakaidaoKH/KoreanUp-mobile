export class CommentServiceApiResponse {
  status = '';
  message = '';
  comments: Comment[] = [];
}
export class CommentDetailServiceApiResponse {
  status = '';
  message = '';
  comment: Comment = {
    Username: '',
    profilePicture: '',
    memberID: '',
    courseID: '',
    message: '',
    status: '',
    create_date: new Date(),
  };
}
export class Comment {
  Username: '';
  profilePicture: '';
  memberID: '';
  courseID: '';
  message: '';
  status: '';
  create_date: Date = new Date();
}
