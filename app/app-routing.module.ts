import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('./signup/signup.module').then((m) => m.SignupPageModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'tabs',
    loadChildren: () =>
      import('./tabs/tabs.module').then((m) => m.TabsPageModule),
  },
  {
    path: 'course-detail/:courseID',
    loadChildren: () =>
      import('./course-detail/course-detail.module').then(
        (m) => m.CourseDetailPageModule
      ),
  },
  {
    path: 'learn-one/:courseID',
    loadChildren: () =>
      import('./learn-one/learn-one.module').then((m) => m.LearnOnePageModule),
  },
  {
    path: 'edit-profile',
    loadChildren: () =>
      import('./edit-profile/edit-profile.module').then(
        (m) => m.EditProfilePageModule
      ),
  },
  {
    path: 'exam/:id',
    loadChildren: () =>
      import('./exam/exam.module').then((m) => m.ExamPageModule),
  },
  {
    path: 'forget-pass',
    loadChildren: () =>
      import('./forget-pass/forget-pass.module').then(
        (m) => m.ForgetPassPageModule
      ),
  },
  {
    path: 'pre-apply',
    loadChildren: () =>
      import('./pre-apply/pre-apply.module').then((m) => m.PreApplyPageModule),
  },
  {
    path: 'send-slip/:promotionID',
    loadChildren: () =>
      import('./send-slip/send-slip.module').then((m) => m.SendSlipPageModule),
  },
  {
    path: 'show-score',
    loadChildren: () =>
      import('./show-score/show-score.module').then(
        (m) => m.ShowScorePageModule
      ),
  },
  {
    path: 'exam-history/:id',
    loadChildren: () =>
      import('./exam-history/exam-history.module').then(
        (m) => m.ExamHistoryPageModule
      ),
  },
  {
    path: 'fine-by-username',
    loadChildren: () => import('./fine-by-username/fine-by-username.module').then( m => m.FineByUsernamePageModule)
  },
  {
    path: 'confirm-acc',
    loadChildren: () => import('./confirm-acc/confirm-acc.module').then( m => m.ConfirmAccPageModule)
  },
  {
    path: 'enter-confirm-pass',
    loadChildren: () => import('./enter-confirm-pass/enter-confirm-pass.module').then( m => m.EnterConfirmPassPageModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./reset-password/reset-password.module').then( m => m.ResetPasswordPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
