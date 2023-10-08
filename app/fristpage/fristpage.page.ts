import { Component, OnInit } from '@angular/core';
import { Course } from '../models/course-model';
import { Storage } from '@ionic/storage-angular';
import { CourseService } from '../services/course.service';
import { Member, MemberLogin } from '../models/member-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fristpage',
  templateUrl: './fristpage.page.html',
  styleUrls: ['./fristpage.page.scss'],
})
export class FristpagePage implements OnInit {
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
  members: Member[] = [];
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
  constructor(
    private storage: Storage,
    private courseService: CourseService,
    private router: Router
  ) {}

  async ngOnInit() {
    await this.storage.create();
  }
  async ionViewWillEnter() {
    this.member = await this.storage.get('loginProfile');
    this.courseService.inquiryCourse().subscribe((response) => {
      if (response.status !== 'success') {
        // display alert
        return;
      }
      this.courses = response.courses;
    });
  }
  goTo(courseID: number) {
    this.router.navigate(['/course-detail/' + courseID]);
  }
}
