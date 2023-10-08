export class CourseServiceApiResponse {
  status = '';
  message = '';
  courses: Course[] = [];
}
export class CourseServiceDetailApiResponse {
  status = '';
  message = '';
  course: Course = {
    courseID: 0,
    courseName: '',
    courseDetail: '',
    coursePicture: '',
    courseType: '',
    courseVideo: '',
    statusShow: 0,
  };
}
export class Course {
  courseID = 0;
  courseName = '';
  courseDetail = '';
  coursePicture = '';
  courseType = '';
  courseVideo = '';
  statusShow = 0;
}
//MyCourse
export class MyCourseServiceApiResponse {
  status = '';
  message = '';
  myCourses: MyCourse[] = [];
}
export class MyCourseServiceDetailApiResponse {
  status = '';
  message = '';
  myCourseTwo: MyCourseTow = {
    courseID: 0,
    memberID: 0,
  };
}
export class MyCourse {
  userName = '';
  email = '';
  courseName = '';
  courseDetail = '';
  coursePicture = '';
  courseType = '';
  courseID = 0;
}
export class MyCourseTow {
  courseID: any;
  memberID = 0;
}
