import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ExamService } from '../services/exam.service';
import { Exam, TakeExam } from '../models/exam-models';
import { AlertController, NavController } from '@ionic/angular';

import Swiper from 'swiper';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { MemberLogin } from '../models/member-model';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.page.html',
  styleUrls: ['./exam.page.scss'],
})
export class ExamPage implements OnInit {
  @ViewChild('swiper', { static: false })
  swiperRef: ElementRef | undefined;
  swiper: Swiper;

  exams: Exam[] = [];
  choice_radio: any = false;
  isDisableSendAnswer = true;
  courseID: any;
  scoreTotal: any;
  isModalOpen = false;

  take_exams: TakeExam = {
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
    private examService: ExamService,
    public navCtrl: NavController,
    private router: Router,
    private activate: ActivatedRoute,
    private storage: Storage,
    private alert: AlertController
  ) {
    this.courseID = this.activate.snapshot.paramMap.get('id');
  }

  async ngOnInit() {
    await this.storage.create();
  }

  ionViewWillEnter() {
    this.examService.exam(this.courseID).subscribe((response) => {
      if (response.status !== 'success') {
        return;
      }
      this.exams = response.exams;
    });
  }

  //click button send

  async selectedChoice(event: any, index: number) {
    console.log('>>>1', event.detail.value);
    console.log('>>>2', index);
    this.exams[index].answer_choice = event.detail.value;
    console.log('ข้อสอบ', this.exams);
    await this.storage.set('takeExam', this.exams);
    let checkSelectedAllAnswer = true;
    this.exams.forEach((element) => {
      console.log(element.answer_choice);
      if (element.answer_choice === undefined || element.answer_choice === '') {
        checkSelectedAllAnswer = false;
      }
    });

    if (checkSelectedAllAnswer) {
      this.setIsDisableSendAnswer(false);
    } else {
      this.setIsDisableSendAnswer(true);
    }
  }

  setIsDisableSendAnswer(isEnable: boolean) {
    this.isDisableSendAnswer = isEnable;
  }

  //exam next and prev choice
  next() {
    this.swiperRef?.nativeElement.swiper.slideNext(400, false);
  }
  prev() {
    this.swiperRef?.nativeElement.swiper.slidePrev(400, false);
  }
  backToPagePrev() {
    this.router.navigate(['/learn-one/', this.courseID]);
  }

  async onClickButton() {
    this.exams = await this.storage.get('takeExam');
    this.member = await this.storage.get('loginProfile');
    var score: number = 0;
    this.exams.forEach((element) => {
      if (element.answer_choice === element.answer_correct) {
        score = score + 1;
      }
      score = score;
    });
    this.scoreTotal = score;
    console.log('คะแนน = ' + this.scoreTotal + '/' + this.exams.length);
    await this.storage.set('scoreExam', this.scoreTotal);
    this.take_exams.courseID = this.courseID;
    this.take_exams.memberID = this.member.MemberID;
    this.take_exams.examID_1 = this.exams[0].examID;
    this.take_exams.selected_choice1 = this.exams[0].answer_choice;
    this.take_exams.correct_choice1 = this.exams[0].answer_correct;
    this.take_exams.examID_2 = this.exams[1].examID;
    this.take_exams.selected_choice2 = this.exams[1].answer_choice;
    this.take_exams.correct_choice2 = this.exams[1].answer_correct;
    this.take_exams.examID_3 = this.exams[2].examID;
    this.take_exams.selected_choice3 = this.exams[2].answer_choice;
    this.take_exams.correct_choice3 = this.exams[2].answer_correct;
    this.take_exams.examID_4 = this.exams[3].examID;
    this.take_exams.selected_choice4 = this.exams[3].answer_choice;
    this.take_exams.correct_choice4 = this.exams[3].answer_correct;
    this.take_exams.examID_5 = this.exams[4].examID;
    this.take_exams.selected_choice5 = this.exams[4].answer_choice;
    this.take_exams.correct_choice5 = this.exams[4].answer_correct;
    this.take_exams.examID_6 = this.exams[5].examID;
    this.take_exams.selected_choice6 = this.exams[5].answer_choice;
    this.take_exams.correct_choice6 = this.exams[5].answer_correct;
    this.take_exams.examID_7 = this.exams[6].examID;
    this.take_exams.selected_choice7 = this.exams[6].answer_choice;
    this.take_exams.correct_choice7 = this.exams[6].answer_correct;
    this.take_exams.examID_8 = this.exams[7].examID;
    this.take_exams.selected_choice8 = this.exams[7].answer_choice;
    this.take_exams.correct_choice8 = this.exams[7].answer_correct;
    this.take_exams.examID_9 = this.exams[8].examID;
    this.take_exams.selected_choice9 = this.exams[8].answer_choice;
    this.take_exams.correct_choice9 = this.exams[8].answer_correct;
    this.take_exams.examID_10 = this.exams[9].examID;
    this.take_exams.selected_choice10 = this.exams[9].answer_choice;
    this.take_exams.correct_choice10 = this.exams[9].answer_correct;
    this.take_exams.date = new Date();
    this.take_exams.score = this.scoreTotal;
    console.log(this.take_exams);
    this.examService.addTakeExam(this.take_exams).subscribe((response) => {
      if (response.status !== 'success') {
        return;
      }
    });
    const alert = await this.alert.create({
      header: 'ส่งแบบทดสอบแล้ว',
      message: '',
      buttons: ['ตกลง'],
    });

    await alert.present();
    this.router.navigate(['/learn-one/', this.courseID]);
  }
}
