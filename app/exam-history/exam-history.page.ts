import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamService } from '../services/exam.service';
import { Exam, TakeExam } from '../models/exam-models';
import { Member } from '../models/member-model';
import { Storage } from '@ionic/storage';
import Swiper from 'swiper';

@Component({
  selector: 'app-exam-history',
  templateUrl: './exam-history.page.html',
  styleUrls: ['./exam-history.page.scss'],
})
export class ExamHistoryPage implements OnInit {
  @ViewChild('swiper', { static: false })
  swiperRef: ElementRef | undefined;
  swiper: Swiper;

  courseID: any;
  exams: Exam[] = [];
  member: Member = {
    MemberID: 0,
    Username: '',
    Password: '',
    Email: '',
    Start_date: new Date(),
    profilePicture: '',
    type: '',
  };
  take_exam: TakeExam = {
    courseID: 0,
    memberID: 0,
    examID_1: 0,
    selected_choice1: '',
    correct_choice1: '',
    examID_2: 0,
    selected_choice2: '',
    correct_choice2: '',
    examID_3: 0,
    selected_choice3: '',
    correct_choice3: '',
    examID_4: 0,
    selected_choice4: '',
    correct_choice4: '',
    examID_5: 0,
    selected_choice5: '',
    correct_choice5: '',
    examID_6: 0,
    selected_choice6: '',
    correct_choice6: '',
    examID_7: 0,
    selected_choice7: '',
    correct_choice7: '',
    examID_8: 0,
    selected_choice8: '',
    correct_choice8: '',
    examID_9: 0,
    selected_choice9: '',
    correct_choice9: '',
    examID_10: 0,
    selected_choice10: '',
    correct_choice10: '',
    date: new Date(),
    score: 0,
  };
  question1: string;
  question2: string;
  question3: string;
  question4: string;
  question5: string;
  question6: string;
  question7: string;
  question8: string;
  question9: string;
  question10: string;
  qPic1: string;
  qPic2: string;
  qPic3: string;
  qPic4: string;
  qPic5: string;
  qPic6: string;
  qPic7: string;
  qPic8: string;
  qPic9: string;
  qPic10: string;
  constructor(
    private activate: ActivatedRoute,
    private examService: ExamService,
    private storage: Storage,
    private router: Router
  ) {
    this.courseID = this.activate.snapshot.paramMap.get('id');
  }

  async ngOnInit() {
    await this.storage.create();
  }
  async ionViewWillEnter() {
    this.member = await this.storage.get('loginProfile');
    this.examService.exam(this.courseID).subscribe(async (response) => {
      if (response.status !== 'success') {
        return;
      }
      this.exams = response.exams;
      await this.storage.set('examInCourse', this.exams);
      this.examService
        .takeExam(this.courseID, this.member.MemberID)
        .subscribe(async (response) => {
          if (response.status !== 'success') {
            return;
          }
          this.take_exam = response.take_exam;
          console.log(this.take_exam);
          this.exams = await this.storage.get('examInCourse');
          // คำถาม
          this.question1 = this.exams[0].question;
          this.question2 = this.exams[1].question;
          this.question3 = this.exams[2].question;
          this.question4 = this.exams[3].question;
          this.question5 = this.exams[4].question;
          this.question6 = this.exams[5].question;
          this.question7 = this.exams[6].question;
          this.question8 = this.exams[7].question;
          this.question9 = this.exams[8].question;
          this.question10 = this.exams[9].question;

          // รูปข้อสอบ
          this.qPic1 = this.exams[0].qPicUrl;
          this.qPic2 = this.exams[1].qPicUrl;
          this.qPic3 = this.exams[2].qPicUrl;
          this.qPic4 = this.exams[3].qPicUrl;
          this.qPic5 = this.exams[4].qPicUrl;
          this.qPic6 = this.exams[5].qPicUrl;
          this.qPic7 = this.exams[6].qPicUrl;
          this.qPic8 = this.exams[7].qPicUrl;
          this.qPic9 = this.exams[8].qPicUrl;
          this.qPic10 = this.exams[9].qPicUrl;
        });
    });
  }

  backToPagePrev() {
    this.router.navigate(['/learn-one/', this.courseID]);
  }
  next() {
    this.swiperRef?.nativeElement.swiper.slideNext(400, false);
  }
  prev() {
    this.swiperRef?.nativeElement.swiper.slidePrev(400, false);
  }
}
