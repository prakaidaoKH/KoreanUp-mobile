export class ExamServiceApiResponse {
  status = '';
  message = '';
  exams: Exam[] = [];
}
export class ExamServiceDetailApiResponse {
  status = '';
  message = '';
  exam: Exam = {
    examID: 0,
    courseID: 0,
    question: '',
    qPicUrl: '',
    choice_1: '',
    choice_2: '',
    choice_3: '',
    answer_correct: '',
    answer_choice: '',
  };
}
export class Exam {
  examID = 0;
  courseID = 0;
  question = '';
  qPicUrl = '';
  choice_1 = '';
  choice_2 = '';
  choice_3 = '';
  answer_correct = '';
  answer_choice = '';
}

export class TakeExamServiceApiResponse {
  status = '';
  message = '';
  take_exams: TakeExam[] = [];
}

export class TakeExamServiceDetailApiResponse {
  status = '';
  message = '';
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
}

export class TakeExam {
  courseID = 0;
  memberID = 0;
  examID_1 = 0;
  selected_choice1 = '';
  correct_choice1 = '';
  examID_2 = 0;
  selected_choice2 = '';
  correct_choice2 = '';
  examID_3 = 0;
  selected_choice3 = '';
  correct_choice3 = '';
  examID_4 = 0;
  selected_choice4 = '';
  correct_choice4 = '';
  examID_5 = 0;
  selected_choice5 = '';
  correct_choice5 = '';
  examID_6 = 0;
  selected_choice6 = '';
  correct_choice6 = '';
  examID_7 = 0;
  selected_choice7 = '';
  correct_choice7 = '';
  examID_8 = 0;
  selected_choice8 = '';
  correct_choice8 = '';
  examID_9 = 0;
  selected_choice9 = '';
  correct_choice9 = '';
  examID_10 = 0;
  selected_choice10 = '';
  correct_choice10 = '';
  date: Date = new Date();
  score = 0;
}

export class ScoreHistory {}
