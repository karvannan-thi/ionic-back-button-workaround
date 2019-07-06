import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabsPage } from './tabs.page';
import { BackwardGuard } from '../guards/backward.guard';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        children: [
          {
            path: '',
            canDeactivate: [BackwardGuard],
            loadChildren: '../tab1/tab1.module#Tab1PageModule'
          },
          {
            path: 'children',
            canDeactivate: [BackwardGuard],
            loadChildren: '../pages/children/children.module#ChildrenPageModule'
          }
        ]
      },
      {
        path: 'tab2',
        children: [
          {
            path: '',
            canDeactivate: [BackwardGuard],
            loadChildren: '../tab2/tab2.module#Tab2PageModule'
          }
        ]
      },
      {
        path: 'tab3',
        children: [
          {
            path: '',
            canDeactivate: [BackwardGuard],
            loadChildren: '../tab3/tab3.module#Tab3PageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
