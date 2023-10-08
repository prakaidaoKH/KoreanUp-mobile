export class AddMyCourseServiceApiResponse {
  status = '';
  message = '';
  addMyCourse: AddMyCourse[] = [];
}

export class AddMyCourse {
  memberID: 0;
  courseID: 0;
}
