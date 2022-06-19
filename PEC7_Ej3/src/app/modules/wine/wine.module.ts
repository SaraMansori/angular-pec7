import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WineDetailComponent } from 'src/app/wines/wine-detail/wine-detail.component';

import { WineRoutingModule } from './wine-routing.module';
import { FormsModule } from '@angular/forms';
import { WineItemComponent } from 'src/app/wines/wine-item/wine-item.component';
import { WineListComponent } from 'src/app/wines/wine-list/wine-list.component';
import { WineNewComponent } from 'src/app/wines/wine-new/wine-new.component';
import { ImageWinePipe } from 'src/app/pipes/image-wine.pipe';

@NgModule({
  declarations: [
    WineDetailComponent,
    WineItemComponent,
    WineListComponent,
    WineNewComponent,
    ImageWinePipe,
  ],
  imports: [CommonModule, WineRoutingModule, FormsModule],
})
export class WineModule {}
