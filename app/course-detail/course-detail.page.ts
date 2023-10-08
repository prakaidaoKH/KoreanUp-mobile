import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CourseService } from '../services/course.service';
import { Course, MyCourse, MyCourseTow } from '../models/course-model';
import { AlertController } from '@ionic/angular';
import { AddMyCourse } from '../models/addMycourse-model';
import { Storage } from '@ionic/storage-angular';
import { Member, MemberLogin } from '../models/member-model';
import { ExamService } from '../services/exam.service';
import { TakeExam } from '../models/exam-models';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.page.html',
  styleUrls: ['./course-detail.page.scss'],
})
export class CourseDetailPage implements OnInit {
  id: any;
  courses: Course[] = [];
  course: Course = {
    courseID: 0,
    courseName: '',
    courseDetail: '',
    coursePicture: '',
    courseType: '',
    courseVideo: '',
    statusShow: 0,
  };
  member: MemberLogin = {
    MemberID: 0,
    Username: '',
    Password: '',
    Email: '',
    Start_date: new Date(),
    profilePicture: '',
    status: '',
    type: '',
  };
  myCourseTwo: MyCourseTow = {
    courseID: 0,
    memberID: 0,
  };
  myCourses: MyCourse[] = [];
  addMyCourse: AddMyCourse[] = [];
  scoreExam: number;

  constructor(
    private activate: ActivatedRoute,
    private courseService: CourseService,
    private alert: AlertController,
    private storage: Storage,
    private router: Router
  ) {
    this.id = this.activate.snapshot.paramMap.get('courseID');
  }

  async ngOnInit() {
    await this.storage.create();
  }
  async ionViewWillEnter() {
    this.member = await this.storage.get('loginProfile');
    this.courseService.courseByID(this.id).subscribe((response) => {
      if (response.status !== 'success') {
        // display alert
        return;
      }
      this.course = response.course;
    });
    this.courseService
      .myCourseTwo(this.member.MemberID, this.id)
      .subscribe((response) => {
        if (response.status !== 'success') {
          // display alert
          return;
        }
        this.myCourseTwo = response.myCourseTwo;
        console.log('my course>>', this.myCourseTwo);
      });
  }

  async addCourse(courseID: number, memberID: number) {
    console.log('course id >> ', this.id);
    if (this.myCourseTwo !== null && this.myCourseTwo.courseID === courseID) {
      const alert = await this.alert.create({
        header: 'มีบทเรียนนี้แล้ว',
        message: 'คุณมีบทเรียนในบทเรียนของคุณแล้ว',
        buttons: ['ตกลง'],
      });
      await alert.present();
      return;
    }

    this.courseService.addMyCourse(courseID, memberID).subscribe((response) => {
      if (response.status !== 'success') {
        return;
      }
    });

    const alert = await this.alert.create({
      header: 'เพิ่มสำเร็จ',
      subHeader: 'เพิ่มในบทเรียนของคุณแล้ว',
      message: 'ต้องการไปที่หน้าบทเรียนของฉันหรือไม่',
      buttons: [
        {
          text: 'ไว้คราวหลัง',
          role: 'cancel',
          handler: () => {},
        },
        {
          text: 'ไปตอนนี้',
          role: 'confirm',
          handler: () => {
            this.router.navigate(['/tabs/my-courses']);
          },
        },
      ],
    });

    await alert.present();
  }
  async presentAlert() {
    const alert = await this.alert.create({
      header: 'บทเรียนพรีเมียม',
      subHeader: 'สำหรับสมาชิกพรีเมียม',
      message: 'ต้องการสมัครพรีเมียม ใช่ หรือ ไม่',
      buttons: [
        {
          text: 'ไม่',
          role: 'cancel',
          handler: () => {},
        },
        {
          text: 'ใช่',
          role: 'confirm',
          handler: () => {
            this.router.navigate(['/pre-apply']);
          },
        },
      ],
    });

    await alert.present();
  }
}
