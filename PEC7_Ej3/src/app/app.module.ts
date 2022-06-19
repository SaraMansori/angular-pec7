import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';

import { WineService } from './services/wine.service';
import { UserService } from './services/user.service';
import { UserStoreService } from './services/user-store.service';
import { WinesAppInterceptor } from './services/wines-app.interceptor';
import { AppRoutesModule } from './app-routes.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, AppRoutesModule],
  providers: [
    WineService,
    UserService,
    UserStoreService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: WinesAppInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
