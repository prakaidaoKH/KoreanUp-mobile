import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Member } from '../models/member-model';
import { CourseService } from '../services/course.service';
import { MyCourse } from '../models/course-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.page.html',
  styleUrls: ['./my-courses.page.scss'],
})
export class MyCoursesPage implements OnInit {
  myCourses: MyCourse[] = [];
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
    private storage: Storage,
    private courseService: CourseService,
    private router: Router
  ) {}

  async ngOnInit() {
    await this.storage.create();
  }
  async ionViewWillEnter() {
    this.member = await this.storage.get('loginProfile');
    this.courseService.myCourse(this.member.MemberID).subscribe((response) => {
      if (response.status !== 'success') {
        // display alert
        return;
      }
      this.myCourses = response.myCourses;
      console.log(this.myCourses);
    });
  }
  onClickLearn(courseID: number) {
    this.router.navigate(['/learn-one/' + courseID]);
  }
}
