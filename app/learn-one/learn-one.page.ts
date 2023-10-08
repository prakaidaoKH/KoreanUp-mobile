import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { CourseService } from '../services/course.service';
import { Course } from '../models/course-model';
import { Member } from '../models/member-model';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentService } from '../services/comment.service';
import { Comment } from '../models/comment-model';
import { ExamService } from '../services/exam.service';
import { TakeExam } from '../models/exam-models';
// import flowplayer from '@flowplayer/player';

@Component({
  selector: 'app-learn-one',
  templateUrl: './learn-one.page.html',
  styleUrls: ['./learn-one.page.scss'],
})
export class LearnOnePage implements OnInit {
  @ViewChild('videoPlayer', { static: false }) videoplayer: ElementRef;
  isPlay: boolean = false;
  isModalOpen = false;
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
  member: Member = {
    MemberID: 0,
    Username: '',
    Password: '',
    Email: '',
    Start_date: new Date(),
    profilePicture: '',
    type: '',
  };
  comments: Comment[] = [];
  commentAd: Comment[] = [];
  comment: Comment = {
    Username: '',
    profilePicture: '',
    memberID: '',
    courseID: '',
    message: '',
    status: '',
    create_date: new Date(),
  };
  vdo: any;
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

  disableExam = true;
  videoPlay = '';

  constructor(
    private activate: ActivatedRoute,
    private courseService: CourseService,
    private storage: Storage,
    private commentService: CommentService,
    private router: Router,
    private examService: ExamService
  ) {
    this.id = this.activate.snapshot.paramMap.get('courseID');
  }

  async ngOnInit() {
    await this.storage.create();
  }
  async ionViewWillEnter() {
    this.disableExam = true;
    this.member = await this.storage.get('loginProfile');
    this.courseService.courseByID(this.id).subscribe((response) => {
      if (response.status !== 'success') {
        // display alert
        return;
      }
      this.course = response.course;
    });
    this.commentService
      .comment(this.id, this.member.MemberID)
      .subscribe(async (response) => {
        if (response.status !== 'success') {
          // display alert
          return;
        }
        this.comments = response.comments;
      });
    this.examService
      .takeExam(this.id, this.member.MemberID)
      .subscribe((response) => {
        if (response.status !== 'success') {
          return;
        }
        this.take_exam = response.take_exam;
        console.log(this.take_exam);
      });
  }
  examHistory() {
    this.router.navigate(['/exam-history/', this.id]);
  }
  goTo() {
    this.router.navigate(['/tabs/my-courses']);
  }
  exam() {
    if (!this.disableExam) {
      this.router.navigate(['/exam/', this.id]);
    }
  }
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  onClickSend(memberID: number, courseID: number, message: string) {
    this.commentService
      .addComment(memberID, courseID, message)
      .subscribe(async (response) => {
        if (response.status !== 'success') {
          return;
        }
        console.log(message);
        this.loadCommentData();
      });
  }

  async loadCommentData() {
    this.reSetForm();
    this.member = await this.storage.get('loginProfile');
    this.courseService.courseByID(this.id).subscribe((response) => {
      if (response.status !== 'success') {
        // display alert
        return;
      }
      this.course = response.course;
    });
    this.commentService
      .comment(this.id, this.member.MemberID)
      .subscribe((response) => {
        if (response.status !== 'success') {
          // display alert
          return;
        }
        this.comments = response.comments;
      });
  }
  reSetForm() {
    (this.comment.memberID = ''),
      (this.comment.courseID = ''),
      (this.comment.message = ''),
      (this.comment.create_date = new Date());
  }

  videoPlayEnded() {
    console.log('play ended');
    this.disableExam = false;
    this.videoPlay = 'end';
  }
}
