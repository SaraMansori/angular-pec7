import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { WineItemComponent } from './wines/wine-item/wine-item.component';
import { WineListComponent } from './wines/wine-list/wine-list.component';
import { WineNewComponent } from './wines/wine-new/wine-new.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WineService } from './services/wine.service';
import { ImageWinePipe } from './pipes/image-wine.pipe';

@NgModule({
  declarations: [
    AppComponent,
    WineItemComponent,
    WineListComponent,
    WineNewComponent,
    ImageWinePipe
  ],
  imports: [
    BrowserModule,
    FormsModule, // NgModel
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [WineService],
  bootstrap: [AppComponent]
})
export class AppModule { }
