import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WineListComponent } from 'src/app/wines/wine-list/wine-list.component';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { WineNewComponent } from 'src/app/wines/wine-new/wine-new.component';
import { WineDetailComponent } from 'src/app/wines/wine-detail/wine-detail.component';

const routes: Routes = [
  { path: 'list', component: WineListComponent },
  {
    path: 'create',
    component: WineNewComponent,
    canActivate: [AuthGuardService],
  },
  { path: ':code', component: WineDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WineRoutingModule {}
