import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'profile',
        loadChildren: () =>
          import('../profile/profile.module').then((m) => m.ProfilePageModule),
      },
      {
        path: 'fristpage',
        loadChildren: () =>
          import('../fristpage/fristpage.module').then(
            (m) => m.FristpagePageModule
          ),
      },
      {
        path: 'my-courses',
        loadChildren: () =>
          import('../my-courses/my-courses.module').then(
            (m) => m.MyCoursesPageModule
          ),
      },
      {
        path: '',
        redirectTo: '/tabs/profile',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
